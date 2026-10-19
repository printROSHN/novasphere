import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Ship, TrendingUp, Users, Briefcase, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const iconMap = {
  Globe: Globe,
  Ship: Ship,
  TrendingUp: TrendingUp,
  Users: Users,
  Briefcase: Briefcase,
  BarChart3: BarChart3
};

const ServicesGrid = () => {
  const { services } = useContent();

  return (
    <section className="py-20 lg:py-24 bg-surface-light border-y border-slate-200" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Global Trade. Local Expertise. Sustainable Growth.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            NovaSphere Exim provides integrated trading and market-development solutions that help businesses identify opportunities, connect with the right partners and expand across international markets.
          </p>
        </div>

        {/* Dynamic Centered Detailed Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Globe;

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-md"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-brand-gold font-display">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  {service.keyDeliverables && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      {service.keyDeliverables.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy group-hover:text-brand-gold transition-colors"
                  >
                    <span>Explore Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retainer + Commission Callout Card */}
        <div className="mt-12 bg-brand-navy rounded-xl p-6 sm:p-8 text-white border border-brand-gold/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="badge-gold">Commercial Structure</span>
            <h3 className="text-xl font-bold text-white">
              Flexible Commercial Model: Dedicated Trade Representation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We align our commercial compensation with your sales growth. International manufacturers gain dedicated ground execution in India without fixed foreign subsidiary overhead.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-gold flex-shrink-0 text-xs px-5 py-3"
          >
            <span>Learn About Representation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
