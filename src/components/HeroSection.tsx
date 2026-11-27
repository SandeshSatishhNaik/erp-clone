import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Sparkles,
  Building2,
  Trophy,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface HeroSectionProps {
  onNavigateERP: () => void;
  onOpenAdmissions: () => void;
  onSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateERP,
  onOpenAdmissions,
  onSearch
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      const programsEl = document.getElementById('programs');
      if (programsEl) {
        programsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="top" className="relative bg-maroon text-white overflow-hidden">
      {/* Gold light + subtle texture, echoing the gmu.ac.in banners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(236,195,92,0.22),transparent_55%)] pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] bg-maroon-deep rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[3px] gmu-gold-gradient" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-[3px] bg-cream text-maroon text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-maroon" />
              <span>Admissions 2026-27 Open Across Engineering & Management</span>
            </div>

            <p className="text-gold text-sm sm:text-base font-semibold tracking-[3px] uppercase">
              GM University
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-normal font-serif leading-[1.1] text-white">
              Igniting Innovation,
              <br />
              <span className="text-gold">Inspiring Transformation.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#f3e3d0] max-w-2xl font-light leading-relaxed">
              Welcome to GM University – a hub for academic prowess and personal growth, cultivating
              leaders and futuristic-thinkers. Ready to explore your potential?
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-maroon-soft" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search programs (e.g. B.Tech, MBA, Data Science, Fees)..."
                  className="w-full pl-12 pr-32 py-3.5 bg-white rounded-[4px] text-sm text-ink placeholder-mute/70 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-5 py-2.5 gmu-gold-gradient text-maroon-deep rounded-[3px] text-xs font-bold hover:brightness-105 transition"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenAdmissions}
                className="px-6 py-3.5 rounded-[4px] gmu-gold-gradient text-maroon-deep font-bold text-sm flex items-center space-x-2 hover:brightness-105 transition"
              >
                <span>Apply for Admissions 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateERP}
                className="px-6 py-3.5 rounded-[4px] border-2 border-gold text-gold font-bold text-sm flex items-center space-x-2 hover:bg-gold hover:text-maroon transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span>Student ERP Login</span>
              </button>
            </div>

            {/* Accreditation Badges */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-[#f3e3d0]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>UGC & AICTE Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>NAAC A+ Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-gold" />
                <span>Best University in Karnataka</span>
              </div>
            </div>
          </div>

          {/* Right Hero Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-[6px] p-6 shadow-2xl space-y-4 border-t-4 border-gold">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0e3cf]">
                <div className="flex items-center space-x-2 text-maroon text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-gold-deep" />
                  <span>Campus Quick Access</span>
                </div>
                <span className="text-[10px] bg-cream text-maroon px-2 py-0.5 rounded-full font-semibold">
                  Active Session
                </span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={onNavigateERP}
                  className="p-3.5 rounded-[4px] bg-cream-soft hover:bg-cream border border-gold/40 cursor-pointer transition-colors group flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-maroon group-hover:text-maroon-deep">
                      Student ERP Academic Login
                    </h4>
                    <p className="text-xs text-mute">
                      View attendance, internal marks, hall ticket & fee receipts
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-maroon-soft group-hover:text-maroon transition-transform group-hover:translate-x-1" />
                </div>

                <div
                  onClick={onOpenAdmissions}
                  className="p-3.5 rounded-[4px] bg-white hover:bg-cream-soft border border-[#eee4d2] cursor-pointer transition-colors group flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-maroon group-hover:text-maroon-deep">
                      Admissions Counseling & Helpdesk
                    </h4>
                    <p className="text-xs text-mute">
                      Scholarships, eligibility criteria & merit quota guidance
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-maroon-soft group-hover:text-maroon transition-transform group-hover:translate-x-1" />
                </div>

                <a
                  href="#circulars"
                  className="p-3.5 rounded-[4px] bg-white hover:bg-cream-soft border border-[#eee4d2] block cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-maroon group-hover:text-maroon-deep">
                        Examination Time Table & Circulars
                      </h4>
                      <p className="text-xs text-mute">
                        Semester End Exam Schedule (Even Sem 2026)
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-maroon-soft group-hover:text-maroon transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f0e3cf] text-center">
                <div className="p-2 bg-cream-soft rounded-[3px]">
                  <div className="text-lg font-bold text-maroon font-serif">₹38.5 L</div>
                  <div className="text-[10px] text-mute">Highest Package</div>
                </div>
                <div className="p-2 bg-cream-soft rounded-[3px]">
                  <div className="text-lg font-bold text-maroon font-serif">94%</div>
                  <div className="text-[10px] text-mute">Placement Record</div>
                </div>
                <div className="p-2 bg-cream-soft rounded-[3px]">
                  <div className="text-lg font-bold text-maroon font-serif">10000+</div>
                  <div className="text-[10px] text-mute">Students</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
