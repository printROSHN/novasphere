import React from 'react';
import { Flame, Layers, Car, Cpu, Package, FlaskConical, Building2, Factory } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const iconMap = {
  Flame: Flame,
  Layers: Layers,
  Car: Car,
  Cpu: Cpu,
  Package: Package,
  FlaskConical: FlaskConical,
  Building2: Building2,
  Factory: Factory
};

const IndustriesSection = () => {
  const { industries } = useContent();

  return (
    <section className="py-16 sm:py-20 bg-brand-dark text-white border-b border-brand-blue/50" id="industries-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Supporting Businesses Across Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Delivering high-specification materials and commercial market development across core industrial sectors.
          </p>
        </div>

        {/* 8 Clean Linear Icon Boxes matching mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {industries.map((ind) => {
            const IconComponent = iconMap[ind.icon] || Factory;

            return (
              <div
                key={ind.id}
                className="group p-4 rounded-lg bg-brand-navy/60 hover:bg-brand-navy border border-slate-800 hover:border-brand-gold/50 transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[120px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-200 mb-2">
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
