import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Navigation, ShieldCheck } from 'lucide-react';
import { targetMarkets } from '../../data/markets';

const GlobalMarkets = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200" id="global-markets-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
              GLOBAL MARKETS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Connecting Businesses Across Borders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We work with a global-market perspective, connecting Indian and international businesses through sourcing, trading and market-development opportunities.
            </p>
            <div className="pt-2">
              <Link
                to="/global-markets"
                className="btn-gold text-xs sm:text-sm px-5 py-2.5 group"
              >
                <span>Explore Global Markets</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Center Column: Stylized Vector SVG World Map with India Centered Trade Corridors */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[16/10] bg-brand-dark rounded-2xl overflow-hidden p-4 shadow-xl border border-brand-blue/60 flex items-center justify-center">
              {/* World Map SVG Vector */}
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full object-contain opacity-80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified stylized continents */}
                <path
                  d="M150 180 Q220 140 260 210 Q280 280 200 320 Q160 380 180 480 Q140 500 130 420 Q110 320 120 250 Z"
                  fill="#1B365D"
                  opacity="0.6"
                />
                <path
                  d="M450 160 Q520 120 540 180 Q580 200 520 260 Q480 300 460 380 Q430 460 410 400 Q390 300 430 200 Z"
                  fill="#1B365D"
                  opacity="0.6"
                />
                <path
                  d="M550 140 Q650 100 800 150 Q920 180 880 300 Q800 350 720 320 Q660 300 600 240 Z"
                  fill="#1B365D"
                  opacity="0.6"
                />
                <path
                  d="M750 380 Q850 370 820 460 Q760 480 730 420 Z"
                  fill="#1B365D"
                  opacity="0.6"
                />

                {/* India Central Hub Node (Coordinates ~ 640, 290) */}
                <circle cx="640" cy="290" r="8" fill="#D4A017" className="animate-ping" opacity="0.75" />
                <circle cx="640" cy="290" r="6" fill="#D4A017" />
                <text x="640" y="315" fill="#FEF3C7" fontSize="12" fontWeight="bold" textAnchor="middle">
                  INDIA (Navi Mumbai)
                </text>

                {/* Connecting Trade Arcs to Key Hubs */}
                {/* 1. China */}
                <path d="M640 290 Q720 220 780 230" stroke="#D4A017" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <circle cx="780" cy="230" r="4" fill="#60A5FA" />
                <text x="780" y="220" fill="#93C5FD" fontSize="10" textAnchor="middle">China</text>

                {/* 2. Vietnam / SE Asia */}
                <path d="M640 290 Q710 320 740 330" stroke="#D4A017" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <circle cx="740" cy="330" r="4" fill="#60A5FA" />
                <text x="750" y="345" fill="#93C5FD" fontSize="10" textAnchor="start">Vietnam</text>

                {/* 3. Middle East (UAE / Saudi) */}
                <path d="M640 290 Q590 260 560 270" stroke="#D4A017" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <circle cx="560" cy="270" r="4" fill="#60A5FA" />
                <text x="545" y="260" fill="#93C5FD" fontSize="10" textAnchor="middle">UAE/Saudi</text>

                {/* 4. Europe (Italy / Germany / Poland) */}
                <path d="M640 290 Q550 200 490 190" stroke="#D4A017" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <circle cx="490" cy="190" r="4" fill="#60A5FA" />
                <text x="480" y="180" fill="#93C5FD" fontSize="10" textAnchor="middle">Europe</text>
              </svg>

              <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span>Primary Hub: Nhava Sheva (JNPT) / Navi Mumbai Port</span>
              </div>
            </div>
          </div>

          {/* Right Column: Target Markets List Card matching mockup */}
          <div className="lg:col-span-3">
            <div className="bg-surface-light rounded-xl p-5 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Our Target Markets
                </h3>
                <span className="text-[10px] font-bold text-brand-gold">10 Corridors</span>
              </div>

              <div className="grid grid-cols-1 gap-1.5 max-h-[320px] overflow-y-auto pr-1">
                {targetMarkets.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-white transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{m.flag}</span>
                      <span className="font-semibold text-slate-800">{m.country}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{m.code}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200">
                <Link
                  to="/global-markets"
                  className="flex items-center justify-between text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors"
                >
                  <span>View All Markets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalMarkets;
