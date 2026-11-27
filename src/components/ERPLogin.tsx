import { useEffect, useRef } from 'react';
import { findStudentByUsn } from '../data/students';
import type { StudentProfile } from '../types';

interface ERPLoginProps {
  onBackToHome: () => void;
  onLoginSuccess: (student: StudentProfile) => void;
}

const ERP_STYLES = [
  '/erp/styles/default.css',
  '/erp/styles/bootstrap/lumen/normal/style.css',
  '/erp/styles/custom/custom.css',
  '/erp/styles/pages/_global_login.css',
  '/erp/styles/bundle.css',
];

const DEMO_USN = 'U26M02BA077';

/**
 * Exact replica of https://erp.gmit.info/gmu_ac/output/login.php.
 *
 * The real page markup (/erp/login.html) and its own stylesheets are served
 * locally and injected as-is, so the logo, 350px form column, circular side
 * image, Poppins 12px body text and gold gradient button all render exactly
 * like the live ERP login. Only the form behaviour is wired up in React.
 */
export const ERPLogin: React.FC<ERPLoginProps> = ({ onBackToHome, onLoginSuccess }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef(onLoginSuccess);

  useEffect(() => {
    successRef.current = onLoginSuccess;
  }, [onLoginSuccess]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const links = ERP_STYLES.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.erpLogin = 'true';
      document.head.appendChild(link);
      return link;
    });

    let cancelled = false;
    let loginTimer: number | undefined;

    const showError = (slot: HTMLElement | null, message: string) => {
      if (!slot) return;
      slot.innerHTML = '';
      const box = document.createElement('div');
      box.textContent = message;
      box.style.cssText =
        'padding:10px 12px;margin-bottom:12px;border:1px solid #ebccd1;border-radius:4px;' +
        'background:#f2dede;color:#a94442;font-size:12px;line-height:1.4;';
      slot.appendChild(box);
    };

    const mount = async () => {
      const response = await fetch('/erp/login.html');
      const html = await response.text();
      if (cancelled) return;

      container.innerHTML = html;

      const form = container.querySelector<HTMLFormElement>('form');
      const username = container.querySelector<HTMLInputElement>('#username');
      const password = container.querySelector<HTMLInputElement>('#password');
      const submit = container.querySelector<HTMLElement>('#submitLogin1');
      const errorSlot = container.querySelector<HTMLElement>('[data-cellId="above-grid_c1"]');
      if (!form || !username || !password || !submit) return;

      // Only the USN is prefilled. The password stays empty, masked and
      // excluded from browser autofill (the live ERP also opens blank).
      username.value = DEMO_USN;
      password.value = '';
      username.setAttribute('autocomplete', 'off');
      password.setAttribute('autocomplete', 'new-password');
      form.setAttribute('autocomplete', 'off');

      const signIn = (event?: Event) => {
        event?.preventDefault();
        if (errorSlot) errorSlot.innerHTML = '';

        const usn = username.value.trim();
        const pass = password.value;
        if (!usn || !pass) {
          showError(errorSlot, 'Please enter your username and password.');
          return;
        }

        const student = findStudentByUsn(usn);
        if (!student) {
          showError(errorSlot, 'Invalid Username or Password.');
          return;
        }

        submit.textContent = 'Signing in...';
        submit.style.pointerEvents = 'none';
        loginTimer = window.setTimeout(() => successRef.current(student), 600);
      };

      form.addEventListener('submit', signIn);
      submit.addEventListener('click', signIn);
    };

    void mount();

    return () => {
      cancelled = true;
      if (loginTimer) window.clearTimeout(loginTimer);
      links.forEach((link) => link.remove());
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <div ref={containerRef} id="gmu-erp-login-page" />
      <button
        type="button"
        onClick={onBackToHome}
        style={{
          position: 'fixed',
          left: 16,
          bottom: 16,
          zIndex: 100,
          fontSize: 12,
          color: '#5b1f1f',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid #ddd',
          borderRadius: 4,
          padding: '6px 10px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        &larr; University Website
      </button>
    </>
  );
};
