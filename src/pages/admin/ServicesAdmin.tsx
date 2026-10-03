import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Globe,
  Ship,
  TrendingUp,
  Users,
  BarChart3,
  X,
  Save
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

const iconOptions = ['Globe', 'Ship', 'TrendingUp', 'Users', 'Briefcase', 'BarChart3'];

export default function ServicesAdmin() {
  const { services, updateService, addService, deleteService } = useContent();

  const [editingService, setEditingService] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    number: '',
    title: '',
    shortDesc: '',
    fullDesc: '',
    icon: 'Globe',
    keyDeliverables: []
  });

  const [newDeliverable, setNewDeliverable] = useState('');

  const handleEdit = (service) => {
    setEditingService(service);
    setIsAddingNew(false);
    setFormData({
      number: service.number,
      title: service.title,
      shortDesc: service.shortDesc,
      fullDesc: service.fullDesc || '',
      icon: service.icon || 'Globe',
      keyDeliverables: service.keyDeliverables || []
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingService(null);
    const nextNum = String(services.length + 1).padStart(2, '0');
    setFormData({
      number: nextNum,
      title: '',
      shortDesc: '',
      fullDesc: '',
      icon: 'Globe',
      keyDeliverables: []
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Service title is required');
      return;
    }

    if (isAddingNew) {
      const newId = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addService({
        id: newId,
        ...formData
      });
      toast.success('Service added successfully');
      setIsAddingNew(false);
    } else if (editingService) {
      updateService({
        ...editingService,
        ...formData
      });
      toast.success('Service updated successfully');
      setEditingService(null);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      deleteService(id);
      toast.success('Service removed');
    }
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setFormData(prev => ({
      ...prev,
      keyDeliverables: [...prev.keyDeliverables, newDeliverable.trim()]
    }));
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (idx) => {
    setFormData(prev => ({
      ...prev,
      keyDeliverables: prev.keyDeliverables.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Services Manager</h2>
          <p className="text-xs text-slate-500">
            Add, edit, or customize NovaSphere Exim's core trade and representation capabilities.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn-gold text-xs px-4 py-2.5 flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-brand-gold font-display">
                  {service.number}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-semibold text-slate-600">
                  Icon: {service.icon}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {service.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                {service.shortDesc}
              </p>

              {service.keyDeliverables && (
                <div className="space-y-1 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">Deliverables ({service.keyDeliverables.length}):</span>
                  {service.keyDeliverables.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <button
                onClick={() => handleEdit(service)}
                className="btn-outline-navy text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(service.id, service.title)}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {(editingService || isAddingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-brand-dark text-white p-5 flex items-center justify-between border-b border-brand-blue/50">
              <h3 className="text-base font-bold text-white">
                {isAddingNew ? 'Add New Trade Service' : `Edit Service: ${editingService?.title}`}
              </h3>
              <button
                onClick={() => {
                  setEditingService(null);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Index Number</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                    placeholder="01"
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Global Sourcing"
                    className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Icon Representation</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary (Homepage card)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                  placeholder="Concise overview..."
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Detailed Scope</label>
                <textarea
                  rows={3}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullDesc: e.target.value }))}
                  placeholder="Detailed commercial scope..."
                  className="w-full px-3 py-2 rounded border border-slate-300 outline-none text-xs focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Deliverables (Bullet Points)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="Add bullet point..."
                    className="flex-1 px-3 py-1.5 rounded border border-slate-300 outline-none text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="btn-navy text-xs px-3 py-1.5"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {formData.keyDeliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[11px] text-slate-700 truncate">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
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
                  onClick={() => {
                    setEditingService(null);
                    setIsAddingNew(false);
                  }}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
