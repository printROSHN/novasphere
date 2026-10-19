import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialPageContent, sampleInquiries } from '../data/initialData';
import { servicesData } from '../data/services';
import { productCategories, CATEGORY_IMAGE_POOL } from '../data/products';
import { companyInfo } from '../data/company';
import { industriesData } from '../data/industries';
import { supabase } from '@/integrations/supabase/client';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  // 1. Core States initialized with static defaults
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [services, setServices] = useState(servicesData);
  const [products, setProducts] = useState(productCategories);
  const [company, setCompany] = useState(companyInfo);
  const [industries, setIndustries] = useState(industriesData);
  const [inquiries, setInquiries] = useState(sampleInquiries);
  const [isLoading, setIsLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Helper to persist a specific CMS key into Supabase site_content table
  const persistContentKey = useCallback(async (key, data) => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          key,
          data,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error(`Supabase persistence error for [${key}]:`, error.message);
        return { success: false, error };
      }
      return { success: true };
    } catch (err) {
      console.error(`Supabase persistence exception for [${key}]:`, err);
      return { success: false, error: err };
    }
  }, []);

  // Helper to auto-seed Supabase site_content if empty
  const autoSeedSupabase = useCallback(async () => {
    try {
      const initialPayload = [
        { key: 'company', data: companyInfo },
        { key: 'products', data: productCategories },
        { key: 'page_content', data: initialPageContent },
        { key: 'services', data: servicesData },
        { key: 'industries', data: industriesData }
      ];
      const { error } = await supabase.from('site_content').upsert(initialPayload);
      if (!error) {
        console.log('✅ NovaSphere: Supabase site_content initialized with catalog defaults.');
      }
    } catch (e) {
      console.warn('Supabase auto-seed warning:', e);
    }
  }, []);

  // 2. Hydrate from Supabase on Mount
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        // Fetch site_content (CMS data)
        const { data: cmsData, error: cmsError } = await supabase
          .from('site_content')
          .select('*');

        if (!cmsError && cmsData) {
          setIsDbConnected(true);
          if (cmsData.length > 0) {
            const dataMap = {};
            cmsData.forEach(item => {
              dataMap[item.key] = item.data;
            });

            if (isMounted) {
              if (dataMap.page_content) setPageContent(dataMap.page_content);
              if (dataMap.services) setServices(dataMap.services);
              if (dataMap.products) {
                // Ensure images are valid
                const cleanProducts = dataMap.products.map((cat, idx) => {
                  if (!cat.image || cat.image.includes('unsplash.com')) {
                    return {
                      ...cat,
                      image: CATEGORY_IMAGE_POOL[idx % CATEGORY_IMAGE_POOL.length]
                    };
                  }
                  return cat;
                });
                setProducts(cleanProducts);
              }
              if (dataMap.company) setCompany(dataMap.company);
              if (dataMap.industries) setIndustries(dataMap.industries);
            }
          } else {
            // Table exists but has 0 rows -> auto seed
            await autoSeedSupabase();
          }
        } else if (cmsError) {
          console.warn('Supabase site_content table check notice:', cmsError.message);
        }

        // Fetch inquiries from Supabase
        const { data: inqData, error: inqError } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!inqError && inqData && inqData.length > 0) {
          if (isMounted) {
            const remoteMapped = inqData.map(item => ({
              id: item.id,
              full_name: item.full_name || item.name || 'Anonymous',
              company_name: item.company_name || item.company || '',
              email: item.email || '',
              phone: item.phone || '',
              country: item.country || '',
              inquiry_type: item.inquiry_type || 'Buyer looking for products',
              product_interest: item.product_interest || item.subject || '',
              message: item.message || '',
              status: item.status || 'new',
              created_at: item.created_at || item.updated_at || new Date().toISOString()
            }));
            setInquiries(remoteMapped);
          }
        }
      } catch (err) {
        console.warn('Supabase sync exception, falling back to static defaults:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [autoSeedSupabase]);

  // --- Dynamic Action Handlers (Live Supabase Updates) ---

  // Page Content Handlers
  const updatePageContent = async (sectionKey, newSectionData) => {
    const updated = {
      ...pageContent,
      [sectionKey]: {
        ...pageContent[sectionKey],
        ...newSectionData
      }
    };
    setPageContent(updated);
    return await persistContentKey('page_content', updated);
  };

  const updateQuickFeature = async (id, updatedFields) => {
    const updated = {
      ...pageContent,
      quickFeatures: pageContent.quickFeatures.map(item =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    };
    setPageContent(updated);
    return await persistContentKey('page_content', updated);
  };

  // Company Info Handler
  const updateCompanyInfo = async (newInfo) => {
    const updated = {
      ...company,
      ...newInfo
    };
    setCompany(updated);
    return await persistContentKey('company', updated);
  };

  // Services Handlers
  const updateService = async (updatedService) => {
    const updated = services.map(s => (s.id === updatedService.id ? updatedService : s));
    setServices(updated);
    return await persistContentKey('services', updated);
  };

  const addService = async (newService) => {
    const updated = [...services, newService];
    setServices(updated);
    return await persistContentKey('services', updated);
  };

  const deleteService = async (serviceId) => {
    const updated = services.filter(s => s.id !== serviceId);
    setServices(updated);
    return await persistContentKey('services', updated);
  };

  // Product Categories (Sections) CRUD
  const addProductCategory = async (newCat) => {
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
    const updated = [...products, categoryToAdd];
    setProducts(updated);
    await persistContentKey('products', updated);
    return categoryToAdd;
  };

  const updateProductCategory = async (categoryId, updatedFields) => {
    const updated = products.map(cat =>
      cat.id === categoryId
        ? { ...cat, ...updatedFields, products: updatedFields.products || cat.products }
        : cat
    );
    setProducts(updated);
    return await persistContentKey('products', updated);
  };

  const deleteProductCategory = async (categoryId) => {
    const updated = products.filter(cat => cat.id !== categoryId);
    setProducts(updated);
    return await persistContentKey('products', updated);
  };

  // Products CRUD
  const updateProduct = async (categoryId, updatedProduct) => {
    const updated = products.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: (cat.products || []).map(p =>
            p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
          )
        };
      }
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
    });
    setProducts(updated);
    return await persistContentKey('products', updated);
  };

  const addProduct = async (categoryId, newProduct) => {
    let updated;
    const targetCatExists = products.some(c => c.id === categoryId);
    if (targetCatExists) {
      updated = products.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: [...(cat.products || []), newProduct]
        };
      });
    } else if (products.length > 0) {
      updated = products.map((cat, idx) => {
        if (idx !== 0) return cat;
        return {
          ...cat,
          products: [...(cat.products || []), newProduct]
        };
      });
    } else {
      updated = products;
    }
    setProducts(updated);
    return await persistContentKey('products', updated);
  };

  const deleteProduct = async (categoryId, productId) => {
    const updated = products.map(cat => {
      if (categoryId && cat.id !== categoryId) return cat;
      return {
        ...cat,
        products: (cat.products || []).filter(p => p.id !== productId)
      };
    });
    setProducts(updated);
    return await persistContentKey('products', updated);
  };

  // Industries CRUD
  const addIndustry = async (newInd) => {
    const id = newInd.id || newInd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const entry = {
      id,
      name: newInd.name,
      shortDesc: newInd.shortDesc || '',
      icon: newInd.icon || 'Factory',
      productsSupplied: newInd.productsSupplied || []
    };
    const updated = [...industries, entry];
    setIndustries(updated);
    await persistContentKey('industries', updated);
    return entry;
  };

  const updateIndustry = async (updatedInd) => {
    const updated = industries.map(i => (i.id === updatedInd.id ? { ...i, ...updatedInd } : i));
    setIndustries(updated);
    return await persistContentKey('industries', updated);
  };

  const deleteIndustry = async (industryId) => {
    const updated = industries.filter(i => i.id !== industryId);
    setIndustries(updated);
    return await persistContentKey('industries', updated);
  };

  // Inquiries CRUD (Direct Supabase sync)
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

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq))
    );
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId);

      if (error) {
        console.error('Supabase update inquiry error:', error.message);
        return { success: false, error };
      }
      return { success: true };
    } catch (err) {
      console.error('Supabase update inquiry exception:', err);
      return { success: false, error: err };
    }
  };

  const deleteInquiry = async (inquiryId) => {
    setInquiries(prev => prev.filter(inq => inq.id !== inquiryId));
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', inquiryId);

      if (error) {
        console.error('Supabase delete inquiry error:', error.message);
        return { success: false, error };
      }
      return { success: true };
    } catch (err) {
      console.error('Supabase delete inquiry exception:', err);
      return { success: false, error: err };
    }
  };

  const resetToDefaults = async () => {
    setPageContent(initialPageContent);
    setServices(servicesData);
    setProducts(productCategories);
    setCompany(companyInfo);
    setIndustries(industriesData);
    setInquiries(sampleInquiries);
    await autoSeedSupabase();
  };

  return (
    <ContentContext.Provider
      value={{
        isLoading,
        isDbConnected,
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
