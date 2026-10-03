import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Globe2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';
import { submitInquiry, generateMailtoLink } from '../../lib/inquiryService';

const ContactSection = () => {
  const { company, addInquiry } = useContent();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    inquiryType: 'Buyer looking for products',
    productInterest: 'Graphitized Petroleum Coke (GPC)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid work email';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters describing your requirement';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
      // 1. Save to ContentContext (updates local inquiries desk instantly)
      addInquiry(payload);

      // 2. Submit to Supabase inquiries table
      await submitInquiry(payload);

      // 3. Feedback toast
      toast.success(
        'Thank you. Our international trade desk will review your specifications and contact you within 24 business hours.',
        { duration: 6000, position: 'top-center' }
      );

      setSubmittedData(payload);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        country: 'India',
        inquiryType: 'Buyer looking for products',
        productInterest: 'Graphitized Petroleum Coke (GPC)',
        message: ''
      });
    } catch (err) {
      toast.error('Submission received. You can also contact our trade desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-white" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Details & SLA */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
                TRADE DESK & INQUIRIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
                Submit Your Technical Requirement or Partnership Request
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect directly with our international trade desk in Navi Mumbai. We provide fast specification matching, CIF/FOB pricing, and in-country representation roadmaps.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-light border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters</h4>
                  <p className="text-sm font-semibold text-brand-dark">{company.address}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Primary Logistics Corridor: Nhava Sheva (JNPT) Port</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-light border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Trade Desk</h4>
                  <a href={`mailto:${company.email}`} className="text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors block">
                    {company.email}
                  </a>
                  <a href={`mailto:${company.secondaryEmail}`} className="text-xs text-slate-500 hover:text-brand-gold transition-colors">
                    {company.secondaryEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-light border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone & WhatsApp</h4>
                  <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-brand-dark hover:text-brand-gold transition-colors block">
                    {company.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">{company.workingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-light border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Turnaround Commitment</h4>
                  <p className="text-sm font-semibold text-brand-dark">Guaranteed response within 24 business hours</p>
                  <p className="text-xs text-slate-500 mt-0.5">Formal quotation & COA review provided</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting RFQ Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-light rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-brand-dark mb-1">
                Commercial Inquiry / Request for Quotation (RFQ)
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your details below. For custom mesh sizes or chemical specs, please mention them in the requirements box.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe / Rajesh Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold ${
                        errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Metallurgy Ltd."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold ${
                        errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Country */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Country / Region
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. India, UAE, Italy"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  {/* Inquirer Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      I am a:
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                      <option value="Buyer looking for products">Buyer looking for products</option>
                      <option value="Manufacturer seeking representation">Manufacturer seeking representation</option>
                      <option value="General Trade Enquiry">General Trade Enquiry</option>
                    </select>
                  </div>
                </div>

                {/* Product of Interest */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product / Capability of Interest
                  </label>
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    <option value="Graphitized Petroleum Coke (GPC)">Graphitized Petroleum Coke (GPC) — Flagship</option>
                    <option value="Carbon Raiser / Recarburizer (CR95)">Carbon Raiser / Recarburizer (CR95)</option>
                    <option value="Graphite Granules">Graphite Granules</option>
                    <option value="Foundry Coke">Foundry Coke</option>
                    <option value="Ferro Alloys">Ferro Alloys</option>
                    <option value="Rubber Chemicals">Rubber Chemicals</option>
                    <option value="Calcium Carbonate (PCC/GCC)">Calcium Carbonate (PCC/GCC)</option>
                    <option value="Industrial Raw Materials & Minerals">Industrial Raw Materials & Minerals</option>
                    <option value="India Market Entry & Representation">India Market Entry & Representation (Retainer+Commission)</option>
                    <option value="Global Sourcing Solutions">Global Sourcing Solutions</option>
                    <option value="Other">Other Custom Requirement</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requirement Details / Specifications <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe required grades, mesh size (e.g. 1-5mm), volume (e.g. 50 MT), delivery port (e.g. CIF Nhava Sheva), or representation scope..."
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold ${
                      errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full sm:w-auto text-sm px-8 py-3 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-dark border-t-transparent" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry to Trade Desk'}</span>
                  </button>

                  {submittedData && (
                    <a
                      href={generateMailtoLink(submittedData)}
                      className="text-xs text-brand-navy hover:text-brand-gold font-medium underline flex items-center gap-1"
                    >
                      <span>Also open in email client</span>
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
