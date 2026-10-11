import React, { useState } from 'react';
import { FileSpreadsheet, CheckCircle2, Package, Layers, ArrowRight, Send, ShieldCheck, Download } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RfqModal from '../components/modals/RfqModal';
import { useContent } from '../contexts/ContentContext';

const Products = () => {
  const { products } = useContent();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqInitialData, setRfqInitialData] = useState({});

  const handleOpenRfq = (data = {}) => {
    setRfqInitialData(data);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="Industrial Products & Technical Datasheets"
        description="Explore NovaSphere Exim's industrial product portfolio: Graphitized Petroleum Coke (GPC), Carbon Raiser (CR95), Foundry Coke, Industrial Chemicals, and Raw Materials."
      />
      <TopBar />
      <Navbar onOpenRfq={() => handleOpenRfq()} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">High-Specification Industrial Sourcing</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Industrial Products Catalog
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Specializing in Foundry Metallurgy (GPC, Carbon Raisers), Industrial Chemicals, and Core Manufacturing Inputs.
            </p>
          </div>
        </section>

        {/* Category Navigation Pills */}
        <div className="sticky top-20 z-30 bg-surface-light border-b border-slate-200 py-3 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-x-auto">
            {products.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white text-slate-700 hover:text-brand-dark hover:bg-brand-gold/20 border border-slate-200 transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* Categories & Products */}
        <div className="py-12 sm:py-16 space-y-20">
          {products.map((cat) => (
            <section key={cat.id} id={cat.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-36">
              {/* Category Header Banner */}
              <div className="border-b border-slate-200 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    Product Category
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                    {cat.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {cat.description}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenRfq({ product: cat.name })}
                  className="btn-outline-navy text-xs px-4 py-2 self-start md:self-auto flex-shrink-0"
                >
                  Request Category Catalog
                </button>
              </div>

              {/* Products in this category */}
              <div className="flex flex-wrap justify-center gap-8">
                {cat.products?.map((prod) => (
                  <div
                    key={prod.id}
                    className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between w-full lg:w-[calc(50%-1rem)] max-w-xl ${
                      prod.featured
                        ? 'border-brand-gold/60 shadow-lg ring-1 ring-brand-gold/30 bg-white'
                        : 'border-slate-200 shadow-sm hover:shadow-md bg-white'
                    }`}
                  >
                    <div>
                      {/* Badge & Code */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="badge-dark text-[10px]">
                          {prod.code || 'SPEC GRADE'}
                        </span>
                        {prod.featured && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            High-Demand Product
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-gold mb-3">
                        {prod.tagline}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {prod.shortDesc}
                      </p>



                      {/* Applications Tags */}
                      {prod.applications && (
                        <div className="mb-6 space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Target Metallurgy & Applications:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {prod.applications.map((app, aIdx) => (
                              <span
                                key={aIdx}
                                className="px-2.5 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleOpenRfq({ product: prod.name })}
                        className="btn-gold text-xs px-5 py-2.5 flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Quote / Trade Enquiry</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
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

export default Products;
