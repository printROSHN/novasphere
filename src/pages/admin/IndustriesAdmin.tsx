import React, { useState } from 'react';
import { Factory, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

export default function IndustriesAdmin() {
  const { industries, updateIndustry } = useContent();
  const [editingInd, setEditingInd] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    productsSupplied: []
  });

  const [newProdInput, setNewProdInput] = useState('');

  const handleEdit = (ind) => {
    setEditingInd(ind);
    setFormData({
      name: ind.name,
      shortDesc: ind.shortDesc || '',
      productsSupplied: ind.productsSupplied || []
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingInd) {
      updateIndustry({
        ...editingInd,
        ...formData
      });
      toast.success('Industry updated');
      setEditingInd(null);
    }
  };

  const handleAddProduct = () => {
    if (!newProdInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      productsSupplied: [...prev.productsSupplied, newProdInput.trim()]
    }));
    setNewProdInput('');
  };

  const handleRemoveProduct = (idx) => {
    setFormData(prev => ({
      ...prev,
      productsSupplied: prev.productsSupplied.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Industries Served Manager</h2>
        <p className="text-xs text-slate-500">
          Manage target manufacturing sectors and material categories supplied across each industry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {industries.map((ind) => (
          <div
            key={ind.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center mb-3">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">{ind.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 mb-3">{ind.shortDesc}</p>

              {ind.productsSupplied && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Supplied:</span>
                  <div className="flex flex-wrap gap-1">
                    {ind.productsSupplied.slice(0, 3).map((p, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex justify-end">
              <button
                onClick={() => handleEdit(ind)}
                className="btn-outline-navy text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingInd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-brand-dark text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Edit Industry: {editingInd.name}</h3>
              <button onClick={() => setEditingInd(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Industry Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Products Supplied</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newProdInput}
                    onChange={(e) => setNewProdInput(e.target.value)}
                    placeholder="e.g. Graphitized Coke"
                    className="flex-1 px-3 py-1.5 border rounded"
                  />
                  <button type="button" onClick={handleAddProduct} className="btn-navy px-3 py-1.5">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.productsSupplied.map((p, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[11px]">
                      <span>{p}</span>
                      <button type="button" onClick={() => handleRemoveProduct(idx)} className="text-red-500 font-bold ml-1">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingInd(null)}
                  className="px-4 py-2 border rounded text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold px-5 py-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
