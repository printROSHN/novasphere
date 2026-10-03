import React, { useState } from 'react';
import { Globe, Ship, Anchor, CheckCircle2, ArrowRight, MapPin, Send } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RfqModal from '../components/modals/RfqModal';
import { targetMarkets, tradeStats } from '../data/markets';

const GlobalMarketsPage = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="Global Markets & Trade Corridors"
        description="Connecting India with global manufacturing hubs across Asia, Europe and the Middle East. Specialized maritime trade logistics centered at Nhava Sheva (JNPT)."
      />
      <TopBar />
      <Navbar onOpenRfq={() => setRfqModalOpen(true)} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">Cross-Border Trade Corridors</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Global Markets & Trade Corridors
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Connecting Businesses Across Borders with Sourcing Reliability & End-to-End Maritime Execution.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-8 bg-surface-light border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {tradeStats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-gold font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Country Profiles Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                Strategic Trade Partners & Corridors
              </h2>
              <p className="text-sm text-slate-600">
                Operating multi-modal logistics linking key manufacturing hubs with Indian industrial buyers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targetMarkets.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-surface-light rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{m.flag}</span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{m.country}</h3>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">{m.code}</span>
                      </div>
                    </div>
                    <span className="badge-dark text-[10px]">Active Hub</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.role}
                  </p>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Corridors & Ports:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.keyPorts.map((port, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2 py-0.5 rounded text-[11px] bg-white border border-slate-200 text-slate-700 flex items-center gap-1"
                        >
                          <Anchor className="w-3 h-3 text-brand-gold" />
                          <span>{port}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Port Advantage Section */}
        <section className="py-16 bg-brand-dark text-white border-t border-brand-blue/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="badge-gold">Nhava Sheva (JNPT) Port Advantage</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Navi Mumbai: India's Maritime Gateway
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Headquartered in Navi Mumbai, NovaSphere Exim enjoys unparalleled geographic proximity to Jawaharlal Nehru Port (JNPT), handling over 50% of India's containerized international maritime trade.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setRfqModalOpen(true)}
                    className="btn-gold text-xs px-5 py-2.5"
                  >
                    <span>Inquire About Shipping Rates & Corridors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80"
                  alt="Nhava Sheva JNPT port container logistics"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
      />
    </div>
  );
};

export default GlobalMarketsPage;
