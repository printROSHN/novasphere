import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const Navbar = ({ onOpenRfq }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { products, company } = useContent();

  const productsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) => `
    inline-flex items-center text-sm lg:text-[14px] xl:text-[15px] font-semibold tracking-normal transition-colors duration-200 py-1.5 whitespace-nowrap
    ${isActive(path) && (path !== '/' || location.pathname === '/')
      ? 'text-brand-gold font-bold'
      : 'text-slate-700 hover:text-brand-navy'
    }
  `;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 lg:h-24">
          {/* 1. Left: Logo */}
          <Link to="/" className="flex items-center py-1.5 group focus:outline-none flex-shrink-0">
            <img
              src="/assets/logo.png"
              alt="NovaSphere Exim - Expanding Trade Globally"
              className="h-12 sm:h-14 lg:h-16 xl:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* 2. Center: Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 2xl:gap-8 flex-shrink-0">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>

            <Link to="/about" className={navLinkClass('/about')}>
              About Us
            </Link>

            {/* Products Dropdown - Clickable and hoverable with cursor bridge */}
            <div
              ref={productsRef}
              className="relative py-2"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <div className="inline-flex items-center gap-0.5">
                <Link
                  to="/products"
                  className={navLinkClass('/products')}
                  onClick={() => setProductsOpen(false)}
                >
                  <span>Products</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductsOpen(!productsOpen);
                  }}
                  className="p-1 text-slate-500 hover:text-brand-gold focus:outline-none"
                  aria-label="Toggle Products Menu"
                  aria-expanded={productsOpen}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      productsOpen ? 'rotate-180 text-brand-gold' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 animate-fade-in z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-slate-200/80 py-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Core Product Lines
                    </div>
                    {products.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products#${cat.id}`}
                        onClick={() => setProductsOpen(false)}
                        className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-gold transition-colors"
                      >
                        <div className="font-semibold text-slate-900">{cat.name}</div>
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link
                        to="/products"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-bold text-brand-navy hover:text-brand-gold"
                      >
                        <span>View All Products</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/industries" className={navLinkClass('/industries')}>
              Industries
            </Link>

            <Link to="/global-markets" className={navLinkClass('/global-markets')}>
              Global Markets
            </Link>

            <Link to="/contact" className={navLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          {/* 3. Right: Desktop CTAs */}
          <div className="hidden lg:flex items-center justify-end gap-3 xl:gap-3.5 flex-shrink-0">
            <Link
              to="/contact"
              className="btn-outline-navy text-xs sm:text-[13px] px-4 py-2.5 font-bold whitespace-nowrap shadow-xs"
            >
              Contact Us
            </Link>

            <button
              onClick={() => onOpenRfq ? onOpenRfq() : window.location.assign('/contact')}
              className="btn-gold text-xs sm:text-[13px] px-4 py-2.5 font-bold whitespace-nowrap shadow-xs"
            >
              Send an Enquiry
            </button>
          </div>

          {/* Mobile Actions: Enquire Button + Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={() => onOpenRfq ? onOpenRfq() : window.location.assign('/contact')}
              className="btn-gold text-xs font-bold px-3 sm:px-4 py-1.5 shadow-xs"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-brand-navy hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand-navy" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] sm:top-[80px] bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      {mobileMenuOpen && (
        <div className="relative z-40 lg:hidden border-t border-slate-200 bg-white shadow-2xl animate-fade-in max-h-[calc(100vh-4.5rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Quick Notice Banner */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>B2B Global Trade Desk</span>
            <span className="text-brand-gold font-semibold">Navi Mumbai, IN</span>
          </div>

          <div className="px-4 pt-3 pb-6 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-amber-50 text-brand-gold font-bold border-l-4 border-brand-gold'
                  : 'text-slate-800 hover:bg-slate-50 hover:text-brand-navy'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/about')
                  ? 'bg-amber-50 text-brand-gold font-bold border-l-4 border-brand-gold'
                  : 'text-slate-800 hover:bg-slate-50 hover:text-brand-navy'
              }`}
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Mobile Products Accordion */}
            <div className="rounded-lg overflow-hidden border border-slate-100">
              <div
                className={`flex items-center justify-between px-3.5 py-3 text-base font-semibold transition-colors cursor-pointer ${
                  isActive('/products')
                    ? 'bg-amber-50/70 text-brand-gold font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              >
                <Link
                  to="/products"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 hover:text-brand-gold"
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileProductsOpen(!mobileProductsOpen);
                  }}
                  className="p-1 text-slate-500 hover:text-brand-gold focus:outline-none"
                  aria-label="Expand Products"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileProductsOpen ? 'rotate-180 text-brand-gold' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileProductsOpen && (
                <div className="bg-slate-50/80 px-3 py-2 space-y-1 border-t border-slate-100">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Product Categories
                  </div>
                  {products.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products#${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-700 hover:text-brand-gold hover:bg-white rounded-md font-medium transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="pt-1.5 border-t border-slate-200/60">
                    <Link
                      to="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-brand-navy hover:text-brand-gold"
                    >
                      <span>Explore Full Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/industries')
                  ? 'bg-amber-50 text-brand-gold font-bold border-l-4 border-brand-gold'
                  : 'text-slate-800 hover:bg-slate-50 hover:text-brand-navy'
              }`}
            >
              <span>Industries We Serve</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/global-markets"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/global-markets')
                  ? 'bg-amber-50 text-brand-gold font-bold border-l-4 border-brand-gold'
                  : 'text-slate-800 hover:bg-slate-50 hover:text-brand-navy'
              }`}
            >
              <span>Global Markets & Corridors</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive('/contact')
                  ? 'bg-amber-50 text-brand-gold font-bold border-l-4 border-brand-gold'
                  : 'text-slate-800 hover:bg-slate-50 hover:text-brand-navy'
              }`}
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Quick Mobile Action CTAs */}
            <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenRfq) onOpenRfq();
                  else window.location.assign('/contact');
                }}
                className="btn-gold w-full justify-center text-sm font-bold py-3 shadow-sm"
              >
                Send an Enquiry / RFQ
              </button>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-outline-navy w-full justify-center text-sm font-bold py-3"
              >
                Contact Trade Desk
              </Link>
            </div>

            {/* Mobile Direct Contact Details */}
            {company && (
              <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 p-3.5 rounded-lg space-y-2 text-xs text-slate-600">
                <a
                  href={`tel:${company.phone ? company.phone.replace(/\s+/g, '') : ''}`}
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>{company.phone}</span>
                </a>
                <a
                  href={`mailto:${company.email || ''}`}
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span className="truncate">{company.email}</span>
                </a>
                <div className="flex items-center gap-2 text-slate-500 pt-1 border-t border-slate-200/50">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>{company.locationDisplay || 'Navi Mumbai, India'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

