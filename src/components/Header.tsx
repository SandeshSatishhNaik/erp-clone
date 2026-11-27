import React, { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, LogIn } from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/mockData';

interface HeaderProps {
  onNavigate: (view: 'home' | 'erp-login' | 'erp-dashboard') => void;
  onOpenAdmissions: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenAdmissions, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
      {/* Gold top bar - matches gmu.ac.in .top_bar */}
      <div className="gmu-topbar text-[12px] text-black font-semibold">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-2 px-4 h-[50px]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              {UNIVERSITY_INFO.phoneShort}
            </span>
            <span className="text-maroon/50">|</span>
            <span className="inline-flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              {UNIVERSITY_INFO.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline">
              KCET Codes &nbsp;:&nbsp; B.Tech - E303 &nbsp; | &nbsp; MCA - C568 &nbsp; | &nbsp; MBA - B086
            </span>
            <button
              onClick={() => onNavigate('erp-login')}
              className="inline-flex items-center bg-maroon hover:bg-maroon-deep text-white mx-[20px] px-[20px] py-[5px] rounded-[3px] font-semibold tracking-wide transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              LOGIN
            </button>
          </div>
        </div>
      </div>

      {/* Maroon navigation bar - gmu.ac.in header */}
      <div className="bg-maroon">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="shrink-0 py-1 -ml-1"
            aria-label="GM University home"
          >
            <img
              src="/gmu-logo.png"
              alt="GM University - Innovating Minds"
              className="w-[104px] sm:w-[120px] h-auto block"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center justify-end flex-1">
            <ul className="flex items-center flex-wrap justify-end">
              <li className="group relative">
                <button className="flex items-center text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform group-hover:scale-105">
                  About Us
                  <ChevronDown className="w-3.5 h-3.5 ml-1 text-gold" />
                </button>
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute left-0 top-full min-w-[240px] rounded-[5px] overflow-hidden shadow-xl">
                  {['Introduction', 'Srishyla Educational Trust', 'GM University', 'GMU Campus', 'Vision, Mission & Values', 'Leadership'].map((item) => (
                    <a
                      key={item}
                      href="#about"
                      className="block gmu-maroon-gradient text-white text-[13px] px-4 py-2 border-b border-[#cdcdcd] last:border-0 hover:bg-none hover:bg-gold hover:text-black transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </li>

              <li>
                <a href="#programs" className="block text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform hover:scale-105">
                  Programs
                </a>
              </li>

              <li>
                <button
                  onClick={onOpenAdmissions}
                  className="block text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform hover:scale-105"
                >
                  Admission
                </button>
              </li>

              <li className="group relative">
                <button className="flex items-center text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform group-hover:scale-105">
                  Academics
                  <ChevronDown className="w-3.5 h-3.5 ml-1 text-gold" />
                </button>
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute left-0 top-full min-w-[250px] rounded-[5px] overflow-hidden shadow-xl">
                  {['Faculty of Engineering & Technology', 'Faculty of Commerce & Management', 'Faculty of Computing & Info Science', 'Doctoral Studies & Research'].map((item) => (
                    <a
                      key={item}
                      href="#programs"
                      className="block gmu-maroon-gradient text-white text-[13px] px-4 py-2 border-b border-[#cdcdcd] last:border-0 hover:bg-none hover:bg-gold hover:text-black transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </li>

              <li>
                <a href="#placements" className="block text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform hover:scale-105">
                  Placements
                </a>
              </li>

              <li>
                <a href="#circulars" className="block text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform hover:scale-105">
                  Circulars
                </a>
              </li>

              <li>
                <a href="#about" className="block text-white text-[13.5px] tracking-[1px] leading-[48px] px-[10px] transition-transform hover:scale-105">
                  IQAC
                </a>
              </li>
            </ul>
          </nav>

          {/* Right actions */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('erp-login')}
              className={`text-[12px] font-semibold px-4 py-2 rounded-[3px] transition-colors ${
                currentView === 'erp-login' || currentView === 'erp-dashboard'
                  ? 'bg-gold text-maroon'
                  : 'bg-gold hover:bg-gold-deep text-maroon-deep'
              }`}
            >
              Student ERP
            </button>
            <button
              onClick={onOpenAdmissions}
              className="text-[12px] font-semibold px-4 py-2 rounded-[3px] border border-gold text-gold hover:bg-gold hover:text-maroon transition-colors"
            >
              Admissions Open
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex xl:hidden items-center gap-2 text-white">
            <button
              onClick={() => onNavigate('erp-login')}
              className="px-3 py-1.5 text-[11px] font-bold rounded-[3px] bg-gold text-maroon"
            >
              ERP
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-maroon-deep"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-maroon border-t border-maroon-soft/50 px-4 pb-5 pt-1">
          {[
            { label: 'Home', href: '#top' },
            { label: 'Programs', href: '#programs' },
            { label: 'Admissions', href: '#programs' },
            { label: 'Circulars & Notifications', href: '#circulars' },
            { label: 'Placements & Careers', href: '#placements' },
            { label: 'About GMU', href: '#about' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-medium text-white border-b border-maroon-soft/40"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => { onNavigate('erp-login'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-[3px] bg-gold text-maroon font-bold text-sm"
            >
              Student ERP Login
            </button>
            <button
              onClick={() => { onOpenAdmissions(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-[3px] border border-gold text-gold font-bold text-sm"
            >
              Admissions 2026-27 Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
