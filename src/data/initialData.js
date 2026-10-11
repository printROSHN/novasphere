import { companyInfo } from './company';
import { servicesData } from './services';
import { productCategories } from './products';
import { industriesData } from './industries';
import { targetMarkets } from './markets';

export const initialPageContent = {
  hero: {
    badge: "INTERNATIONAL TRADING & MARKET DEVELOPMENT PARTNER",
    headlineStart: "Expanding Trade",
    headlineHighlight: "Globally",
    subtext: "Connecting manufacturers, suppliers and buyers across international markets. We help businesses source products, enter new markets and build long-term trade relationships through sourcing, export development and market representation.",
    ctaPrimary: "Partner With Us",
    ctaSecondary: "Send an Enquiry"
  },
  quickFeatures: [
    {
      id: "qf-1",
      title: "Global Sourcing",
      desc: "Find the right suppliers worldwide",
      icon: "Globe"
    },
    {
      id: "qf-2",
      title: "Export & Import",
      desc: "Facilitate international trade opportunities",
      icon: "Ship"
    },
    {
      id: "qf-3",
      title: "Market Development",
      desc: "Grow your business in new markets",
      icon: "TrendingUp"
    },
    {
      id: "qf-4",
      title: "India Representation",
      desc: "Your local partner in India",
      icon: "MapPin"
    },
    {
      id: "qf-5",
      title: "Strategic Partnership",
      desc: "Flexible partnership models",
      icon: "Handshake"
    }
  ],
  about: {
    badge: "About NovaSphere Exim",
    headline: "Your Partner in Global Trade & Market Development",
    paragraph1: "NovaSphere Exim is an international trading and market-development company focused on connecting manufacturers, suppliers and buyers across global markets.",
    paragraph2: "We work with businesses looking to source products, enter new markets, develop buyers and establish long-term commercial partnerships.",
    imageOverlay: "Global Reach. Local Expertise. Stronger Partnerships.",
    pillars: [
      { title: "Verified Sourcing", desc: "Rigorous quality inspection & supplier audit" },
      { title: "Regulatory Compliance", desc: "End-to-end customs, Incoterms & documentation" },
      { title: "Market Understanding", desc: "Deep metallurgy & industrial chemical insights" },
      { title: "Integrity & Trust", desc: "Long-term relationships built on absolute transparency" }
    ]
  },
  whyChooseUs: {
    badge: "Why NovaSphere Exim?",
    headline: "Building Long-Term Business Relationships",
    items: [
      {
        id: "wcu-1",
        title: "Market Understanding",
        desc: "Deep industry and market insights",
        icon: "Lightbulb"
      },
      {
        id: "wcu-2",
        title: "B2B Network",
        desc: "Connecting the right buyers and suppliers",
        icon: "Network"
      },
      {
        id: "wcu-3",
        title: "Flexible Partnership",
        desc: "Strategic partnership or hybrid commercial models",
        icon: "Sliders"
      },
      {
        id: "wcu-4",
        title: "Relationship Driven",
        desc: "Trust, transparency and consistent communication",
        icon: "ShieldCheck"
      },
      {
        id: "wcu-5",
        title: "Global Perspective",
        desc: "Local knowledge with international reach",
        icon: "Compass"
      }
    ]
  },
  dualGateways: {
    manufacturers: {
      title: "For Manufacturers",
      subtitle: "Looking for an India Market Representative?",
      desc: "Expand into India with our local market development and business support services.",
      cta: "Become a Partner",
      href: "/for-manufacturers"
    },
    buyers: {
      title: "For Buyers",
      subtitle: "Looking for Reliable Global Suppliers?",
      desc: "Tell us your requirement and we'll help you find the right suppliers worldwide.",
      cta: "Submit Your Requirement",
      href: "/for-buyers"
    }
  },
  bottomCta: {
    headline: "Let's Build Your Next Market",
    subtext: "Whether you are a manufacturer looking for international growth or a buyer searching for reliable suppliers, NovaSphere Exim can help connect the right opportunities.",
    ctaPrimary: "Partner With Us",
    ctaSecondary: "Submit Your Requirement"
  }
};

export const sampleInquiries = [
  {
    id: "inq-101",
    full_name: "Rajesh Sharma",
    company_name: "Apex Precision Castings Pvt Ltd",
    email: "r.sharma@apexcastings.in",
    phone: "+91 98201 12345",
    country: "India",
    inquiry_type: "Buyer looking for products",
    product_interest: "Graphitized Petroleum Coke (GPC)",
    message: "We need 50 MT/month of low sulfur GPC (S < 0.05%, F.C. > 98.5%, size 1-5mm) for our ductile iron induction furnace line in Pune. Please share COA and CIF Nhava Sheva pricing.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "inq-102",
    full_name: "Zhang Wei",
    company_name: "Hunan Carbon Tech Corp",
    email: "zhang.wei@hncarbon.cn",
    phone: "+86 138 0000 8888",
    country: "China",
    inquiry_type: "Manufacturer seeking representation",
    product_interest: "Foundry & Metallurgy",
    message: "We are an established producer of graphitized petroleum coke and recarburizers seeking a dedicated India representative to reach Tier-1 Indian foundries on a strategic partnership model.",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "inq-103",
    full_name: "Marco Benetti",
    company_name: "Officine Meccaniche SpA",
    email: "m.benetti@om-italia.it",
    phone: "+39 02 8900 1234",
    country: "Italy",
    inquiry_type: "Buyer looking for products",
    product_interest: "Industrial Raw Materials",
    message: "Seeking high-grade bentonite clay and fine refractory powders for molding sand operations. 4x20ft FCL to Genoa port.",
    status: "in discussion",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];
