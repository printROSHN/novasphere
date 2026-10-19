import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

export default function PageContentAdmin() {
  const { pageContent, updatePageContent, resetToDefaults } = useContent();
  const [activeTab, setActiveTab] = useState('hero');

  // Local working copy of state
  const [heroData, setHeroData] = useState(pageContent.hero);
  const [aboutData, setAboutData] = useState(pageContent.about);
  const [whyData, setWhyData] = useState(pageContent.whyChooseUs);
  const [gatewaysData, setGatewaysData] = useState(pageContent.dualGateways);
  const [bottomCtaData, setBottomCtaData] = useState(pageContent.bottomCta);

  // Sync state when loaded asynchronously from Supabase
  useEffect(() => {
    if (pageContent) {
      if (pageContent.hero) setHeroData(pageContent.hero);
      if (pageContent.about) setAboutData(pageContent.about);
      if (pageContent.whyChooseUs) setWhyData(pageContent.whyChooseUs);
      if (pageContent.dualGateways) setGatewaysData(pageContent.dualGateways);
      if (pageContent.bottomCta) setBottomCtaData(pageContent.bottomCta);
    }
  }, [pageContent]);

  const handleSaveHero = async (e) => {
    e.preventDefault();
    try {
      await updatePageContent('hero', heroData);
      toast.success('Hero section saved to Supabase');
    } catch {
      toast.error('Error saving Hero section');
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    try {
      await updatePageContent('about', aboutData);
      toast.success('About section saved to Supabase');
    } catch {
      toast.error('Error saving About section');
    }
  };

  const handleSaveWhy = async (e) => {
    e.preventDefault();
    try {
      await updatePageContent('whyChooseUs', whyData);
      toast.success('Why Choose Us saved to Supabase');
    } catch {
      toast.error('Error saving Why Choose Us');
    }
  };

  const handleSaveGateways = async (e) => {
    e.preventDefault();
    try {
      await updatePageContent('dualGateways', gatewaysData);
      toast.success('Dual Gateways saved to Supabase');
    } catch {
      toast.error('Error saving Dual Gateways');
    }
  };

  const handleSaveBottomCta = async (e) => {
    e.preventDefault();
    try {
      await updatePageContent('bottomCta', bottomCtaData);
      toast.success('Bottom CTA saved to Supabase');
    } catch {
      toast.error('Error saving Bottom CTA');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all website content back to factory defaults in Supabase?')) {
      await resetToDefaults();
      toast.success('Content reset to defaults in Supabase');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Page Content Manager</h2>
          <p className="text-xs text-slate-500">
            Edit live headlines, value proposition pills, about narrative, and call-to-actions.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="btn-outline-navy text-xs px-3 py-1.5 flex items-center gap-1.5 self-start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Defaults</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'hero', label: 'Hero Section' },
          { id: 'about', label: 'About Section' },
          { id: 'why', label: 'Why Choose Us' },
          { id: 'bottomCta', label: 'Bottom Banner' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-brand-navy text-brand-gold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Hero Section */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Hero Section Content</h3>
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">Top Pill Badge Text</label>
            <input
              type="text"
              value={heroData.badge}
              onChange={(e) => setHeroData(prev => ({ ...prev, badge: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Headline Start</label>
              <input
                type="text"
                value={heroData.headlineStart}
                onChange={(e) => setHeroData(prev => ({ ...prev, headlineStart: e.target.value }))}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Headline Highlight (Gold Text)</label>
              <input
                type="text"
                value={heroData.headlineHighlight}
                onChange={(e) => setHeroData(prev => ({ ...prev, headlineHighlight: e.target.value }))}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hero Subtext</label>
            <textarea
              rows={3}
              value={heroData.subtext}
              onChange={(e) => setHeroData(prev => ({ ...prev, subtext: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={heroData.ctaPrimary}
                onChange={(e) => setHeroData(prev => ({ ...prev, ctaPrimary: e.target.value }))}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={heroData.ctaSecondary}
                onChange={(e) => setHeroData(prev => ({ ...prev, ctaSecondary: e.target.value }))}
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              <span>Save Hero Section</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: About Section */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">About Section Content</h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
            <input
              type="text"
              value={aboutData.badge}
              onChange={(e) => setAboutData(prev => ({ ...prev, badge: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Headline</label>
            <input
              type="text"
              value={aboutData.headline}
              onChange={(e) => setAboutData(prev => ({ ...prev, headline: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.paragraph1}
              onChange={(e) => setAboutData(prev => ({ ...prev, paragraph1: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Secondary Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.paragraph2}
              onChange={(e) => setAboutData(prev => ({ ...prev, paragraph2: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Visual Banner Overlay Text</label>
            <input
              type="text"
              value={aboutData.imageOverlay}
              onChange={(e) => setAboutData(prev => ({ ...prev, imageOverlay: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              <span>Save About Section</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Why Choose Us */}
      {activeTab === 'why' && (
        <form onSubmit={handleSaveWhy} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Why NovaSphere Exim? 5 Value Props</h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Section Headline</label>
            <input
              type="text"
              value={whyData.headline}
              onChange={(e) => setWhyData(prev => ({ ...prev, headline: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div className="space-y-3 pt-2">
            {whyData.items.map((item, idx) => (
              <div key={item.id || idx} className="p-3 bg-surface-light rounded-lg border grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Pillar {idx + 1} Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...whyData.items];
                      updated[idx].title = e.target.value;
                      setWhyData(prev => ({ ...prev, items: updated }));
                    }}
                    className="w-full px-2.5 py-1.5 border rounded text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-0.5">Description</label>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => {
                      const updated = [...whyData.items];
                      updated[idx].desc = e.target.value;
                      setWhyData(prev => ({ ...prev, items: updated }));
                    }}
                    className="w-full px-2.5 py-1.5 border rounded text-xs"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              <span>Save Value Props</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Dual Gateways */}
      {activeTab === 'gateways' && (
        <form onSubmit={handleSaveGateways} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Dual Audience Gateways</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Manufacturers */}
            <div className="p-4 bg-surface-light rounded-lg border space-y-3">
              <h4 className="font-bold text-slate-900">Card 1: For Manufacturers</h4>
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Subtitle / Question</label>
                <input
                  type="text"
                  value={gatewaysData.manufacturers.subtitle}
                  onChange={(e) => setGatewaysData(prev => ({
                    ...prev,
                    manufacturers: { ...prev.manufacturers, subtitle: e.target.value }
                  }))}
                  className="w-full px-2.5 py-1.5 border rounded text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Description</label>
                <textarea
                  rows={2}
                  value={gatewaysData.manufacturers.desc}
                  onChange={(e) => setGatewaysData(prev => ({
                    ...prev,
                    manufacturers: { ...prev.manufacturers, desc: e.target.value }
                  }))}
                  className="w-full px-2.5 py-1.5 border rounded text-xs"
                />
              </div>
            </div>

            {/* For Buyers */}
            <div className="p-4 bg-surface-light rounded-lg border space-y-3">
              <h4 className="font-bold text-slate-900">Card 2: For Buyers</h4>
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Subtitle / Question</label>
                <input
                  type="text"
                  value={gatewaysData.buyers.subtitle}
                  onChange={(e) => setGatewaysData(prev => ({
                    ...prev,
                    buyers: { ...prev.buyers, subtitle: e.target.value }
                  }))}
                  className="w-full px-2.5 py-1.5 border rounded text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Description</label>
                <textarea
                  rows={2}
                  value={gatewaysData.buyers.desc}
                  onChange={(e) => setGatewaysData(prev => ({
                    ...prev,
                    buyers: { ...prev.buyers, desc: e.target.value }
                  }))}
                  className="w-full px-2.5 py-1.5 border rounded text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              <span>Save Gateways</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Bottom CTA */}
      {activeTab === 'bottomCta' && (
        <form onSubmit={handleSaveBottomCta} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Bottom Pre-Footer Banner</h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Headline</label>
            <input
              type="text"
              value={bottomCtaData.headline}
              onChange={(e) => setBottomCtaData(prev => ({ ...prev, headline: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subtext</label>
            <textarea
              rows={2}
              value={bottomCtaData.subtext}
              onChange={(e) => setBottomCtaData(prev => ({ ...prev, subtext: e.target.value }))}
              className="w-full px-3 py-2 border rounded text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="btn-gold px-5 py-2 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              <span>Save Banner</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
