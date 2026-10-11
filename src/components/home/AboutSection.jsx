import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AboutSection = () => {
  const { pageContent } = useContent();
  const { about } = pageContent;

  return (
    <section className="py-20 lg:py-24 bg-surface-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block mb-3">
                {about.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
                {about.headline}
              </h2>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              {about.paragraph1}
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              {about.paragraph2}
            </p>

            {/* 4 Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {about.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200/80 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{pillar.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="btn-navy text-sm px-6 py-3 group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Card with Business-related Cargo/Logistics image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=80"
                alt="Global Trade & Freight Logistics - NovaSphere Exim"
                className="w-full h-[380px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

              {/* World map vector pattern */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Card Content without play button */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Global Reach.
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-brand-gold tracking-tight">
                    Local Expertise.
                  </p>
                  <p className="text-lg sm:text-xl font-medium text-slate-200">
                    Stronger Partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
