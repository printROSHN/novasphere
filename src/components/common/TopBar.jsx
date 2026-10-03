import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const TopBar = () => {
  const { company } = useContent();

  return (
    <div className="bg-brand-dark text-slate-300 text-xs border-b border-brand-blue/40 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Contact Info */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-150"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5 text-brand-gold" />
            <span>{company.email}</span>
          </a>

          <a
            href={`tel:${company.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-150"
            title="Call Trade Desk"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>{company.phone}</span>
          </a>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span>{company.locationDisplay}</span>
          </div>
        </div>

        {/* Right: Slogan & Socials */}
        <div className="flex items-center gap-4">
          <a
            href={company.socials?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-slate-400 hover:text-brand-gold transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="text-brand-gold font-medium tracking-wide">
            {company.tagline}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
