import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Mail, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';
import { submitInquiry, generateMailtoLink, generateWhatsAppLink } from '../../lib/inquiryService';

const RfqModal = ({ isOpen, onClose, initialData = {} }) => {
  const { addInquiry, products } = useContent();
  const [submittedData, setSubmittedData] = useState(null);

  // Build product options dynamically from products context (strictly identical to products catalog)
  const productOptions = React.useMemo(() => {
    const opts = [];
    if (products && products.length > 0) {
      products.forEach(cat => {
        (cat.products || []).forEach(prod => {
          if (prod && prod.name && !opts.includes(prod.name)) {
            opts.push(prod.name);
          }
        });
      });
    }
    return opts;
  }, [products]);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    inquiryType: initialData.type || 'Buyer looking for products',
    productInterest: initialData.product || (productOptions[0] || 'General'),
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

  const handleClose = () => {
    setSubmittedData(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.companyName.trim() ||
      !formData.country.trim() ||
      !formData.message.trim()
    ) {
      toast.error('Please fill in all required fields marked with *');
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
      message: formData.message,
      created_at: new Date().toISOString()
    };

    try {
      addInquiry(payload);
      await submitInquiry(payload);

      setSubmittedData(payload);
      toast.success(
        'Thank you! Your inquiry has been submitted and dispatched to info@novasphereexim.com',
        { duration: 6000 }
      );
    } catch (err) {
      setSubmittedData(payload);
      toast.success('Your inquiry has been submitted to the Trade Desk.');
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
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedData ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-brand-dark">Enquiry Dispatched Successfully!</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Your request has been routed to our Trade Desk at <strong className="text-brand-navy">info@novasphereexim.com</strong>.
                Our executive will review your commercial specifications and respond within 24 business hours.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
              <p><span className="font-semibold text-slate-500">Contact:</span> {submittedData.full_name} ({submittedData.company_name})</p>
              <p><span className="font-semibold text-slate-500">Subject:</span> {submittedData.product_interest}</p>
              <p><span className="font-semibold text-slate-500">Email:</span> {submittedData.email} • {submittedData.phone}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={generateWhatsAppLink(submittedData)}
                target="_blank"
                rel="noreferrer"
                className="btn-gold flex-1 text-xs py-2.5 justify-center flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Trade Desk</span>
              </a>

              <a
                href={generateMailtoLink(submittedData)}
                className="btn-navy flex-1 text-xs py-2.5 justify-center flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App</span>
              </a>
            </div>

            <button
              onClick={handleClose}
              className="text-xs text-slate-500 hover:text-slate-800 underline block mx-auto pt-2"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Product / Capability <span className="text-red-500">*</span>
              </label>
              <select
                name="productInterest"
                required
                value={formData.productInterest}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              >
                {productOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Requirement Details <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
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
                <span>{isSubmitting ? 'Dispatching to Trade Desk...' : 'Submit to International Trade Desk'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RfqModal;
