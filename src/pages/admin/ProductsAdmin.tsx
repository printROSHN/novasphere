import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  Save,
  Package,
  FolderPlus,
  Settings2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';
import { CATEGORY_IMAGE_POOL } from '../../data/products';

export default function ProductsAdmin() {
  const {
    products,
    addProductCategory,
    updateProductCategory,
    deleteProductCategory,
    updateProduct,
    addProduct,
    deleteProduct
  } = useContent();

  const [selectedCatId, setSelectedCatId] = useState(products[0]?.id || 'foundry-metallurgy');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);

  // Category (Section) Modal State
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    tagline: '',
    bullets: []
  });
  const [newBulletInput, setNewBulletInput] = useState('');

  // Product Form State
  const [productFormData, setProductFormData] = useState({
    categoryId: selectedCatId,
    name: '',
    code: '',
    tagline: '',
    featured: false,
    shortDesc: '',
    fullDesc: '',
    applications: [],
    granulationSizes: [],
    packaging: ''
  });

  const [newApp, setNewApp] = useState('');
  const [newSize, setNewSize] = useState('');

  const currentCategory = products.find(c => c.id === selectedCatId) || products[0];

  // --- Category (Section) Handlers ---
  const handleOpenAddSection = () => {
    setEditingCategory(null);
    const assignedImage = CATEGORY_IMAGE_POOL[products.length % CATEGORY_IMAGE_POOL.length];
    setCategoryFormData({
      name: '',
      tagline: '',
      image: assignedImage,
      bullets: []
    });
    setNewBulletInput('');
    setIsSectionModalOpen(true);
  };

  const handleOpenEditSection = (cat) => {
    setEditingCategory(cat);
    setCategoryFormData({
      name: cat.name || '',
      tagline: cat.tagline || '',
      image: cat.image || '',
      bullets: cat.bullets || []
    });
    setNewBulletInput('');
    setIsSectionModalOpen(true);
  };

  const handleSaveSection = (e) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) {
      toast.error('Section name is required');
      return;
    }

    if (editingCategory) {
      updateProductCategory(editingCategory.id, categoryFormData);
      toast.success(`Section "${categoryFormData.name}" updated`);
    } else {
      const created = addProductCategory(categoryFormData);
      setSelectedCatId(created.id);
      toast.success(`Section "${categoryFormData.name}" created`);
    }
    setIsSectionModalOpen(false);
  };

  const handleDeleteSection = (catId, catName) => {
    if (products.length <= 1) {
      toast.error('You must keep at least one product section');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the section "${catName}" and all products under it?`)) {
      deleteProductCategory(catId);
      const remaining = products.filter(c => c.id !== catId);
      if (remaining.length > 0) setSelectedCatId(remaining[0].id);
      toast.success(`Section "${catName}" removed`);
    }
  };

  const handleAddBullet = () => {
    if (!newBulletInput.trim()) return;
    setCategoryFormData(prev => ({
      ...prev,
      bullets: [...prev.bullets, newBulletInput.trim()]
    }));
    setNewBulletInput('');
  };

  const handleRemoveBullet = (index) => {
    setCategoryFormData(prev => ({
      ...prev,
      bullets: prev.bullets.filter((_, i) => i !== index)
    }));
  };

  // --- Product Handlers ---
  const handleEditProduct = (product, catId) => {
    setEditingProduct(product);
    setIsAddingNewProduct(false);
    setProductFormData({
      categoryId: catId || selectedCatId,
      name: product.name || '',
      code: product.code || '',
      tagline: product.tagline || '',
      featured: !!product.featured,
      shortDesc: product.shortDesc || '',
      fullDesc: product.fullDesc || '',
      applications: product.applications || [],
      granulationSizes: product.granulationSizes || [],
      packaging: product.packaging || ''
    });
  };

  const handleAddNewProduct = () => {
    setIsAddingNewProduct(true);
    setEditingProduct(null);
    setProductFormData({
      categoryId: selectedCatId,
      name: '',
      code: '',
      tagline: '',
      featured: false,
      shortDesc: '',
      fullDesc: '',
      applications: [],
      granulationSizes: ['Standard export packaging', 'Customer specific sizing'],
      packaging: '25kg HDPE bags, 1 MT jumbo bags with liner'
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productFormData.name.trim()) {
      toast.error('Product name is required');
      return;
    }

    const targetCatId = productFormData.categoryId || selectedCatId;

    if (isAddingNewProduct) {
      const newId = productFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addProduct(targetCatId, {
        id: newId,
        ...productFormData
      });
      toast.success('Product added successfully');
      setIsAddingNewProduct(false);
    } else if (editingProduct) {
      updateProduct(targetCatId, {
        ...editingProduct,
        ...productFormData
      });
      toast.success('Product updated successfully');
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (catId, prodId, prodName) => {
    if (window.confirm(`Are you sure you want to remove "${prodName}"?`)) {
      deleteProduct(catId, prodId);
      toast.success('Product removed');
    }
  };

  const handleAddApp = () => {
    if (!newApp.trim()) return;
    setProductFormData(prev => ({
      ...prev,
      applications: [...prev.applications, newApp.trim()]
    }));
    setNewApp('');
  };

  const handleRemoveApp = (idx) => {
    setProductFormData(prev => ({
      ...prev,
      applications: prev.applications.filter((_, i) => i !== idx)
    }));
  };

  const handleAddSize = () => {
    if (!newSize.trim()) return;
    setProductFormData(prev => ({
      ...prev,
      granulationSizes: [...prev.granulationSizes, newSize.trim()]
    }));
    setNewSize('');
  };

  const handleRemoveSize = (idx) => {
    setProductFormData(prev => ({
      ...prev,
      granulationSizes: prev.granulationSizes.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Products & Sections Manager</h2>
          <p className="text-xs text-slate-500">
            Add product sections (categories) and products under each section. All changes sync live across the catalog.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleOpenAddSection}
            className="btn-outline-navy text-xs px-3.5 py-2.5 flex items-center gap-1.5 shadow-xs"
          >
            <FolderPlus className="w-4 h-4 text-brand-gold" />
            <span>Add New Section</span>
          </button>
          <button
            onClick={handleAddNewProduct}
            className="btn-gold text-xs px-4 py-2.5 flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product to {currentCategory?.name || 'Section'}</span>
          </button>
        </div>
      </div>

      {/* Section Tabs with Edit/Delete Controls */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Product Sections ({products.length})
          </span>
          {currentCategory && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEditSection(currentCategory)}
                className="text-[11px] text-brand-navy hover:text-brand-gold font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Section</span>
              </button>
              <button
                onClick={() => handleDeleteSection(currentCategory.id, currentCategory.name)}
                className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Section</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {products.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedCatId === cat.id
                  ? 'bg-brand-navy text-brand-gold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCatId === cat.id ? 'bg-brand-gold text-brand-dark' : 'bg-slate-200 text-slate-700'
              }`}>
                {cat.products?.length || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid in selected section (Specifications removed per Item 9) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">
            Products in "{currentCategory?.name}" ({currentCategory?.products?.length || 0})
          </h3>
          <p className="text-xs text-slate-500">{currentCategory?.tagline}</p>
        </div>

        {(!currentCategory?.products || currentCategory.products.length === 0) ? (
          <div className="bg-white rounded-xl p-10 border border-slate-200 text-center space-y-3">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No products in this section yet</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Click the button below to add your first product under "{currentCategory?.name}".
            </p>
            <button
              onClick={handleAddNewProduct}
              className="btn-gold text-xs px-4 py-2 inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCategory.products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-dark text-[10px]">{prod.code || 'CORE GRADE'}</span>
                    {prod.featured && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Featured Product
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{prod.name}</h3>
                  <p className="text-xs text-brand-gold font-medium mb-3">{prod.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{prod.shortDesc}</p>

                  {/* Target Metallurgy & Applications */}
                  {prod.applications && prod.applications.length > 0 && (
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Applications & Metallurgy:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {prod.applications.map((app, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Packaging */}
                  {prod.packaging && (
                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
                      <span className="font-semibold text-slate-700">Packaging: </span>
                      {prod.packaging}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleEditProduct(prod, currentCategory.id)}
                    className="btn-outline-navy text-xs px-3 py-1.5 flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Product</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(currentCategory.id, prod.id, prod.name)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section (Category) Add / Edit Modal */}
      {isSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-brand-dark text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                {editingCategory ? `Edit Section: ${editingCategory.name}` : 'Create New Product Section'}
              </h3>
              <button
                onClick={() => setIsSectionModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Section Name *</label>
                <input
                  type="text"
                  required
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Section Tagline</label>
                <input
                  type="text"
                  value={categoryFormData.tagline}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              {/* Category Image Display with sequential assignment */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Assigned Category Visual (Sequential Pool)
                </label>
                <div className="flex items-center gap-3 p-2.5 bg-slate-50 border rounded-lg border-slate-200">
                  <img
                    src={categoryFormData.image || CATEGORY_IMAGE_POOL[products.length % CATEGORY_IMAGE_POOL.length]}
                    alt="Category visual"
                    className="w-16 h-12 object-cover rounded border border-slate-300 shadow-xs flex-shrink-0"
                  />
                  <div className="text-[11px] text-slate-600 min-w-0">
                    <p className="font-semibold text-slate-800">High-Resolution Industrial Asset</p>
                    <p className="truncate text-slate-400 font-mono text-[10px]">
                      {categoryFormData.image || CATEGORY_IMAGE_POOL[products.length % CATEGORY_IMAGE_POOL.length]}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Core Highlights / Bullets</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newBulletInput}
                    onChange={(e) => setNewBulletInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 border rounded border-slate-300 outline-none text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBullet();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="btn-navy text-xs px-3 py-1.5"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {categoryFormData.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[11px] text-slate-700 truncate">{bullet}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(idx)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSectionModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Section</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {(editingProduct || isAddingNewProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-brand-dark text-white p-5 flex items-center justify-between border-b border-brand-blue/50">
              <h3 className="text-base font-bold text-white">
                {isAddingNewProduct ? 'Add New Product' : `Edit Product: ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingNewProduct(false);
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Section *</label>
                  <select
                    value={productFormData.categoryId}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  >
                    {products.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Code</label>
                  <input
                    type="text"
                    value={productFormData.code}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                <div className="flex items-center sm:pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.featured}
                      onChange={(e) => setProductFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="font-bold text-slate-700">Featured Product</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Tagline</label>
                <input
                  type="text"
                  value={productFormData.tagline}
                  onChange={(e) => setProductFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (Catalog Card)</label>
                <textarea
                  rows={2}
                  required
                  value={productFormData.shortDesc}
                  onChange={(e) => setProductFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={productFormData.fullDesc}
                  onChange={(e) => setProductFormData(prev => ({ ...prev, fullDesc: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              {/* Applications */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Applications & Metallurgy</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newApp}
                    onChange={(e) => setNewApp(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded border border-slate-300 outline-none text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddApp();
                      }
                    }}
                  />
                  <button type="button" onClick={handleAddApp} className="btn-navy text-xs px-3 py-1.5">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {productFormData.applications.map((app, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-slate-700 border">
                      <span>{app}</span>
                      <button type="button" onClick={() => handleRemoveApp(idx)} className="text-red-500 font-bold ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Sizing & Packaging */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sizing / Granulation</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded border border-slate-300 outline-none text-xs"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSize();
                        }
                      }}
                    />
                    <button type="button" onClick={handleAddSize} className="btn-navy text-xs px-3 py-1.5">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {productFormData.granulationSizes.map((size, idx) => (
                      <span key={idx} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-slate-700 border">
                        <span>{size}</span>
                        <button type="button" onClick={() => handleRemoveSize(idx)} className="text-red-500 font-bold ml-1">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Export Packaging</label>
                  <input
                    type="text"
                    value={productFormData.packaging}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, packaging: e.target.value }))}
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNewProduct(false);
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
