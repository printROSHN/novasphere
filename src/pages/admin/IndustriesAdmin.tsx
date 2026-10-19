import React, { useState } from 'react';
import {
  Factory,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  Flame,
  Layers,
  Car,
  Cpu,
  Package,
  FlaskConical,
  Building2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

const availableIcons = [
  { label: 'Factory (Heavy Engineering)', value: 'Factory', icon: Factory },
  { label: 'Flame (Foundry & Casting)', value: 'Flame', icon: Flame },
  { label: 'Layers (Steel & Metallurgy)', value: 'Layers', icon: Layers },
  { label: 'Car (Automotive)', value: 'Car', icon: Car },
  { label: 'Cpu (Electronics)', value: 'Cpu', icon: Cpu },
  { label: 'FlaskConical (Chemicals)', value: 'FlaskConical', icon: FlaskConical },
  { label: 'Building2 (Infrastructure)', value: 'Building2', icon: Building2 },
  { label: 'Package (Packaging & Logistics)', value: 'Package', icon: Package }
];

const iconComponentMap = {
  Factory,
  Flame,
  Layers,
  Car,
  Cpu,
  FlaskConical,
  Building2,
  Package
};

export default function IndustriesAdmin() {
  const { industries, addIndustry, updateIndustry, deleteIndustry } = useContent();

  const [editingInd, setEditingInd] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    icon: 'Factory',
    productsSupplied: []
  });

  const [newProdInput, setNewProdInput] = useState('');

  const handleEdit = (ind) => {
    setEditingInd(ind);
    setIsAddingNew(false);
    setFormData({
      name: ind.name,
      shortDesc: ind.shortDesc || '',
      icon: ind.icon || 'Factory',
      productsSupplied: ind.productsSupplied || []
    });
    setNewProdInput('');
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingInd(null);
    setFormData({
      name: '',
      shortDesc: '',
      icon: 'Factory',
      productsSupplied: []
    });
    setNewProdInput('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Industry name is required');
      return;
    }

    if (isAddingNew) {
      addIndustry(formData);
      toast.success(`Industry "${formData.name}" added successfully`);
      setIsAddingNew(false);
    } else if (editingInd) {
      updateIndustry({
        ...editingInd,
        ...formData
      });
      toast.success(`Industry "${formData.name}" updated successfully`);
      setEditingInd(null);
    }
  };

  const handleDelete = (indId, indName) => {
    if (industries.length <= 1) {
      toast.error('You must keep at least one industry');
      return;
    }
    if (window.confirm(`Are you sure you want to remove the industry "${indName}"?`)) {
      deleteIndustry(indId);
      toast.success(`Industry "${indName}" removed`);
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
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Industries Served Manager</h2>
          <p className="text-xs text-slate-500">
            Add, modify, or remove target industrial sectors and material categories supplied.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn-gold text-xs px-4 py-2.5 flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Industry</span>
        </button>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {industries.map((ind) => {
          const IconComponent = iconComponentMap[ind.icon] || Factory;

          return (
            <div
              key={ind.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                    {ind.icon || 'Factory'}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1">{ind.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-3 mb-3 leading-relaxed">{ind.shortDesc}</p>

                {ind.productsSupplied && ind.productsSupplied.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Supplied:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ind.productsSupplied.map((p, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleEdit(ind)}
                  className="btn-outline-navy text-xs px-3 py-1.5 flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(ind.id, ind.name)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                  title="Delete Industry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Industry Modal */}
      {(editingInd || isAddingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-brand-dark text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                {isAddingNew ? 'Add New Industry Sector' : `Edit Industry: ${editingInd?.name}`}
              </h3>
              <button
                onClick={() => {
                  setEditingInd(null);
                  setIsAddingNew(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Industry Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sector Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                >
                  {availableIcons.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-2 focus:ring-brand-gold text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Products Supplied</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newProdInput}
                    onChange={(e) => setNewProdInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 border rounded border-slate-300 outline-none text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddProduct();
                      }
                    }}
                  />
                  <button type="button" onClick={handleAddProduct} className="btn-navy px-3 py-1.5 text-xs">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {formData.productsSupplied.map((p, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-slate-700 border text-[11px]">
                      <span>{p}</span>
                      <button type="button" onClick={() => handleRemoveProduct(idx)} className="text-red-500 font-bold ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingInd(null);
                    setIsAddingNew(false);
                  }}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5 text-xs">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Industry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
