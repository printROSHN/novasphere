import React, { useState } from 'react';
import { Globe, Ship, TrendingUp, Users, Briefcase, BarChart3, CheckCircle2, ArrowRight, Send, ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RfqModal from '../components/modals/RfqModal';
import { useContent } from '../contexts/ContentContext';

const iconMap = {
  Globe: Globe,
  Ship: Ship,
  TrendingUp: TrendingUp,
  Users: Users,
  Briefcase: Briefcase,
  BarChart3: BarChart3
};

const Services = () => {
  const { services } = useContent();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqInitialData, setRfqInitialData] = useState({});

  const handleOpenRfq = (data = {}) => {
    setRfqInitialData(data);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="Our Services & Representation Models"
        description="Explore NovaSphere Exim's 6 core trade services: Global Sourcing, Import & Export, India Market Entry, Buyer Development, Representation, and Market Research."
      />
      <TopBar />
      <Navbar onOpenRfq={() => handleOpenRfq()} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">Integrated International Trade Solutions</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Our Services
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Global Trade. Local Expertise. Sustainable Growth.
            </p>
          </div>
        </section>

        {/* 6 Core Pillars Breakdown */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Globe;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm ${
                    isEven ? 'bg-surface-light' : 'bg-white'
                  }`}
                >
                  <div className={`lg:col-span-8 space-y-4 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-brand-gold font-display">
                        {service.number}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                      {service.shortDesc}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Deliverables Checklist */}
                    {service.keyDeliverables && (
                      <div className="pt-2 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-dark block">
                          Scope & Key Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.keyDeliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        onClick={() => handleOpenRfq({ type: service.title })}
                        className="btn-gold text-xs px-5 py-2.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Inquire About {service.title}</span>
                      </button>
                    </div>
                  </div>

                  <div className={`lg:col-span-4 flex items-center justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-brand-dark text-brand-gold flex flex-col items-center justify-center p-6 shadow-xl border border-brand-blue/60">
                      <IconComponent className="w-16 h-16 stroke-[1.25] mb-2" />
                      <span className="text-xs font-bold text-center text-slate-300">
                        {service.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Retainer + Commission Deep Dive Section */}
        <section className="py-16 sm:py-20 bg-brand-dark text-white border-t border-brand-blue/60" id="retainer-commission">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-navy rounded-2xl p-8 sm:p-12 border border-brand-gold/50 shadow-2xl space-y-6">
              <span className="badge-gold">Specialized Commercial Model</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Dedicated Representation Structure
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                For international manufacturers seeking to build an active sales channel in India, NovaSphere Exim provides a turnkey local presence that combines the accountability of dedicated representation with performance-based incentives aligned with your business growth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-xl bg-brand-dark border border-slate-700 space-y-2">
                  <h3 className="font-bold text-brand-gold text-sm">1. Ground Execution</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Direct buyer outreach, foundry visits, specification coordination, and sample trial oversight managed from Navi Mumbai.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-brand-dark border border-slate-700 space-y-2">
                  <h3 className="font-bold text-brand-gold text-sm">2. Zero Fixed Subsidiary Costs</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Avoid corporate registrations, legal compliance overhead, and permanent employee liabilities in India.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-brand-dark border border-slate-700 space-y-2">
                  <h3 className="font-bold text-brand-gold text-sm">3. Alignment of Interests</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Commission structure incentivizes ongoing volume expansion, recurring purchase contracts, and proactive buyer servicing.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleOpenRfq({ type: 'Manufacturer seeking representation' })}
                  className="btn-gold text-xs sm:text-sm px-6 py-3"
                >
                  Discuss Representation Agreement
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialData={rfqInitialData}
      />
    </div>
  );
};

export default Services;
