import React, { useState } from 'react';
import { Flame, Layers, Car, Cpu, Package, FlaskConical, Building2, Factory, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RfqModal from '../components/modals/RfqModal';
import { useContent } from '../contexts/ContentContext';

const iconMap = {
  Flame: Flame,
  Layers: Layers,
  Car: Car,
  Cpu: Cpu,
  Package: Package,
  FlaskConical: FlaskConical,
  Building2: Building2,
  Factory: Factory
};

const Industries = () => {
  const { industries } = useContent();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqInitialData, setRfqInitialData] = useState({});

  const handleOpenRfq = (data = {}) => {
    setRfqInitialData(data);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="Industries We Serve"
        description="Discover how NovaSphere Exim delivers specialized metallurgy inputs, industrial chemicals, and raw materials across key manufacturing sectors."
      />
      <TopBar />
      <Navbar onOpenRfq={() => handleOpenRfq()} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">Cross-Sector Solutions</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Industries We Serve
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Delivering high-specification materials, precision chemistry, and dedicated trade corridors across core industrial manufacturing sectors.
            </p>
          </div>
        </section>

        {/* Sectors Grid */}
        <section className="py-16 sm:py-20 bg-surface-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((ind) => {
                const IconComponent = iconMap[ind.icon] || Factory;

                return (
                  <div
                    key={ind.id}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 stroke-[1.5]" />
                      </div>

                      <h3 className="text-lg font-bold text-brand-dark mb-2">
                        {ind.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {ind.shortDesc}
                      </p>

                      {ind.productsSupplied && (
                        <div className="space-y-1.5 pt-3 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Key Materials Supplied:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {ind.productsSupplied.map((prod, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleOpenRfq({ product: ind.name, type: 'Buyer looking for products' })}
                        className="text-xs font-bold text-brand-navy group-hover:text-brand-gold transition-colors inline-flex items-center gap-1"
                      >
                        <span>Request Industry Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
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

export default Industries;
