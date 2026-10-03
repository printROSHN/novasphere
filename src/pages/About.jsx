import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Award, MapPin, ArrowRight, CheckCircle2, Globe, Users } from 'lucide-react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { company } = useContent();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO
        title="About Us"
        description="Learn about NovaSphere Exim, our vision, commitment, leadership, and our headquarters in Navi Mumbai, India."
      />
      <TopBar />
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-brand-dark py-16 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark opacity-90" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="badge-gold mb-3 inline-block">Expanding Trade Globally</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              About NovaSphere Exim
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">
              Connecting Markets. Building Global Business.
            </p>
          </div>
        </section>

        {/* Core Narrative */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Who We Are
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight">
                  An International Trading & Market-Development Partner
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  NovaSphere Exim is an international trading and market-development company focused on connecting manufacturers, suppliers and buyers across borders.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We create business opportunities through global sourcing, import-export facilitation, B2B business development and India market representation, with a focus on selected industrial, manufacturing and specialty products.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our approach goes beyond product trading. We work to understand market requirements, identify relevant business opportunities and develop long-term commercial relationships between international suppliers and customers.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  For manufacturers seeking to establish or expand their presence in India, our model provides a flexible approach to local market development, buyer identification and business relationship building.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80"
                    alt="International shipping logistics at port"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6 bg-brand-navy text-white space-y-2">
                    <h3 className="font-bold text-base text-brand-gold">Global Reach. Local Expertise.</h3>
                    <p className="text-xs text-slate-300">
                      Based strategically in Navi Mumbai, adjacent to India's premier international container port, Nhava Sheva (JNPT).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Commitment */}
        <section className="py-16 sm:py-20 bg-surface-light border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {company.vision}
                </p>
              </div>

              {/* Commitment Card */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-lg bg-brand-gold text-brand-dark flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">Our Commitment</h3>
                <p className="text-sm font-semibold text-brand-navy">
                  {company.commitment}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We believe enduring international commercial ventures are rooted in unwavering contract honor, specification precision, and collaborative transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Location */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-dark rounded-2xl p-8 sm:p-12 text-white border border-brand-blue/50 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="badge-gold">Corporate Leadership</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {company.founder}
                  </h3>
                  <p className="text-sm text-brand-gold font-semibold">
                    {company.designation} • NovaSphere Exim
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Leading NovaSphere Exim with a dedicated focus on industrial raw materials, cross-border commercial execution, and high-performance representation models for international manufacturers entering India.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      {company.locationDisplay}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Globe className="w-4 h-4 text-brand-gold" />
                      India & Global Corridors
                    </span>
                  </div>
                </div>

                <div className="bg-brand-navy p-6 rounded-xl border border-brand-gold/30 space-y-4">
                  <h4 className="text-base font-bold text-white border-b border-slate-700 pb-2">
                    Navi Mumbai Strategic Advantage
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>Immediate access to Jawaharlal Nehru Port Trust (JNPT) / Nhava Sheva.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>Direct connectivity to major Western India industrial corridors (Pune, Gujarat, Aurangabad).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>Experienced trade desk handling customs clearing, maritime logistics and storage.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/contact" className="btn-gold w-full text-xs py-2.5 text-center justify-center">
                      <span>Contact Our Leadership & Trade Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
