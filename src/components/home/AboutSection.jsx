import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Play, X, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AboutSection = () => {
  const { pageContent, company } = useContent();
  const { about } = pageContent;
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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

          {/* Right Column: Visual Card with Overlay matching mockup */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1000&auto=format&fit=crop&q=80"
                alt="Global Reach, Local Expertise, Stronger Partnerships - Container ship and aviation logistics"
                className="w-full h-[380px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

              {/* World map vector pattern */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Card Content & Play Button */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div className="flex items-center justify-between">
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

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-14 h-14 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 group/btn"
                    aria-label="Play Corporate Overview Video"
                  >
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video / Overview Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 border border-slate-200">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <span className="badge-gold">Corporate Overview</span>
              <h3 className="text-xl font-bold text-brand-dark">NovaSphere Exim Corporate Presentation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                NovaSphere Exim bridges international manufacturing hubs with Indian industrial consumers. Specializing in high-carbon metallurgy materials (Graphitized Petroleum Coke - GPC, Recarburizers), specialty chemicals, and cross-border commercial facilitation under flexible Retainer + Commission models.
              </p>
              <div className="p-4 rounded-lg bg-amber-50 border border-brand-gold/30 text-xs text-brand-dark space-y-1">
                <p className="font-bold">Headquarters & Operational Base:</p>
                <p>Navi Mumbai, Maharashtra, India • Trade Desk: suyash23yewale@gmail.com</p>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="btn-navy text-xs px-4 py-2"
                >
                  Close Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
