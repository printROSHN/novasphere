import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Layers, Send, Package } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RfqModal from '../components/modals/RfqModal';

const ForBuyers = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="For Buyers — Reliable Global Sourcing"
        description="Looking for reliable global suppliers of Graphitized Petroleum Coke, recarburizers, and industrial raw materials? NovaSphere Exim guarantees specifications, lab assays, and competitive pricing."
      />
      <TopBar />
      <Navbar onOpenRfq={() => setRfqModalOpen(true)} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">Industrial Procurement & Sourcing</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Looking for Reliable Global Suppliers?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Tell us your technical requirements and specifications; we match you with verified international manufacturers backed by strict lab quality assurance.
            </p>
          </div>
        </section>

        {/* Narrative & Pillars */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Procurement Security
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                  Eliminate Sourcing Risk with Verified Chemistry & Incoterms
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Industrial melting furnaces and continuous processing plants cannot tolerate inconsistent raw material chemistries or delayed cargo shipments. A minor surge in sulfur or volatile matter can ruin entire casting heats.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  NovaSphere Exim protects procurement teams by pre-auditing international manufacturing facilities, verifying Certificates of Analysis (COA) at accredited laboratories, and overseeing ocean container loading before cargo departure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-surface-light border border-slate-200 space-y-1.5">
                    <ShieldCheck className="w-5 h-5 text-brand-gold" />
                    <h4 className="text-xs font-bold text-slate-900">Pre-Shipment Assay</h4>
                    <p className="text-[11px] text-slate-500">Every lot is tested for Fixed Carbon, Sulfur, Nitrogen, Ash, and Moisture.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-light border border-slate-200 space-y-1.5">
                    <FileCheck className="w-5 h-5 text-brand-gold" />
                    <h4 className="text-xs font-bold text-slate-900">Transparent Pricing</h4>
                    <p className="text-[11px] text-slate-500">Clear FOB / CIF quotation with full freight, insurance, and duty breakdown.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setRfqModalOpen(true)}
                    className="btn-gold text-xs sm:text-sm px-6 py-3"
                  >
                    <span>Submit Your Requirement & Receive Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-brand-navy p-6 sm:p-8 text-white space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-3">
                    Fast Inquiry SLA
                  </h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                      <div>
                        <strong className="text-white block">Submit Specifications</strong>
                        <span>Mention required fixed carbon, sulfur thresholds, and particle sizes (e.g. 1-5mm).</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                      <div>
                        <strong className="text-white block">Commercial Matching (&lt;24 Hrs)</strong>
                        <span>Our desk verifies current stockpile availability and generates competitive CIF / FOB quotes.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                      <div>
                        <strong className="text-white block">Sample Dispatch & Contract Execution</strong>
                        <span>Air-freight test samples dispatched to your plant for metallurgic laboratory verification.</span>
                      </div>
                    </div>
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
        initialData={{ type: 'Buyer looking for products' }}
      />
    </div>
  );
};

export default ForBuyers;
