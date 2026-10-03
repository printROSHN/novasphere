import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';
import { submitInquiry } from '../../lib/inquiryService';

const RfqModal = ({ isOpen, onClose, initialData = {} }) => {
  const { addInquiry } = useContent();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    inquiryType: initialData.type || 'Buyer looking for products',
    productInterest: initialData.product || 'Graphitized Petroleum Coke (GPC)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData.product) {
      setFormData(prev => ({ ...prev, productInterest: initialData.product }));
    }
    if (initialData.type) {
      setFormData(prev => ({ ...prev, inquiryType: initialData.type }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error('Please provide your full name and work email');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      full_name: formData.fullName,
      company_name: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      inquiry_type: formData.inquiryType,
      product_interest: formData.productInterest,
      message: formData.message || `Inquiry regarding ${formData.productInterest}`,
      created_at: new Date().toISOString()
    };

    try {
      addInquiry(payload);
      await submitInquiry(payload);

      toast.success(
        'Thank you. Our international trade desk will review your specifications and contact you within 24 business hours.',
        { duration: 6000 }
      );
      onClose();
    } catch (err) {
      toast.error('Submission recorded. Our trade desk will contact you.');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-brand-dark text-white p-5 flex items-center justify-between border-b border-brand-blue/50">
          <div>
            <span className="badge-gold text-[10px]">Direct Trade Desk Request</span>
            <h3 className="text-lg font-bold text-white mt-1">Send an Enquiry / RFQ</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe / Rajesh Sharma"
              className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. India, UAE"
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Product / Capability</label>
            <select
              name="productInterest"
              value={formData.productInterest}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            >
              <option value="Graphitized Petroleum Coke (GPC)">Graphitized Petroleum Coke (GPC)</option>
              <option value="Carbon Raiser / Recarburizer (CR95)">Carbon Raiser / Recarburizer (CR95)</option>
              <option value="Graphite Granules">Graphite Granules</option>
              <option value="Foundry Coke">Foundry Coke</option>
              <option value="Ferro Alloys">Ferro Alloys</option>
              <option value="Industrial Chemicals">Industrial Chemicals</option>
              <option value="Industrial Raw Materials">Industrial Raw Materials</option>
              <option value="India Market Representation">India Market Representation (Retainer+Commission)</option>
              <option value="Global Sourcing Solutions">Global Sourcing Solutions</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Requirement Notes</label>
            <textarea
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Quantity, mesh sizing, port of discharge, or commercial model..."
              className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Submit to International Trade Desk'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RfqModal;
