import React from 'react';
import { X, CheckCircle, FileSpreadsheet, Package, Layers, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const ProductSpecModal = ({ productId, onClose, onOpenRfq }) => {
  const { products } = useContent();

  // Find product across all categories
  let selectedProduct = null;
  let categoryName = '';

  for (const cat of products) {
    const found = cat.products?.find(p => p.id === productId);
    if (found) {
      selectedProduct = found;
      categoryName = cat.name;
      break;
    }
  }

  // Fallback to GPC if not specified
  if (!selectedProduct) {
    selectedProduct = products[0]?.products?.[0];
    categoryName = products[0]?.name;
  }

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-brand-dark text-white p-6 sm:p-8 flex items-start justify-between border-b border-brand-blue/50">
          <div className="space-y-1">
            <span className="badge-gold text-[10px]">
              {categoryName} • Technical Data Sheet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedProduct.name}
            </h2>
            <p className="text-xs sm:text-sm text-brand-gold font-medium">
              {selectedProduct.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close specification modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Product Overview & Chemistry Control
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedProduct.fullDesc || selectedProduct.shortDesc}
            </p>
          </div>

          {/* Chemical Specifications Table */}
          {selectedProduct.specifications && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-brand-gold" />
                  <span>Guaranteed Chemical Specifications</span>
                </h3>
                <span className="text-[11px] text-slate-400">COA provided with every shipment</span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="py-2.5 px-4">Parameter / Element</th>
                      <th className="py-2.5 px-4">Standard Grade Value</th>
                      <th className="py-2.5 px-4 hidden sm:table-cell">Tolerance / Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedProduct.specifications.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">{spec.property}</td>
                        <td className="py-2.5 px-4 font-bold text-brand-navy">{spec.value}</td>
                        <td className="py-2.5 px-4 text-slate-500 hidden sm:table-cell">Export Standard (Strict QA)</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Applications */}
          {selectedProduct.applications && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Metallurgical Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-navy/5 text-brand-navy border border-brand-navy/15"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{app}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sizing & Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {selectedProduct.granulationSizes && (
              <div className="p-4 rounded-lg bg-surface-light border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brand-gold" />
                  <span>Available Granulation / Mesh</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  {selectedProduct.granulationSizes.map((size, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span>{size}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProduct.packaging && (
              <div className="p-4 rounded-lg bg-surface-light border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-brand-gold" />
                  <span>Standard Packaging & Logistics</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.packaging}
                </p>
                <p className="text-[11px] text-slate-500 pt-1">
                  Shipping via 20ft / 40ft containers from Nhava Sheva (JNPT) or major origin ports.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed specifications backed by accredited laboratory assay</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-md"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                if (onOpenRfq) {
                  onOpenRfq({ product: selectedProduct.name });
                } else {
                  window.location.assign('/contact');
                }
              }}
              className="btn-gold text-xs px-5 py-2.5 flex-1 sm:flex-initial"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire About This Grade</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecModal;
