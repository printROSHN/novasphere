import React from 'react';
import { ArrowRight, ShieldCheck, Globe, Send } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const Hero = ({ onOpenRfq }) => {
  const { pageContent } = useContent();
  const { hero } = pageContent;

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign('/contact');
    }
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-brand-dark">
      {/* Background Cargo Freight Logistics Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&auto=format&fit=crop&q=85"
          alt="International maritime container logistics vessel docking at port"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow duration-[10000ms]"
        />
        {/* Dark Navy Gradient Overlay matching mockup */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07132B]/95 via-[#0D224A]/85 to-[#07132B]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07132B] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-navy/80 text-brand-gold border border-brand-gold/40 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            {hero.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            {hero.headlineStart}{' '}
            <span className="text-brand-gold drop-shadow-md">
              {hero.headlineHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl text-shadow-sm">
            {hero.subtext}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="/products"
              className="btn-gold text-sm sm:text-base px-6 py-3.5 shadow-lg group"
            >
              <span>{hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold text-sm sm:text-base border border-slate-300/40 bg-brand-dark/60 text-white hover:bg-white hover:text-brand-dark transition-all duration-200 backdrop-blur-md shadow-sm"
            >
              <Send className="w-4 h-4 text-brand-gold" />
              <span>{hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Verified Global Suppliers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-gold" />
              <span>Cross-Border Corridors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Navi Mumbai Operations Hub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
