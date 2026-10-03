import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPageContent, sampleInquiries } from '../data/initialData';
import { servicesData } from '../data/services';
import { productCategories } from '../data/products';
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
      return saved ? JSON.parse(saved) : initialPageContent;
    } catch (e) {
      return initialPageContent;
    }
  });

  // 2. Services State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : servicesData;
    } catch (e) {
      return servicesData;
    }
  });

  // 3. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : productCategories;
    } catch (e) {
      return productCategories;
    }
  });

  // 4. Company Info State
  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      return saved ? JSON.parse(saved) : companyInfo;
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

  const updateProduct = (categoryId, updatedProduct) => {
    setProducts(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        };
      })
    );
  };

  const addProduct = (categoryId, newProduct) => {
    setProducts(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: [...(cat.products || []), newProduct]
        };
      })
    );
  };

  const deleteProduct = (categoryId, productId) => {
    setProducts(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.filter(p => p.id !== productId)
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

  const updateIndustry = (updatedInd) => {
    setIndustries(prev =>
      prev.map(i => (i.id === updatedInd.id ? updatedInd : i))
    );
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
        updateProduct,
        addProduct,
        deleteProduct,
        company,
        updateCompanyInfo,
        industries,
        updateIndustry,
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
