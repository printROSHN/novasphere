import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const Navbar = ({ onOpenRfq }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { services, products } = useContent();

  const productsRef = useRef(null);
  const servicesRef = useRef(null);

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
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) => `
    inline-flex items-center text-[13px] 2xl:text-sm font-semibold tracking-normal transition-colors duration-200 py-1 whitespace-nowrap
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
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Increased size per requirement */}
          <Link to="/" className="flex items-center py-2 group focus:outline-none flex-shrink-0">
            <img
              src="/assets/logo.png"
              alt="NovaSphere Exim - Expanding Trade Globally"
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation + CTAs Grouped Container */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-7">
            <nav className="flex items-center gap-4 2xl:gap-5">
              <Link to="/" className={navLinkClass('/')}>
                Home
              </Link>

            <Link to="/about" className={navLinkClass('/about')}>
              About Us
            </Link>

            {/* Products Dropdown - Clickable and hoverable with seamless cursor bridge */}
            <div
              ref={productsRef}
              className="relative py-2"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <div className="inline-flex items-center">
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
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      productsOpen ? 'rotate-180 text-brand-gold' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu with zero gap bridge via padding */}
              {productsOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 animate-fade-in z-50">
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
                        <div className="text-[11px] text-slate-500 truncate">
                          {cat.bullets ? cat.bullets.slice(0, 3).join(' • ') : ''}
                        </div>
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

            {/* Services Dropdown - Clickable and hoverable with seamless cursor bridge */}
            <div
              ref={servicesRef}
              className="relative py-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div className="inline-flex items-center">
                <Link
                  to="/services"
                  className={navLinkClass('/services')}
                  onClick={() => setServicesOpen(false)}
                >
                  <span>Services</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setServicesOpen(!servicesOpen);
                  }}
                  className="p-1 text-slate-500 hover:text-brand-gold focus:outline-none"
                  aria-label="Toggle Services Menu"
                  aria-expanded={servicesOpen}
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-brand-gold' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu with zero gap bridge via padding */}
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-80 animate-fade-in z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-slate-200/80 py-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Our 6 Integrated Capabilities
                    </div>
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services#${service.id}`}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors"
                      >
                        <span className="font-bold text-brand-gold text-[11px] mt-0.5">
                          {service.number}
                        </span>
                        <div>
                          <div className="font-semibold text-slate-900">{service.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {service.shortDesc}
                          </div>
                        </div>
                      </Link>
                    ))}
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

            <Link to="/for-manufacturers" className={navLinkClass('/for-manufacturers')}>
              For Manufacturers
            </Link>

            <Link to="/for-buyers" className={navLinkClass('/for-buyers')}>
              For Buyers
            </Link>

              <Link to="/contact" className={navLinkClass('/contact')}>
                Contact
              </Link>
            </nav>

            {/* Clean Vertical Divider between Navigation and CTAs */}
            <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

            {/* Desktop CTAs with tight, consistent spacing */}
            <div className="flex items-center gap-2.5 2xl:gap-3 flex-shrink-0">
              <Link
                to="/for-manufacturers"
                className="btn-outline-navy text-xs px-3.5 py-2 font-semibold whitespace-nowrap"
              >
                Partner With Us
              </Link>

              <button
                onClick={() => onOpenRfq ? onOpenRfq() : window.location.assign('/contact')}
                className="btn-gold text-xs px-3.5 py-2 font-semibold whitespace-nowrap"
              >
                Send an Enquiry
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onOpenRfq ? onOpenRfq() : window.location.assign('/contact')}
              className="btn-gold text-xs px-3 py-1.5 sm:hidden"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white shadow-xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              About Us
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              Products (Foundry & GPC, Chemicals, Minerals)
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              Services (6 Core Pillars)
            </Link>
            <Link
              to="/industries"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              Industries We Serve
            </Link>
            <Link
              to="/global-markets"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              Global Markets & Corridors
            </Link>
            <Link
              to="/for-manufacturers"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              For Manufacturers (India Representation)
            </Link>
            <Link
              to="/for-buyers"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              For Buyers (Global Sourcing)
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-brand-gold"
            >
              Contact Us
            </Link>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/for-manufacturers"
                className="btn-outline-navy w-full justify-center text-sm py-2.5"
              >
                Partner With Us
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenRfq) onOpenRfq();
                  else window.location.assign('/contact');
                }}
                className="btn-gold w-full justify-center text-sm py-2.5"
              >
                Send an Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
