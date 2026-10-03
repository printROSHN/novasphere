import React from 'react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ContactSection from '../components/home/ContactSection';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Contact = () => {
  const { company } = useContent();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="Contact Us & Request For Quotation (RFQ)"
        description="Contact NovaSphere Exim in Navi Mumbai, Maharashtra, India. Submit RFQs for Graphitized Petroleum Coke (GPC), Carbon Raisers, chemicals, or explore India market representation."
      />
      <TopBar />
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-95" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">International Trade Desk</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contact NovaSphere Exim
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Get in touch with our international trading and market development desk in Navi Mumbai, India.
            </p>
          </div>
        </section>

        {/* Lead Form & Direct Contact Details */}
        <ContactSection />

        {/* Interactive Location & Port Corridor Card */}
        <section className="py-12 bg-surface-light border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Strategic Maritime Location</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  Headquartered in Navi Mumbai, Maharashtra, India
                </h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                  Located within 30 minutes of Jawaharlal Nehru Port (JNPT) / Nhava Sheva, India's most advanced container gateway for international maritime commerce.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <a
                  href={`tel:${company.phone.replace(/\s+/g, '')}`}
                  className="btn-navy text-xs px-5 py-2.5 w-full sm:w-auto text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Trade Desk</span>
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="btn-gold text-xs px-5 py-2.5 w-full sm:w-auto text-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Specifications</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
