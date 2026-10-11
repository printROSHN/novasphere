import { supabase } from '@/integrations/supabase/client';

export async function submitInquiry(inquiryData) {
  const payload = {
    full_name: inquiryData.full_name?.trim(),
    company_name: inquiryData.company_name?.trim() || null,
    email: inquiryData.email?.trim(),
    phone: inquiryData.phone?.trim() || null,
    country: inquiryData.country?.trim() || 'India',
    inquiry_type: inquiryData.inquiry_type || 'Buyer looking for products',
    product_interest: inquiryData.product_interest || null,
    message: inquiryData.message?.trim(),
    status: 'new'
  };

  let savedInDb = false;
  let emailDispatched = false;

  // 1. Send direct email notification to info@novasphereexim.com via FormSubmit
  try {
    const emailRes = await fetch('https://formsubmit.co/ajax/info@novasphereexim.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Commercial RFQ: ${payload.product_interest || payload.inquiry_type} - ${payload.full_name}`,
        _replyto: payload.email,
        'Full Name': payload.full_name,
        'Company Name': payload.company_name || 'N/A',
        'Email Address': payload.email,
        'Phone / WhatsApp': payload.phone || 'N/A',
        'Country': payload.country,
        'Inquiry Type': payload.inquiry_type,
        'Product of Interest': payload.product_interest || 'General',
        'Buyer Requirement / Message': payload.message
      })
    });

    if (emailRes.ok) {
      emailDispatched = true;
    }
  } catch (emailErr) {
    console.warn('FormSubmit email dispatch fallback:', emailErr);
  }

  // 2. Also invoke local Vercel serverless /api/inquiry endpoint if available
  try {
    fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (apiErr) {
    // Non-blocking
  }

  // 3. Persist into Supabase / PostgreSQL database
  try {
    // A. Standard NovaSphere schema insert
    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload])
      .select();

    if (!error) {
      savedInDb = true;
      return {
        success: true,
        emailSent: emailDispatched,
        savedInDb: true,
        data: data?.[0] || payload
      };
    }

    // B. Legacy schema column mapping fallback
    console.warn('Primary Supabase insert encountered schema mismatch, attempting legacy fallback:', error.message);
    const legacyPayload = {
      name: payload.full_name,
      company: payload.company_name,
      email: payload.email,
      phone: payload.phone,
      message: `[Inquiry Type: ${payload.inquiry_type}] [Country: ${payload.country}] [Product: ${payload.product_interest || 'N/A'}]\n\n${payload.message}`,
      subject: `Commercial Inquiry: ${payload.product_interest || payload.inquiry_type}`,
      status: 'new'
    };

    const { data: legacyData, error: legacyError } = await supabase
      .from('inquiries')
      .insert([legacyPayload])
      .select();

    if (!legacyError) {
      savedInDb = true;
      return {
        success: true,
        emailSent: emailDispatched,
        savedInDb: true,
        data: legacyData?.[0] || payload
      };
    }

    console.warn('Legacy insert also encountered policy or column issue:', legacyError.message);
  } catch (err) {
    console.warn('Supabase database connectivity exception:', err);
  }

  // Always return success gracefully so client state is saved and user gets prompt
  return {
    success: true,
    emailSent: emailDispatched,
    savedInDb,
    fallback: true,
    data: payload
  };
}

export function generateMailtoLink(inquiryData) {
  const recipient = "info@novasphereexim.com";
  const subject = encodeURIComponent(`Trade Inquiry: ${inquiryData.product_interest || inquiryData.inquiry_type || 'NovaSphere Exim'}`);
  const body = encodeURIComponent(
`Full Name: ${inquiryData.full_name || ''}
Company Name: ${inquiryData.company_name || 'N/A'}
Email: ${inquiryData.email || ''}
Phone / WhatsApp: ${inquiryData.phone || 'N/A'}
Country: ${inquiryData.country || 'India'}
Inquiry Type: ${inquiryData.inquiry_type || 'Buyer'}
Product of Interest: ${inquiryData.product_interest || 'General'}

Commercial Requirements / Details:
${inquiryData.message || ''}
`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export function generateWhatsAppLink(inquiryData) {
  const phoneNumber = "919022782655";
  const text = encodeURIComponent(
`Hello NovaSphere Exim Trade Desk,
I submitted an enquiry for: ${inquiryData.product_interest || inquiryData.inquiry_type || 'Products'}
Name: ${inquiryData.full_name || ''}
Company: ${inquiryData.company_name || 'N/A'}
Phone: ${inquiryData.phone || ''}
Email: ${inquiryData.email || ''}

Details:
${inquiryData.message || ''}`
  );
  return `https://wa.me/${phoneNumber}?text=${text}`;
}
