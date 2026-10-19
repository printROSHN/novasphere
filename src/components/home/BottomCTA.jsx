import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const BottomCTA = ({ onOpenRfq }) => {
  const { pageContent } = useContent();
  const { bottomCta } = pageContent;

  return (
    <section className="relative py-20 lg:py-24 bg-brand-dark overflow-hidden">
      {/* Background container port at sunset matching mockup */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&auto=format&fit=crop&q=80"
          alt="International container port cranes at dusk"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {bottomCta.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {bottomCta.subtext}
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link
              to="/products"
              className="btn-gold text-sm sm:text-base px-6 py-3.5 shadow-lg group"
            >
              <span>{bottomCta.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <button
              onClick={() => onOpenRfq ? onOpenRfq() : window.location.assign('/contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold text-sm sm:text-base border border-slate-400/40 bg-brand-dark/60 text-white hover:bg-white hover:text-brand-dark transition-all duration-200 backdrop-blur-md"
            >
              <Send className="w-4 h-4 text-brand-gold" />
              <span>{bottomCta.ctaSecondary}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
