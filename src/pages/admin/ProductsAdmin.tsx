import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  FileSpreadsheet,
  CheckCircle,
  X,
  Save,
  Package
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

export default function ProductsAdmin() {
  const { products, updateProduct, addProduct, deleteProduct } = useContent();

  const [selectedCatId, setSelectedCatId] = useState(products[0]?.id || 'foundry-metallurgy');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const currentCategory = products.find(c => c.id === selectedCatId) || products[0];

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    tagline: '',
    featured: false,
    shortDesc: '',
    fullDesc: '',
    applications: [],
    specifications: [],
    granulationSizes: [],
    packaging: ''
  });

  const [newApp, setNewApp] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newSpecProp, setNewSpecProp] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
    setFormData({
      name: product.name || '',
      code: product.code || '',
      tagline: product.tagline || '',
      featured: !!product.featured,
      shortDesc: product.shortDesc || '',
      fullDesc: product.fullDesc || '',
      applications: product.applications || [],
      specifications: product.specifications || [],
      granulationSizes: product.granulationSizes || [],
      packaging: product.packaging || ''
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      code: '',
      tagline: '',
      featured: false,
      shortDesc: '',
      fullDesc: '',
      applications: [],
      specifications: [
        { property: 'Fixed Carbon (F.C.)', value: '98.5% min' },
        { property: 'Sulfur (S)', value: '0.05% max' },
        { property: 'Ash Content', value: '0.5% max' }
      ],
      granulationSizes: ['1 - 5 mm', 'Customer specific'],
      packaging: '25kg bags, 1 MT jumbo bags'
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }

    if (isAddingNew) {
      const newId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addProduct(selectedCatId, {
        id: newId,
        ...formData
      });
      toast.success('Product added successfully');
      setIsAddingNew(false);
    } else if (editingProduct) {
      updateProduct(selectedCatId, {
        ...editingProduct,
        ...formData
      });
      toast.success('Product updated successfully');
      setEditingProduct(null);
    }
  };

  const handleDelete = (prodId, prodName) => {
    if (window.confirm(`Are you sure you want to remove "${prodName}"?`)) {
      deleteProduct(selectedCatId, prodId);
      toast.success('Product removed');
    }
  };

  const handleAddApp = () => {
    if (!newApp.trim()) return;
    setFormData(prev => ({
      ...prev,
      applications: [...prev.applications, newApp.trim()]
    }));
    setNewApp('');
  };

  const handleAddSpec = () => {
    if (!newSpecProp.trim() || !newSpecVal.trim()) return;
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { property: newSpecProp.trim(), value: newSpecVal.trim() }]
    }));
    setNewSpecProp('');
    setNewSpecVal('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Products & Technical Specs Manager</h2>
          <p className="text-xs text-slate-500">
            Manage metallurgical grades (GPC, Carbon Raisers), chemical specifications, and raw materials.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn-gold text-xs px-4 py-2.5 flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product to {currentCategory?.name}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {products.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedCatId === cat.id
                ? 'bg-brand-navy text-brand-gold shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat.name} ({cat.products?.length || 0})
          </button>
        ))}
      </div>

      {/* Products in selected category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentCategory?.products?.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge-dark text-[10px]">{prod.code || 'SPEC'}</span>
                {prod.featured && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">{prod.name}</h3>
              <p className="text-xs text-brand-gold font-medium mb-3">{prod.tagline}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{prod.shortDesc}</p>

              {/* Chemical Specs Preview */}
              {prod.specifications && (
                <div className="p-3 bg-surface-light rounded-lg border border-slate-200 mb-4 text-xs space-y-1">
                  <span className="font-bold text-slate-700 block text-[11px]">Key Specifications:</span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    {prod.specifications.slice(0, 4).map((s, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-100 pb-0.5">
                        <span className="text-slate-500 truncate mr-1">{s.property}:</span>
                        <span className="font-bold text-brand-navy">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleEdit(prod)}
                className="btn-outline-navy text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Specs & Content</span>
              </button>

              <button
                onClick={() => handleDelete(prod.id, prod.name)}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Product Modal */}
      {(editingProduct || isAddingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-brand-dark text-white p-5 flex items-center justify-between border-b border-brand-blue/50">
              <h3 className="text-base font-bold text-white">
                {isAddingNew ? 'Add New Product' : `Edit Product: ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Graphitized Petroleum Coke (GPC)"
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grade Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                    placeholder="e.g. GPC-98.5"
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline / Subheading</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  placeholder="e.g. Ultra-High Purity Carbon Additive for Foundries"
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Metallurgy Description</label>
                <textarea
                  rows={3}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullDesc: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              {/* Specifications Table */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="block font-bold text-slate-700">Guaranteed Specifications</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Property (e.g. Sulfur)"
                    value={newSpecProp}
                    onChange={(e) => setNewSpecProp(e.target.value)}
                    className="px-2.5 py-1.5 border rounded text-xs"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Value (e.g. 0.05% max)"
                      value={newSpecVal}
                      onChange={(e) => setNewSpecVal(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 border rounded text-xs"
                    />
                    <button type="button" onClick={handleAddSpec} className="btn-navy text-xs px-3">
                      Add
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  {formData.specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded border text-[11px]">
                      <span><strong>{spec.property}:</strong> {spec.value}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          specifications: prev.specifications.filter((_, i) => i !== idx)
                        }))}
                        className="text-red-500 font-bold ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="pt-2 border-t border-slate-200">
                <label className="block font-bold text-slate-700 mb-1">Standard Packaging Details</label>
                <input
                  type="text"
                  value={formData.packaging}
                  onChange={(e) => setFormData(prev => ({ ...prev, packaging: e.target.value }))}
                  placeholder="e.g. 25kg bags, 1 MT jumbo bags with lifting loops"
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
