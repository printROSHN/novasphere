import { supabase } from '../integrations/supabase/client';

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
  let activationRequired = false;
  let gatewayDetails = '';

  // 1. Invoke /api/inquiry (supported on Vercel and local Vite dev server)
  try {
    const apiRes = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (apiRes.ok) {
      const apiResult = await apiRes.json().catch(() => null);
      if (apiResult?.emailSent) {
        emailDispatched = true;
        gatewayDetails = apiResult.gatewayStatus || 'Delivered via server API';
      }
      if (apiResult?.activationRequired) {
        activationRequired = true;
        gatewayDetails = apiResult.gatewayStatus;
      }
    }
  } catch (apiErr) {
    console.warn('API /api/inquiry dispatch failed, falling back to direct client gateway:', apiErr);
  }

  // 2. Client-side direct FormSubmit fallback if not yet dispatched
  if (!emailDispatched) {
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
          _captcha: 'false',
          _template: 'table',
          _cc: 'suyash23yewale@gmail.com',
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

      const emailData = await emailRes.json().catch(() => null);
      const isDelivered = emailRes.ok && (emailData?.success === 'true' || emailData?.success === true);
      const needsActivation = emailData?.message?.toLowerCase().includes('activation');

      if (isDelivered) {
        emailDispatched = true;
        gatewayDetails = 'Direct FormSubmit dispatch delivered';
      } else if (needsActivation) {
        activationRequired = true;
        gatewayDetails = emailData?.message;
        console.warn('⚠️ [NovaSphere Trade Desk] FormSubmit activation required.');
        console.warn('Please open the inbox of info@novasphereexim.com and click "Activate Form" in the email from FormSubmit.');
      }
    } catch (emailErr) {
      console.warn('Direct FormSubmit gateway attempt:', emailErr);
    }
  }

  // 3. Persist into Supabase / PostgreSQL database using compatible schema (omitting .select() to prevent anon RLS read error)
  try {
    const legacyPayload = {
      name: payload.full_name,
      company: payload.company_name || null,
      email: payload.email,
      phone: payload.phone || null,
      message: `[Inquiry Type: ${payload.inquiry_type}] [Country: ${payload.country}] [Product: ${payload.product_interest || 'N/A'}]\n\n${payload.message}`,
      subject: `Commercial RFQ: ${payload.product_interest || payload.inquiry_type} - ${payload.full_name}`,
      status: 'new'
    };

    const { error: dbError } = await supabase
      .from('inquiries')
      .insert([legacyPayload]);

    if (!dbError) {
      savedInDb = true;
    } else {
      console.warn('Supabase inquiries database insert issue:', dbError.message);
    }
  } catch (err) {
    console.warn('Supabase database connectivity exception:', err);
  }

  return {
    success: true,
    emailSent: emailDispatched,
    activationRequired,
    gatewayDetails,
    savedInDb,
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
