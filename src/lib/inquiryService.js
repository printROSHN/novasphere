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

  try {
    // 1. Try insert with official NovaSphere schema
    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload])
      .select();

    if (!error) {
      return { success: true, data: data?.[0] || payload };
    }

    // 2. If column error (e.g. legacy columns), try inserting legacy mapped columns
    console.warn('Primary inquiry insert encountered error, attempting legacy schema mapping:', error.message);
    const legacyPayload = {
      name: payload.full_name,
      company: payload.company_name,
      email: payload.email,
      phone: payload.phone,
      message: `[Inquiry Type: ${payload.inquiry_type}] [Country: ${payload.country}] [Product: ${payload.product_interest || 'N/A'}]\n\n${payload.message}`,
      subject: `Trade Inquiry: ${payload.product_interest || payload.inquiry_type}`,
      status: 'new'
    };

    const { data: legacyData, error: legacyError } = await supabase
      .from('inquiries')
      .insert([legacyPayload])
      .select();

    if (!legacyError) {
      return { success: true, data: legacyData?.[0] || payload };
    }

    console.warn('Legacy inquiry insert also failed:', legacyError.message);
    // Return gracefully so user sees success and has mailto backup
    return { success: true, fallback: true, data: payload };
  } catch (err) {
    console.error('Network or database exception submitting inquiry:', err);
    return { success: true, fallback: true, data: payload };
  }
}

export function generateMailtoLink(inquiryData) {
  const recipient = "suyash23yewale@gmail.com";
  const subject = encodeURIComponent(`Trade Inquiry: ${inquiryData.product_interest || inquiryData.inquiry_type || 'NovaSphere Exim'}`);
  const body = encodeURIComponent(
`Full Name: ${inquiryData.full_name}
Company Name: ${inquiryData.company_name || 'N/A'}
Email: ${inquiryData.email}
Phone / WhatsApp: ${inquiryData.phone || 'N/A'}
Country: ${inquiryData.country || 'N/A'}
Inquiry Type: ${inquiryData.inquiry_type || 'Buyer'}
Product of Interest: ${inquiryData.product_interest || 'General'}

Requirement / Specifications:
${inquiryData.message}
`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
