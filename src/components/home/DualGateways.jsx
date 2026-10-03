import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const DualGateways = ({ onOpenRfq }) => {
  const { pageContent } = useContent();
  const { dualGateways } = pageContent;

  return (
    <section className="py-16 sm:py-20 bg-surface-light border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: For Manufacturers */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-end p-6 sm:p-8 group border border-slate-200">
            {/* Background Image: Factory engineer with helmet */}
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
              alt="Industrial engineer looking at factory operations"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40" />

            <div className="relative z-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                {dualGateways.manufacturers.title}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {dualGateways.manufacturers.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                {dualGateways.manufacturers.desc}
              </p>
              <div className="pt-2">
                <Link
                  to={dualGateways.manufacturers.href}
                  className="btn-gold text-xs sm:text-sm px-5 py-2.5 shadow-md group/btn"
                >
                  <span>{dualGateways.manufacturers.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: For Buyers */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-end p-6 sm:p-8 group border border-slate-200">
            {/* Background Image: Handshake */}
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80"
              alt="International commercial procurement business handshake"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40" />

            <div className="relative z-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                {dualGateways.buyers.title}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {dualGateways.buyers.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                {dualGateways.buyers.desc}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenRfq ? onOpenRfq({ type: 'Buyer looking for products' }) : window.location.assign('/for-buyers')}
                  className="btn-gold text-xs sm:text-sm px-5 py-2.5 shadow-md group/btn"
                >
                  <span>{dualGateways.buyers.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualGateways;
