import React, { useState } from 'react';
import { Bell, FileText, Download, Calendar, Search, ArrowRight } from 'lucide-react';
import { CIRCULARS } from '../data/mockData';
import type { Circular } from '../types';

interface CircularsBoardProps {
  onNavigateERP: () => void;
}

export const CircularsBoard: React.FC<CircularsBoardProps> = ({ onNavigateERP }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Examination' | 'Academic' | 'Placement' | 'General'>('All');
  const [query, setQuery] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const filteredCirculars = CIRCULARS.filter((c) => {
    const matchesTab = activeTab === 'All' || c.category === activeTab;
    const matchesQuery = !query ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.refNo.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const handleDownload = (circular: Circular) => {
    setDownloadNotice(`Downloading Official Circular: ${circular.refNo} (${circular.fileSize})`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <section id="circulars" className="py-16 bg-white border-b border-[#eee4d2]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Toast / Notification when clicking download */}
        {downloadNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-maroon text-cream px-4 py-3 rounded-[4px] shadow-2xl border-l-4 border-gold flex items-center space-x-3 text-xs">
            <Download className="w-4 h-4 text-gold" />
            <span>{downloadNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Announcements & Notifications */}
          <div className="lg:col-span-8">
            <div className="flex items-center space-x-2 text-maroon font-bold text-xs uppercase tracking-[2px] mb-2">
              <Bell className="w-4 h-4 text-gold-deep" />
              <span>Official University Board</span>
            </div>
            <h2 className="text-3xl font-normal text-maroon font-serif">
              Circulars, Notifications & Exam Orders
            </h2>
            <p className="mt-1 text-sm text-mute">
              Official communiqués from the Office of the Registrar, Controller of Examinations (COE),
              and Placement Cell.
            </p>

            {/* Filter Tabs & Search */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-1.5 p-1 bg-cream-soft rounded-[3px] border border-[#eee4d2]">
                {(['All', 'Examination', 'Academic', 'Placement', 'General'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-maroon text-cream'
                        : 'text-maroon hover:bg-cream'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-maroon-soft/70" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter circulars..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gold/40 rounded-[3px] text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>

            {/* Circulars List */}
            <div className="mt-6 divide-y divide-[#f0e3cf] border border-[#eee4d2] rounded-[4px] overflow-hidden shadow-sm">
              {filteredCirculars.map((item) => (
                <div
                  key={item.id}
                  className="p-5 hover:bg-cream-soft transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[2px] bg-cream text-maroon-deep border border-gold/40">
                        {item.category}
                      </span>
                      {item.isNew && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] bg-maroon text-cream">
                          NEW
                        </span>
                      )}
                      <span className="text-xs text-mute flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </span>
                      <span className="text-[11px] text-mute/80 font-mono">
                        Ref: {item.refNo}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-ink hover:text-maroon transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleDownload(item)}
                      className="inline-flex items-center px-3 py-1.5 rounded-[3px] bg-cream-soft hover:bg-gold text-maroon text-xs font-semibold transition-colors border border-gold/50"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      PDF ({item.fileSize})
                    </button>
                  </div>
                </div>
              ))}

              {filteredCirculars.length === 0 && (
                <div className="p-8 text-center text-mute text-xs">
                  No notifications found matching your search.
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick ERP Box & Academic Calendar Highlights */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-maroon text-white rounded-[4px] p-6 shadow-xl space-y-4 border-t-4 border-gold">
              <div className="w-10 h-10 rounded-[3px] bg-gold flex items-center justify-center text-maroon">
                <FileText className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-lg font-normal font-serif text-gold">Student ERP Portal</h3>
                <p className="mt-1 text-xs text-[#f3e3d0] leading-relaxed">
                  Students can log in to verify personalized exam eligibility, download admission
                  hall tickets, and view subject internal marks.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateERP}
                  className="w-full py-3 rounded-[3px] gmu-gold-gradient text-maroon-deep font-bold text-xs flex items-center justify-center space-x-1.5 hover:brightness-105 transition"
                >
                  <span>Access Student ERP Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 border-t border-white/15 text-[11px] text-[#f3e3d0]">
                Facing ERP login issues? Contact campus computer center at: <br />
                <span className="text-gold font-mono">erpsupport@gmu.ac.in</span>
              </div>
            </div>

            {/* Academic Calendar Widget */}
            <div className="bg-cream-soft border border-[#eee4d2] rounded-[4px] p-5 space-y-3">
              <h4 className="text-xs font-bold text-maroon uppercase tracking-wider flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-deep" />
                Key Academic Dates (Even Sem 2026)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#e7d9c2]">
                  <span className="text-mute">Last Working Day of Semester:</span>
                  <span className="font-semibold text-maroon">May 24, 2026</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#e7d9c2]">
                  <span className="text-mute">Practical & Lab Exams:</span>
                  <span className="font-semibold text-maroon">May 26 - June 02, 2026</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#e7d9c2]">
                  <span className="text-mute">Theory Semester End Exams:</span>
                  <span className="font-semibold text-maroon">June 08 - June 26, 2026</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-mute">Commencement of Odd Sem:</span>
                  <span className="font-semibold text-maroon-deep">August 03, 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
