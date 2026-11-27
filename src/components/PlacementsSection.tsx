import React from 'react';
import { Briefcase } from 'lucide-react';

export const PlacementsSection: React.FC = () => {
  const recruiters = [
    'Infosys', 'TCS', 'Wipro', 'Bosch', 'Cognizant',
    'Amazon', 'L&T Technology', 'Capgemini', 'IBM', 'Tech Mahindra',
    'Accenture', 'Mindtree'
  ];

  return (
    <section id="placements" className="py-16 bg-maroon text-white border-b border-maroon-deep">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-gold font-bold text-xs uppercase tracking-[2px] mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Corporate Partnerships & Placement Cell</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-white">
            Transforming Potential into Global Careers
          </h2>
          <p className="mt-3 text-sm text-[#f3e3d0]">
            With 150+ marquee recruiters visiting our campus annually, GMU graduates consistently
            secure high-growth roles in software, core engineering, banking, and consulting.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-gold/25 rounded-[4px] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-normal text-gold font-serif">₹38.5 LPA</div>
            <div className="mt-1 text-xs text-[#f3e3d0] font-semibold uppercase tracking-wider">Highest International Package</div>
          </div>

          <div className="bg-white/5 border border-gold/25 rounded-[4px] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-normal text-gold font-serif">₹7.2 LPA</div>
            <div className="mt-1 text-xs text-[#f3e3d0] font-semibold uppercase tracking-wider">Average CTC Across Engineering</div>
          </div>

          <div className="bg-white/5 border border-gold/25 rounded-[4px] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-normal text-gold font-serif">150+</div>
            <div className="mt-1 text-xs text-[#f3e3d0] font-semibold uppercase tracking-wider">Recruiting Companies</div>
          </div>

          <div className="bg-white/5 border border-gold/25 rounded-[4px] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-normal text-gold font-serif">94.2%</div>
            <div className="mt-1 text-xs text-[#f3e3d0] font-semibold uppercase tracking-wider">Overall Placement Index</div>
          </div>
        </div>

        {/* Recruiters */}
        <div className="bg-maroon-dark/60 border border-gold/20 rounded-[4px] p-8 text-center">
          <h4 className="text-xs uppercase font-bold tracking-widest text-gold mb-6">
            Leading Industry Recruiters Who Hire From GMU
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {recruiters.map((company) => (
              <div
                key={company}
                className="px-5 py-3 rounded-[3px] bg-white/5 border border-gold/20 text-sm font-bold text-[#f3e3d0] hover:border-gold hover:text-white transition-all cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
