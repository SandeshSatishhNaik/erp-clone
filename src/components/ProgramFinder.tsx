import React, { useState } from 'react';
import { BookOpen, Clock, Users, ArrowUpRight, CheckCircle } from 'lucide-react';
import { PROGRAMS } from '../data/mockData';

interface ProgramFinderProps {
  onSelectProgram: (programName: string) => void;
  searchFilter?: string;
}

export const ProgramFinder: React.FC<ProgramFinderProps> = ({
  onSelectProgram,
  searchFilter = ''
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Undergraduate' | 'Postgraduate' | 'Doctoral'>('All');
  const [localSearch, setLocalSearch] = useState(searchFilter);

  const filteredPrograms = PROGRAMS.filter((prog) => {
    const matchesLevel = selectedLevel === 'All' || prog.level === selectedLevel;
    const query = (localSearch || searchFilter).toLowerCase();
    const matchesSearch = !query ||
      prog.name.toLowerCase().includes(query) ||
      prog.department.toLowerCase().includes(query) ||
      prog.degree.toLowerCase().includes(query);
    return matchesLevel && matchesSearch;
  });

  return (
    <section id="programs" className="py-16 bg-cream-soft border-b border-[#eee4d2]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-maroon font-bold text-xs uppercase tracking-[2px] mb-2">
              <BookOpen className="w-4 h-4 text-gold-deep" />
              <span>Academic Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-maroon font-serif">
              Explore Our Degree Programs
            </h2>
            <p className="mt-2 text-sm text-mute max-w-2xl">
              Curricula designed in active collaboration with industry leaders, offering dual
              specializations, internships, and practical lab experiences.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {(['All', 'Undergraduate', 'Postgraduate', 'Doctoral'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-[3px] text-xs font-semibold transition-all ${
                  selectedLevel === level
                    ? 'gmu-gold-gradient text-maroon-deep shadow-sm'
                    : 'bg-white text-maroon border border-gold/50 hover:bg-cream'
                }`}
              >
                {level === 'All' ? 'All Degrees' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-[4px] border border-[#eee4d2] border-t-[3px] border-t-maroon hover:border-t-gold p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-[3px] text-xs font-bold bg-maroon text-cream">
                    {prog.degree}
                  </span>
                  <span className="text-xs text-mute font-medium flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gold-deep" />
                    {prog.duration}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-maroon group-hover:text-maroon-deep transition-colors line-clamp-2">
                  {prog.name}
                </h3>

                <p className="mt-1 text-xs text-mute font-medium">
                  {prog.department}
                </p>

                <div className="mt-4 pt-4 border-t border-[#f0e3cf] space-y-2 text-xs text-mute">
                  <div className="flex items-start space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-deep shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{prog.eligibility}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-maroon-soft shrink-0" />
                    <span>Annual Intake: {prog.seats} Seats</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0e3cf] flex items-center justify-between">
                <span className="text-[11px] font-bold text-maroon-deep bg-cream px-2 py-0.5 rounded-[2px]">
                  Admissions Open
                </span>
                <button
                  onClick={() => onSelectProgram(prog.name)}
                  className="inline-flex items-center text-xs font-bold text-maroon group-hover:text-gold-deep group-hover:underline"
                >
                  Apply & Inquire
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12 bg-white rounded-[4px] border border-[#eee4d2]">
            <p className="text-mute text-sm font-medium">No programs matched your search.</p>
            <button
              onClick={() => { setSelectedLevel('All'); setLocalSearch(''); }}
              className="mt-3 text-xs text-maroon font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
