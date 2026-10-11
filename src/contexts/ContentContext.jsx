import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPageContent, sampleInquiries } from '../data/initialData';
import { servicesData } from '../data/services';
import { productCategories, CATEGORY_IMAGE_POOL } from '../data/products';
import { companyInfo } from '../data/company';
import { industriesData } from '../data/industries';
import { supabase } from '@/integrations/supabase/client';

const ContentContext = createContext(null);

const STORAGE_KEYS = {
  PAGE_CONTENT: 'novasphere_page_content_v1',
  SERVICES: 'novasphere_services_v1',
  PRODUCTS: 'novasphere_products_v1',
  COMPANY: 'novasphere_company_v1',
  INDUSTRIES: 'novasphere_industries_v1',
  INQUIRIES: 'novasphere_inquiries_v1'
};

export const ContentProvider = ({ children }) => {
  // 1. Page Content State
  const [pageContent, setPageContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAGE_CONTENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.quickFeatures) {
          parsed.quickFeatures = parsed.quickFeatures.map(item => {
            if (item.id === 'qf-2' && item.title === 'Import & Export') {
              return { ...item, title: 'Export & Import' };
            }
            if (item.id === 'qf-5' && (item.title.includes('Retainer') || item.title.includes('Commission'))) {
              return { ...item, title: 'Strategic Partnership', desc: 'Flexible partnership models' };
            }
            return item;
          });
        }
        return parsed;
      }
      return initialPageContent;
    } catch (e) {
      return initialPageContent;
    }
  });

  // 2. Services State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(s => {
          if (s.title && (s.title.includes('Retainer') || s.title.includes('Commission'))) {
            return { ...s, title: 'Strategic Partnership' };
          }
          return s;
        });
      }
      return servicesData;
    } catch (e) {
      return servicesData;
    }
  });

  // 3. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically migrate any broken unsplash images or missing images to local sequential pool
        return parsed.map((cat, idx) => {
          if (!cat.image || cat.image.includes('unsplash.com')) {
            return {
              ...cat,
              image: CATEGORY_IMAGE_POOL[idx % CATEGORY_IMAGE_POOL.length]
            };
          }
          return cat;
        });
      }
      return productCategories;
    } catch (e) {
      return productCategories;
    }
  });

  // 4. Company Info State
  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new phone and email take precedence over old defaults
        return {
          ...companyInfo,
          ...parsed,
          email: 'info@novasphereexim.com',
          phone: '+91 90227 82655',
          whatsapp: '+91 90227 82655'
        };
      }
      return companyInfo;
    } catch (e) {
      return companyInfo;
    }
  });

  // 5. Industries State
  const [industries, setIndustries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INDUSTRIES);
      return saved ? JSON.parse(saved) : industriesData;
    } catch (e) {
      return industriesData;
    }
  });

  // 6. Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : sampleInquiries;
    } catch (e) {
      return sampleInquiries;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAGE_CONTENT, JSON.stringify(pageContent));
    } catch (e) {}
  }, [pageContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {}
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(company));
    } catch (e) {}
  }, [company]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INDUSTRIES, JSON.stringify(industries));
    } catch (e) {}
  }, [industries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {}
  }, [inquiries]);

  // Optional Supabase Sync on mount
  useEffect(() => {
    const fetchSupabaseInquiries = async () => {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Merge remote with local without duplicating
          setInquiries(prev => {
            const remoteMapped = data.map(item => ({
              id: item.id,
              full_name: item.full_name || item.name || 'Anonymous',
              company_name: item.company_name || item.company || '',
              email: item.email || '',
              phone: item.phone || '',
              country: item.country || '',
              inquiry_type: item.inquiry_type || 'General Trade Enquiry',
              product_interest: item.product_interest || item.subject || '',
              message: item.message || '',
              status: item.status || 'new',
              created_at: item.created_at || new Date().toISOString()
            }));
            return remoteMapped;
          });
        }
      } catch (err) {
        // Silently use localStorage fallback
      }
    };

    fetchSupabaseInquiries();
  }, []);

  // Action Handlers
  const updatePageContent = (sectionKey, newSectionData) => {
    setPageContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...newSectionData
      }
    }));
  };

  const updateQuickFeature = (id, updatedFields) => {
    setPageContent(prev => ({
      ...prev,
      quickFeatures: prev.quickFeatures.map(item =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    }));
  };

  const updateService = (updatedService) => {
    setServices(prev =>
      prev.map(s => (s.id === updatedService.id ? updatedService : s))
    );
  };

  const addService = (newService) => {
    setServices(prev => [...prev, newService]);
  };

  const deleteService = (serviceId) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  // --- Product Categories (Sections) CRUD ---
  const addProductCategory = (newCat) => {
    const categoryId = newCat.id || newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fallbackImage = CATEGORY_IMAGE_POOL[products.length % CATEGORY_IMAGE_POOL.length];
    const categoryToAdd = {
      id: categoryId,
      name: newCat.name,
      tagline: newCat.tagline || 'Specialized Global Trade Portfolio',
      description: newCat.description || '',
      image: newCat.image || fallbackImage,
      bullets: newCat.bullets || [],
      products: newCat.products || []
    };
    setProducts(prev => [...prev, categoryToAdd]);
    return categoryToAdd;
  };

  const updateProductCategory = (categoryId, updatedFields) => {
    setProducts(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, ...updatedFields, products: updatedFields.products || cat.products }
          : cat
      )
    );
  };

  const deleteProductCategory = (categoryId) => {
    setProducts(prev => prev.filter(cat => cat.id !== categoryId));
  };

  // --- Products CRUD ---
  const updateProduct = (categoryId, updatedProduct) => {
    setProducts(prev =>
      prev.map(cat => {
        // If categoryId matches, update product inside it
        if (cat.id === categoryId) {
          return {
            ...cat,
            products: (cat.products || []).map(p =>
              p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
            )
          };
        }
        // Fallback: check if the product belongs to this category even if categoryId param was omitted/mismatched
        const hasProduct = (cat.products || []).some(p => p.id === updatedProduct.id);
        if (hasProduct) {
          return {
            ...cat,
            products: cat.products.map(p =>
              p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
            )
          };
        }
        return cat;
      })
    );
  };

  const addProduct = (categoryId, newProduct) => {
    setProducts(prev => {
      // Check if target category exists
      const targetCatExists = prev.some(c => c.id === categoryId);
      if (targetCatExists) {
        return prev.map(cat => {
          if (cat.id !== categoryId) return cat;
          return {
            ...cat,
            products: [...(cat.products || []), newProduct]
          };
        });
      }
      // If target category doesn't exist, append to the first category
      if (prev.length > 0) {
        return prev.map((cat, idx) => {
          if (idx !== 0) return cat;
          return {
            ...cat,
            products: [...(cat.products || []), newProduct]
          };
        });
      }
      return prev;
    });
  };

  const deleteProduct = (categoryId, productId) => {
    setProducts(prev =>
      prev.map(cat => {
        if (categoryId && cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: (cat.products || []).filter(p => p.id !== productId)
        };
      })
    );
  };

  const updateCompanyInfo = (newInfo) => {
    setCompany(prev => ({
      ...prev,
      ...newInfo
    }));
  };

  // --- Industries CRUD ---
  const addIndustry = (newInd) => {
    const id = newInd.id || newInd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const entry = {
      id,
      name: newInd.name,
      shortDesc: newInd.shortDesc || '',
      icon: newInd.icon || 'Factory',
      productsSupplied: newInd.productsSupplied || []
    };
    setIndustries(prev => [...prev, entry]);
    return entry;
  };

  const updateIndustry = (updatedInd) => {
    setIndustries(prev =>
      prev.map(i => (i.id === updatedInd.id ? { ...i, ...updatedInd } : i))
    );
  };

  const deleteIndustry = (industryId) => {
    setIndustries(prev => prev.filter(i => i.id !== industryId));
  };

  const addInquiry = (inquiry) => {
    const newEntry = {
      id: inquiry.id || `inq-${Date.now()}`,
      full_name: inquiry.full_name,
      company_name: inquiry.company_name || '',
      email: inquiry.email,
      phone: inquiry.phone || '',
      country: inquiry.country || '',
      inquiry_type: inquiry.inquiry_type || 'General Trade Enquiry',
      product_interest: inquiry.product_interest || '',
      message: inquiry.message,
      status: inquiry.status || 'new',
      created_at: inquiry.created_at || new Date().toISOString()
    };
    setInquiries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const updateInquiryStatus = (inquiryId, newStatus) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq))
    );
  };

  const deleteInquiry = (inquiryId) => {
    setInquiries(prev => prev.filter(inq => inq.id !== inquiryId));
  };

  const resetToDefaults = () => {
    setPageContent(initialPageContent);
    setServices(servicesData);
    setProducts(productCategories);
    setCompany(companyInfo);
    setIndustries(industriesData);
    setInquiries(sampleInquiries);
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  };

  return (
    <ContentContext.Provider
      value={{
        pageContent,
        updatePageContent,
        updateQuickFeature,
        services,
        updateService,
        addService,
        deleteService,
        products,
        addProductCategory,
        updateProductCategory,
        deleteProductCategory,
        updateProduct,
        addProduct,
        deleteProduct,
        company,
        updateCompanyInfo,
        industries,
        addIndustry,
        updateIndustry,
        deleteIndustry,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
