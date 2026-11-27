import React, { useState } from 'react';
import { X, CheckCircle, Send, GraduationCap } from 'lucide-react';
import { PROGRAMS } from '../data/mockData';

interface AdmissionsInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
}

export const AdmissionsInquiryModal: React.FC<AdmissionsInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedProgram = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(preselectedProgram || PROGRAMS[0].name);
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-[4px] shadow-2xl border border-[#eee4d2] overflow-hidden">
        
        {/* Header */}
        <div className="bg-maroon text-white p-6 sm:p-8 border-b-4 border-gold">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-[3px] bg-gold flex items-center justify-center text-maroon">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-normal font-serif text-gold">Admissions 2026-27</h3>
                <p className="text-xs text-[#f3e3d0]">GM University Academic Counseling</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-1 rounded-full text-cream/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream text-maroon flex items-center justify-center mx-auto border-2 border-gold">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-normal text-maroon font-serif">Application Inquiry Submitted!</h4>
              <p className="text-sm text-mute max-w-sm mx-auto">
                Thank you, <strong className="text-maroon">{name}</strong>. Our admissions counselor will contact you at <span className="font-mono text-maroon-deep">{phone}</span> within 24 hours regarding eligibility and merit scholarships.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 gmu-gold-gradient text-maroon-deep font-bold rounded-[3px] text-xs transition hover:brightness-105"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-[3px] bg-[#fdf2f2] border border-maroon-soft/40 text-maroon text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-maroon uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-[3px] border border-[#dccdb8] text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-[3px] border border-[#dccdb8] text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10 digit number"
                    className="w-full px-3.5 py-2.5 rounded-[3px] border border-[#dccdb8] text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon uppercase tracking-wider mb-1">
                  Select Program of Interest *
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[3px] border border-[#dccdb8] text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold bg-white"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.degree} - {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon uppercase tracking-wider mb-1">
                  Current City / State
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bangalore, Karnataka"
                  className="w-full px-3.5 py-2.5 rounded-[3px] border border-[#dccdb8] text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[3px] gmu-gold-gradient text-maroon-deep font-bold text-sm shadow-md transition flex items-center justify-center space-x-2 hover:brightness-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Inquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-mute/80 text-center">
                Your personal details are strictly handled according to university privacy and enrollment policies.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
