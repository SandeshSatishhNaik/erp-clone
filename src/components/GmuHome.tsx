import { useEffect, useRef } from 'react';

interface GmuHomeProps {
  onNavigateERP: () => void;
}

/**
 * Renders a pixel-faithful copy of the gmu.ac.in homepage.
 *
 * The original markup + inline styles are served from /gmu/home.html together
 * with the site's own master.css / styles.css, so the layout, typography and
 * spacing match the live site instead of being re-approximated in JSX.
 */
export const GmuHome: React.FC<GmuHomeProps> = ({ onNavigateERP }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const erpRef = useRef(onNavigateERP);

  useEffect(() => {
    erpRef.current = onNavigateERP;
  }, [onNavigateERP]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cssLinks = ['/gmu/assets/css/master.css', '/gmu/assets/css/styles.css'].map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.gmuClone = 'true';
      document.head.appendChild(link);
      return link;
    });

    let slideTimer: number | undefined;
    let counterTimers: number[] = [];
    let cancelled = false;

    const startSlideshow = (root: HTMLElement) => {
      const slides = Array.from(root.querySelectorAll<HTMLElement>('.mySlides'));
      if (slides.length === 0) return;

      let index = 0;
      const show = (next: number) => {
        index = ((next % slides.length) + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          slide.style.display = i === index ? 'block' : 'none';
        });
      };

      show(0);
      slideTimer = window.setInterval(() => show(index + 1), 2000);

      (window as unknown as Record<string, unknown>).plusSlides = (n: number) => show(index + n);
    };

    const startCounters = (root: HTMLElement) => {
      const run = (id: string, end: number, duration: number) => {
        const el = root.querySelector<HTMLElement>(`#${id}`);
        if (!el) return;
        const stepTime = Math.max(1, Math.floor(duration / Math.max(end, 1)));
        let current = 0;
        const timer = window.setInterval(() => {
          current += 1;
          el.textContent = String(current);
          if (current >= end) window.clearInterval(timer);
        }, stepTime);
        counterTimers.push(timer);
      };
      run('count2', 81, 500);
      run('count3', 54, 500);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      if (anchor.getAttribute('href') === '#erp-login') {
        event.preventDefault();
        erpRef.current();
      }
    };

    const load = async () => {
      const response = await fetch('/gmu/home.html');
      const html = await response.text();
      if (cancelled) return;
      container.innerHTML = html;
      startSlideshow(container);
      startCounters(container);
    };

    container.addEventListener('click', handleClick);
    void load();
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
      container.removeEventListener('click', handleClick);
      if (slideTimer) window.clearInterval(slideTimer);
      counterTimers.forEach((timer) => window.clearInterval(timer));
      counterTimers = [];
      container.innerHTML = '';
      cssLinks.forEach((link) => link.remove());
      delete (window as unknown as Record<string, unknown>).plusSlides;
    };
  }, []);

  return <div ref={containerRef} id="gmu-site" />;
};
