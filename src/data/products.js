export const productCategories = [
  {
    id: "foundry-metallurgy",
    name: "Foundry & Metallurgy",
    flagship: true,
    tagline: "High-Purity Carbon Materials & Metallurgy Additives",
    description: "Premium recarburizers, carbon additives, and foundry inputs engineered for precise carbon recovery, low impurities, and optimal molten metal chemistry in iron and steel casting.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80",
    bullets: ["Carbon Raisers", "Graphite Granules", "Foundry Coke", "Ferro Alloys", "More"],
    products: [
      {
        id: "gpc-graphitized-petroleum-coke",
        name: "Graphitized Petroleum Coke (GPC)",
        code: "GPC-98.5",
        featured: true,
        tagline: "Ultra-High Purity Carbon Additive for Foundries & Steelmaking",
        shortDesc: "GPC is a high-carbon material produced by graphitizing petroleum coke at high temperatures (2500°C–3000°C). Used to increase and accurately control carbon content during metal melting.",
        fullDesc: "NovaSphere Exim supplies premium Graphitized Petroleum Coke (GPC) tailored to client technical requirements and particle size specifications. With superior fixed carbon (>98.5%), ultra-low sulfur (≤0.05%), and exceptionally low nitrogen, GPC ensures rapid dissolution rates and superior carbon absorption (>92-95%) with minimal slag generation.",
        applications: [
          "Ductile Iron (Nodular Iron / SGI)",
          "Grey Iron Casting",
          "Specialty & Alloy Steel",
          "Induction Furnace Applications",
          "Precision Foundry Melting"
        ],
        specifications: [
          { property: "Fixed Carbon (F.C.)", value: "98.5% – 99.0% min" },
          { property: "Sulfur (S)", value: "0.03% – 0.05% max" },
          { property: "Ash Content", value: "0.5% – 0.7% max" },
          { property: "Volatile Matter (V.M.)", value: "0.5% max" },
          { property: "Nitrogen (N)", value: "100 – 300 ppm max" },
          { property: "Moisture", value: "0.5% max" },
          { property: "Carbon Absorption Rate", value: "92% – 96%" }
        ],
        granulationSizes: [
          "0 – 1 mm",
          "1 – 3 mm",
          "1 – 5 mm",
          "3 – 8 mm",
          "Custom mesh sizing on request"
        ],
        packaging: "25kg waterproof bags, 1 MT Jumbo bulk bags with lifting loops, customized palletization."
      },
      {
        id: "carbon-raiser-cr95",
        name: "Carbon Raiser / Recarburizer (CR95)",
        code: "CR95",
        featured: true,
        tagline: "Anthracite-Derived Premium Carbon Additive",
        shortDesc: "An anthracite-derived carbon additive produced by calcining and heat-treating high-grade anthracite coal. When added to molten metal, it increases carbon content and enhances mechanical properties.",
        fullDesc: "Our premium carburiser sells under the brand specification CR95 and is preferred across heavy engineering and grey iron foundries for reliable carbon control, uniform grain sizing, and cost-effective metallurgy.",
        applications: [
          "Grey Iron Production",
          "Steel Melting & Basic Oxygen Furnaces",
          "General Casting",
          "Ladle Metallurgy"
        ],
        specifications: [
          { property: "Fixed Carbon", value: "95.0% min" },
          { property: "Sulfur", value: "0.25% – 0.30% max" },
          { property: "Ash Content", value: "3.5% max" },
          { property: "Volatile Matter", value: "1.5% max" },
          { property: "Moisture", value: "1.0% max" }
        ],
        granulationSizes: ["1 – 3 mm", "1 – 5 mm", "3 – 6 mm", "Customer specific"],
        packaging: "25kg PP bags, 1000kg big bags on export-ready fumigated pallets."
      },
      {
        id: "graphite-granules",
        name: "Graphite Granules",
        code: "GG-98",
        featured: false,
        tagline: "Natural & Synthetic Graphite Flakes & Granules",
        shortDesc: "High-crystallinity graphite material with exceptional thermal and electrical conductivity, low thermal expansion, and clean dissolution.",
        applications: ["Friction Materials", "Crucibles", "Refractory Bricks", "Lubrication Compounds"],
        specifications: [
          { property: "Carbon Content", value: "98.0% min" },
          { property: "Moisture", value: "0.5% max" },
          { property: "Ash", value: "1.0% max" }
        ],
        granulationSizes: ["0.2 – 1 mm", "1 – 3 mm", "Custom mesh"],
        packaging: "25kg paper/poly bags, bulk big bags."
      },
      {
        id: "foundry-coke",
        name: "Foundry Coke",
        code: "FC-88",
        featured: false,
        tagline: "High-Strength Hard Metallurgical Coke for Cupolas",
        shortDesc: "Low-ash, high-strength metallurgical coke specifically graded for cupola furnace melting, providing structural support to burden and uniform heat release.",
        applications: ["Cupola Iron Melting", "Ferro Alloy Smelting", "Mineral Wool Production"],
        specifications: [
          { property: "Fixed Carbon", value: "88% – 90% min" },
          { property: "Ash", value: "8% – 10% max" },
          { property: "Sulfur", value: "0.6% max" }
        ],
        granulationSizes: ["60 – 90 mm", "90 – 120 mm", "120+ mm"],
        packaging: "Bulk containerized or jumbo bags."
      },
      {
        id: "ferro-alloys",
        name: "Ferro Alloys",
        code: "FA-SPEC",
        featured: false,
        tagline: "Essential Deoxidizers & Alloying Elements",
        shortDesc: "Supplying Ferro Silicon (FeSi), Ferro Manganese (FeMn), and Silico Manganese (SiMn) meeting stringent chemical standards for steel and casting metallurgy.",
        applications: ["Deoxidation in Steel", "Grain Refinement", "Alloy Composition Adjustment"],
        specifications: [
          { property: "FeSi 75%", value: "Si: 75% min, Al: 1.5% max" },
          { property: "FeMn High Carbon", value: "Mn: 75% min, C: 6-8%" },
          { property: "SiMn 60/14", value: "Mn: 60% min, Si: 14% min" }
        ],
        granulationSizes: ["10 – 50 mm", "10 – 100 mm"],
        packaging: "1 MT jumbo bags."
      }
    ]
  },
  {
    id: "industrial-chemicals",
    name: "Industrial Chemicals",
    flagship: false,
    tagline: "High-Grade Inorganic & Specialty Chemical Intermediates",
    description: "Sourcing and supply of essential chemical additives, fillers, and polymer compounding inputs for manufacturing across automotive, rubber, plastics, and construction sectors.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    bullets: ["Rubber Chemicals", "Calcium Carbonate", "Industrial Additives", "Specialty Chemicals"],
    products: [
      {
        id: "rubber-chemicals",
        name: "Rubber Processing Chemicals & Accelerators",
        code: "RC-SERIES",
        featured: true,
        tagline: "Accelerators, Antioxidants & Vulcanizing Agents",
        shortDesc: "Specialty chemicals for tire manufacturing, industrial belts, automotive gaskets, and technical rubber goods.",
        applications: ["Tires & Conveyor Belts", "Automotive Hoses & Seals", "Shoe Soles", "Molded Rubber Goods"],
        specifications: [
          { property: "Purity", value: "98.5% min" },
          { property: "Moisture Content", value: "0.3% max" },
          { property: "Melting Point", value: "Conforming to grade standards" }
        ],
        granulationSizes: ["Powder 200 mesh", "Oiled powder", "Granules"],
        packaging: "25kg kraft paper bags with inner PE liner."
      },
      {
        id: "calcium-carbonate",
        name: "Precipitated & Ground Calcium Carbonate (PCC / GCC)",
        code: "CC-PREM",
        featured: true,
        tagline: "High-Whiteness Mineral Fillers for Polymers & Coatings",
        shortDesc: "Ultra-fine precipitated and ground calcium carbonate with controlled particle size distribution and high brightness.",
        applications: ["Paints & Coatings", "Plastics & PVC Compounds", "Paper & Packaging", "Adhesives & Sealants"],
        specifications: [
          { property: "CaCO3 Content", value: "98.5% min" },
          { property: "Whiteness", value: "96% min" },
          { property: "Mean Particle Size (D50)", value: "0.8 – 2.5 microns" }
        ],
        granulationSizes: ["Micro-fine (300 to 1250 mesh)"],
        packaging: "25kg bags, 500kg / 1000kg bulk sacks."
      },
      {
        id: "specialty-additives",
        name: "Industrial Chemical Additives",
        code: "SPEC-ADD",
        featured: false,
        tagline: "Surface Modifiers, Stabilizers & Catalysts",
        shortDesc: "Tailored additives designed to improve processability, UV resistance, and thermal stability in manufacturing.",
        applications: ["Masterbatches", "Polymer Extrusion", "Construction Admixtures"],
        specifications: [
          { property: "Active Assay", value: "99% min" },
          { property: "Form", value: "Liquid / Micro-granules" }
        ],
        granulationSizes: ["Standard industrial specifications"],
        packaging: "Drums or 25kg bags."
      }
    ]
  },
  {
    id: "industrial-raw-materials",
    name: "Industrial Raw Materials",
    flagship: false,
    tagline: "Minerals, Industrial Powders & Manufacturing Inputs",
    description: "Reliable bulk procurement and cross-border delivery of industrial minerals, refractory clays, and carbon-based manufacturing inputs for core production facilities.",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&auto=format&fit=crop&q=80",
    bullets: ["Minerals", "Industrial Powders", "Carbon Materials", "Manufacturing Inputs"],
    products: [
      {
        id: "industrial-minerals",
        name: "Industrial Minerals & Clays",
        code: "MIN-RAW",
        featured: true,
        tagline: "Bentonite, Kaolin, Silica & Refractory Clays",
        shortDesc: "High-grade natural minerals processed for foundry molding sand, refractory linings, ceramics, and drilling fluids.",
        applications: ["Foundry Green Sand Systems", "Ceramics & Refractories", "Civil Construction", "Metallurgical Pelletizing"],
        specifications: [
          { property: "Montmorillonite (Bentonite)", value: "70% – 85% min" },
          { property: "Gelling Index", value: "High Swelling Grade" },
          { property: "Moisture", value: "10% – 12% max" }
        ],
        granulationSizes: ["Powder (200 – 325 mesh) & Granular"],
        packaging: "50kg bags, 1 MT jumbo bags."
      },
      {
        id: "industrial-powders",
        name: "Industrial Metal & Carbon Powders",
        code: "POW-IND",
        featured: false,
        tagline: "Fine-Milled Inputs for Compounding & Sintering",
        shortDesc: "Uniformly milled carbon powders and metallic blends for powder metallurgy, electrical brushes, and friction parts.",
        applications: ["Powder Metallurgy", "Brake Pads & Clutches", "Carbon Electrodes"],
        specifications: [
          { property: "Carbon Purity", value: "95% – 99%" },
          { property: "Screen Analysis", value: "-200 mesh to -325 mesh (>95%)" }
        ],
        granulationSizes: ["Micro-mesh sizes"],
        packaging: "Heavy-duty sealed fiber drums or big bags."
      }
    ]
  }
];
