import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Globe, Shield, ArrowUpRight } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const Footer = () => {
  const { company, services, products } = useContent();

  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-8 border-t border-brand-blue/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white/95 p-2 rounded shadow-sm">
              <img
                src="/assets/logo.png"
                alt="NovaSphere Exim"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {company.mission}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={company.socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-all duration-200"
                aria-label="NovaSphere Exim on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-all duration-200"
                aria-label="Email NovaSphere Exim"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${company.phone.replace(/\s+/g, '')}`}
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-all duration-200"
                aria-label="Call NovaSphere Exim"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2 text-xs text-brand-gold font-medium">
              Headquarters: Navi Mumbai, Maharashtra, India
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-gold transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-gold transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-brand-gold transition-colors">Industries</Link>
              </li>
              <li>
                <Link to="/global-markets" className="hover:text-brand-gold transition-colors">Global Markets</Link>
              </li>
              <li>
                <Link to="/for-manufacturers" className="hover:text-brand-gold transition-colors">For Manufacturers</Link>
              </li>
              <li>
                <Link to="/for-buyers" className="hover:text-brand-gold transition-colors">For Buyers</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Business & Models */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2.5">
              Business
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services#global-sourcing" className="hover:text-brand-gold transition-colors">Global Sourcing</Link>
              </li>
              <li>
                <Link to="/services#import-export-solutions" className="hover:text-brand-gold transition-colors">Export Development</Link>
              </li>
              <li>
                <Link to="/services#import-export-solutions" className="hover:text-brand-gold transition-colors">Import Solutions</Link>
              </li>
              <li>
                <Link to="/services#india-market-entry" className="hover:text-brand-gold transition-colors">India Market Representation</Link>
              </li>
              <li>
                <Link to="/services#retainer-commission" className="hover:text-brand-gold transition-colors font-medium text-brand-gold">
                  Strategic Partnership Model
                </Link>
              </li>
              <li>
                <Link to="/products#foundry-metallurgy" className="hover:text-brand-gold transition-colors">
                  GPC & Carbon Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2.5">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors break-all">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{company.address}</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                {company.workingHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} {company.name}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-medium">{company.tagline}</span>
            <span className="text-slate-700">|</span>
            <Link to="/admin" className="text-slate-600 hover:text-brand-gold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
