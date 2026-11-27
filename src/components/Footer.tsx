import React from 'react';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { UNIVERSITY_INFO, CURRENT_YEAR } from '../data/mockData';

interface FooterProps {
  onNavigateERP: () => void;
  onOpenAdmissions: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateERP, onOpenAdmissions }) => {
  return (
    <footer id="about" className="bg-maroon-dark text-[#e9dccb] pt-14 pb-10 border-t-4 border-gold">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/15">
          {/* Col 1: University Identity */}
          <div className="space-y-4">
            <img
              src="/gmu-logo.png"
              alt="GM University"
              className="w-[110px] h-auto"
            />
            <p className="text-xs leading-relaxed text-[#e9dccb]">
              Established under the Karnataka State Legislature Act. A premier multidisciplinary
              university committed to academic rigour, pathbreaking research, and ethical innovation.
            </p>
            <div className="pt-1 text-xs text-gold font-medium flex items-start">
              <ShieldCheck className="w-4 h-4 mr-1.5 shrink-0 mt-0.5" />
              {UNIVERSITY_INFO.accreditation}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-gold pl-2">
              Campus & Academics
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#programs" className="hover:text-gold transition-colors">Undergraduate Programs (B.Tech, BCA)</a></li>
              <li><a href="#programs" className="hover:text-gold transition-colors">Postgraduate Programs (MBA, MCA, M.Tech)</a></li>
              <li><a href="#programs" className="hover:text-gold transition-colors">Doctoral Research / Ph.D</a></li>
              <li><a href="#circulars" className="hover:text-gold transition-colors">Examinations & Circulars</a></li>
              <li><a href="#placements" className="hover:text-gold transition-colors">Training & Placement Cell</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Internal Quality Assurance Cell (IQAC)</a></li>
            </ul>
          </div>

          {/* Col 3: Portals */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-gold pl-2">
              Portals & Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onNavigateERP}
                  className="text-left font-medium text-gold hover:text-cream flex items-center"
                >
                  Student ERP Academic Login <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </li>
              <li>
                <button onClick={onNavigateERP} className="text-left hover:text-white flex items-center">
                  Faculty & Staff ERP Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmissions} className="text-left text-gold hover:text-cream font-medium">
                  Admissions Portal 2026-27
                </button>
              </li>
              <li><a href="#circulars" className="hover:text-white">Exam Results Portal</a></li>
              <li><a href="#about" className="hover:text-white">Central Library Online Catalog</a></li>
              <li><a href="#about" className="hover:text-white">Alumni Association Network</a></li>
              <li><a href="#about" className="hover:text-white">Grievance Redressal Cell</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-gold pl-2">
              Reach Us
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{UNIVERSITY_INFO.location}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{UNIVERSITY_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{UNIVERSITY_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>Official Web: www.gmu.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#cbb9a6] gap-4">
          <p>© {CURRENT_YEAR} {UNIVERSITY_INFO.fullName}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Use</a>
            <a href="#" className="hover:text-gold">Mandatory Disclosures</a>
            <a href="#" className="hover:text-gold">Anti-Ragging Committee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
