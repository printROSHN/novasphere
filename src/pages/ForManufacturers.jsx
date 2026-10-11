import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Handshake, Building, Award, Send } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RfqModal from '../components/modals/RfqModal';

const ForManufacturers = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="For Manufacturers — India Market Representation"
        description="Expand into the high-growth Indian market with NovaSphere Exim. Turnkey local representation, buyer identification, and commercial development under flexible Strategic Partnership models."
      />
      <TopBar />
      <Navbar onOpenRfq={() => setRfqModalOpen(true)} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">India Market Development Partner</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Looking for an India Market Representative?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Expand your sales footprint in India without setting up expensive local corporate entities.
            </p>
          </div>
        </section>

        {/* Narrative & Value Proposition */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Why Partner With NovaSphere Exim
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                  Your Dedicated Business Development Arm in India
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  India is one of the world's most dynamic industrial manufacturing powerhouses. However, successfully entering the Indian market requires on-ground relationship building, foundry and factory trials, regulatory navigation, and consistent follow-ups.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  NovaSphere Exim serves as your in-country commercial representative. We identify high-volume prospective buyers, manage technical RFQs, organize sample plant trials, and negotiate multi-year purchase contracts on your behalf.
                </p>

                <div className="pt-2 space-y-3">
                  {[
                    "Direct outreach to Tier-1 foundry metallurgists, steel plants, and procurement heads",
                    "Assistance with customs duties, BIS certifications, and Indian commercial compliance",
                    "Local warehousing and just-in-time consignment stocking coordination",
                    "Ongoing relationship management, contract renewals, and payment tracking"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setRfqModalOpen(true)}
                    className="btn-gold text-xs sm:text-sm px-6 py-3"
                  >
                    <span>Request Representation Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-brand-navy p-6 sm:p-8 text-white space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-3">
                    Commercial Engagement Models
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-brand-dark border border-brand-gold/30 space-y-1">
                      <span className="text-xs font-bold text-brand-gold">Model 01</span>
                      <h4 className="font-bold text-sm text-white">Strategic Partnership</h4>
                      <p className="text-xs text-slate-300">
                        Monthly base covering dedicated account executive, outreach, and reporting + success fee on closed purchase orders.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-brand-dark border border-slate-700 space-y-1">
                      <span className="text-xs font-bold text-brand-gold">Model 02</span>
                      <h4 className="font-bold text-sm text-white">Exclusive Indenting & Sourcing Agency</h4>
                      <p className="text-xs text-slate-300">
                        Acting as exclusive territorial indenting agent with negotiated commission per metric ton dispatched.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-brand-gold/40 text-xs text-brand-gold space-y-1">
                    <p className="font-bold">Zero Foreign Subsidiary Red Tape:</p>
                    <p className="text-slate-300">Start commercial outreach in India within weeks, not months.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialData={{ type: 'Manufacturer seeking representation' }}
      />
    </div>
  );
};

export default ForManufacturers;
