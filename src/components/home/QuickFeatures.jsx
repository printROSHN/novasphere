import React from 'react';
import { Globe, Ship, TrendingUp, MapPin, Handshake } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const iconMap = {
  Globe: Globe,
  Ship: Ship,
  TrendingUp: TrendingUp,
  MapPin: MapPin,
  Handshake: Handshake
};

const QuickFeatures = () => {
  const { pageContent } = useContent();
  const { quickFeatures } = pageContent;

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {quickFeatures.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Globe;
            const isHighlighted = idx === 4; // Retainer + Commission highlighted in mockup

            return (
              <div
                key={item.id || idx}
                className={`pt-4 sm:pt-0 sm:px-3 text-center group cursor-pointer transition-all duration-200 ${
                  isHighlighted ? 'bg-amber-50/40 rounded-lg p-3 border border-brand-gold/30' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110 ${
                      isHighlighted
                        ? 'bg-brand-gold text-brand-dark shadow-md'
                        : 'bg-brand-navy/5 text-brand-navy group-hover:bg-brand-navy group-hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>

                  {isHighlighted && (
                    <span className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-dark">
                      Featured Model
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickFeatures;
