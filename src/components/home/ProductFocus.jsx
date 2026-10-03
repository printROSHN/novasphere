import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const ProductFocus = ({ onOpenSpecModal }) => {
  const { products } = useContent();

  return (
    <section className="py-20 lg:py-24 bg-white" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
              OUR PRODUCT FOCUS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Industrial Products. Global Opportunities.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
              We focus on selected industrial and manufacturing products where reliable sourcing and international market development can create meaningful value.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors duration-150 flex-shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Structured Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((category) => {
            const isFlagship = category.flagship;

            return (
              <div
                key={category.id}
                className={`relative rounded-xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isFlagship
                    ? 'border-brand-gold/60 shadow-xl ring-2 ring-brand-gold/20 bg-brand-dark text-white'
                    : 'border-slate-200 shadow-md hover:shadow-xl bg-brand-dark text-white'
                }`}
              >
                {/* Top Image Banner */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

                  {isFlagship && (
                    <div className="absolute top-4 left-4">
                      <span className="badge-gold shadow-md">
                        Flagship Metallurgy Category
                      </span>
                    </div>
                  )}

                  {/* Category Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-brand-dark">
                  <div className="space-y-3">
                    {/* Bullets Strip matching mockup */}
                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-2 text-xs text-slate-300">
                      {category.bullets.map((bullet, idx) => (
                        <span key={idx} className="flex items-center gap-2">
                          <span className="text-brand-gold">•</span>
                          <span>{bullet}</span>
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-1">
                      {category.description}
                    </p>

                    {/* Flagship GPC Highlight Box */}
                    {isFlagship && (
                      <div className="p-3 rounded-lg bg-brand-navy border border-brand-gold/30 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-brand-gold font-bold">
                          <span>Graphitized Petroleum Coke (GPC)</span>
                          <span className="text-[10px] bg-brand-gold/20 px-1.5 py-0.5 rounded text-brand-gold">F.C. &gt;98.5%</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          High-carbon material for ductile iron, grey iron, steel, and induction furnaces. Supplied per customer specifications.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    {isFlagship ? (
                      <button
                        onClick={() => onOpenSpecModal && onOpenSpecModal('gpc-graphitized-petroleum-coke')}
                        className="btn-gold w-full text-xs py-2.5"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Request Technical Specs</span>
                      </button>
                    ) : (
                      <Link
                        to={`/products#${category.id}`}
                        className="btn-outline-gold w-full text-xs py-2.5 text-center justify-center"
                      >
                        <span>Explore Category</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductFocus;
