import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import QuickFeatures from '../components/home/QuickFeatures';
import AboutSection from '../components/home/AboutSection';
import ProductFocus from '../components/home/ProductFocus';
import ServicesGrid from '../components/home/ServicesGrid';
import IndustriesSection from '../components/home/IndustriesSection';
import GlobalMarkets from '../components/home/GlobalMarkets';
import DualGateways from '../components/home/DualGateways';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ContactSection from '../components/home/ContactSection';
import BottomCTA from '../components/home/BottomCTA';
import Footer from '../components/common/Footer';
import ProductSpecModal from '../components/modals/ProductSpecModal';
import RfqModal from '../components/modals/RfqModal';

const Home = () => {
  const [specModalProduct, setSpecModalProduct] = useState(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqInitialData, setRfqInitialData] = useState({});

  const handleOpenRfq = (data = {}) => {
    setRfqInitialData(data);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO />
      
      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Sticky Navbar */}
      <Navbar onOpenRfq={() => handleOpenRfq()} />

      <main className="flex-1">
        {/* 3. Hero Section with Freight Container Dock */}
        <Hero onOpenRfq={() => handleOpenRfq()} />

        {/* 4. 5 Fast-Feature Pills (Global Sourcing to Retainer+Commission) */}
        <QuickFeatures />

        {/* 5. About NovaSphere Exim */}
        <AboutSection />

        {/* 6. Product Focus: Foundry Metallurgy, Chemicals, Raw Materials */}
        <ProductFocus onOpenSpecModal={(prodId) => setSpecModalProduct(prodId)} />

        {/* 7. Core Services: 6-Pillar Detailed Grid */}
        <ServicesGrid />

        {/* 8. Industries We Serve: Dark navy linear 8-icon strip */}
        <IndustriesSection />

        {/* 9. Global Markets & Trade Corridors: Stylized World Map centered on India */}
        <GlobalMarkets />

        {/* 10. Dual Audience Gateways: For Manufacturers vs For Buyers */}
        <DualGateways onOpenRfq={handleOpenRfq} />

        {/* 11. Why NovaSphere Exim? 5-column trust grid */}
        <WhyChooseUs />

        {/* 12. Contact & RFQ Lead Submission Form */}
        <ContactSection />

        {/* 13. Pre-Footer Container Dock Banner */}
        <BottomCTA onOpenRfq={() => handleOpenRfq()} />
      </main>

      {/* 14. Complete Footer */}
      <Footer />

      {/* Interactive Modals */}
      {specModalProduct && (
        <ProductSpecModal
          productId={specModalProduct}
          onClose={() => setSpecModalProduct(null)}
          onOpenRfq={handleOpenRfq}
        />
      )}

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialData={rfqInitialData}
      />
    </div>
  );
};

export default Home;
