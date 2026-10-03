import React from 'react';
import { Lightbulb, Network, Sliders, ShieldCheck, Compass } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const iconMap = {
  Lightbulb: Lightbulb,
  Network: Network,
  Sliders: Sliders,
  ShieldCheck: ShieldCheck,
  Compass: Compass
};

const WhyChooseUs = () => {
  const { pageContent } = useContent();
  const { whyChooseUs } = pageContent;

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
            {whyChooseUs.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            {whyChooseUs.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Connecting the right businesses with sustainable commercial integrity.
          </p>
        </div>

        {/* 5-Column Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUs.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;

            return (
              <div
                key={item.id || idx}
                className="bg-surface-light rounded-xl p-6 text-center border border-slate-200/80 hover:border-brand-gold/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand-navy/5 text-brand-navy group-hover:bg-brand-gold group-hover:text-brand-dark flex items-center justify-center transition-all duration-200 mb-4 mx-auto">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
