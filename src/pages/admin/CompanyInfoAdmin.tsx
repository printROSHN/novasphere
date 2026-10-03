import React, { useState } from 'react';
import { Building, Save, Mail, Phone, MapPin, ShieldCheck, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

export default function CompanyInfoAdmin() {
  const { company, updateCompanyInfo } = useContent();

  const [formData, setFormData] = useState({
    name: company.name || 'NovaSphere Exim',
    tagline: company.tagline || 'Expanding Trade Globally',
    subTagline: company.subTagline || 'Global Trade. Local Expertise. Sustainable Growth.',
    founder: company.founder || 'Suyash Yewale',
    designation: company.designation || 'Founder & Director',
    email: company.email || 'suyash23yewale@gmail.com',
    secondaryEmail: company.secondaryEmail || 'info@novaspherexim.com',
    phone: company.phone || '+91 98765 43210',
    whatsapp: company.whatsapp || '+91 98765 43210',
    address: company.address || 'Navi Mumbai, Maharashtra, India',
    locationDisplay: company.locationDisplay || 'Navi Mumbai, Maharashtra',
    workingHours: company.workingHours || 'Monday - Saturday: 9:00 AM - 7:00 PM IST (Trade Desk Open)',
    mission: company.mission || '',
    vision: company.vision || '',
    commitment: company.commitment || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateCompanyInfo(formData);
    toast.success('Company & Contact settings updated');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Company & Contact Settings</h2>
        <p className="text-xs text-slate-500">
          Manage NovaSphere Exim corporate details, headquarters, trade desk emails, and founder profile.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs">
        {/* Brand Core */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-brand-gold" />
            <span>Corporate Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Sub-Tagline / Value Statement</label>
            <input
              type="text"
              name="subTagline"
              value={formData.subTagline}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            />
          </div>
        </div>

        {/* Leadership */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-gold" />
            <span>Leadership & Representation</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Founder & Director Name</label>
              <input
                type="text"
                name="founder"
                value={formData.founder}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Corporate Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Desk */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-brand-gold" />
            <span>Trade Desk Communications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Email Desk</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary / General Email</label>
              <input
                type="email"
                name="secondaryEmail"
                value={formData.secondaryEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Line</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>Headquarters & Port Logistics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Postal Address / Headquarters</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Display Location (Topbar/Footer)</label>
              <input
                type="text"
                name="locationDisplay"
                value={formData.locationDisplay}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Trade Desk Working Hours</label>
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-slate-200">
          <button type="submit" className="btn-gold px-6 py-2.5 flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Save Company Information</span>
          </button>
        </div>
      </form>
    </div>
  );
}
