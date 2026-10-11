/**
 * Vercel Serverless Function: Inquiries & RFQ Dispatcher
 * Dispatches trade inquiries, logs commercial leads, and notifies the trade desk at info@novasphereexim.com
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      full_name,
      company_name,
      email,
      phone,
      country,
      inquiry_type,
      product_interest,
      message
    } = body || {};

    if (!full_name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: full_name, email, and message are mandatory.'
      });
    }

    console.log('📬 [NovaSphere Trade Desk] New Inquiry Received:', {
      from: full_name,
      company: company_name,
      email,
      phone,
      product: product_interest,
      type: inquiry_type,
      timestamp: new Date().toISOString()
    });

    // 1. Forward email via FormSubmit free email gateway to info@novasphereexim.com
    let emailSent = false;
    try {
      const emailResponse = await fetch('https://formsubmit.co/ajax/info@novasphereexim.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Commercial Inquiry: ${product_interest || inquiry_type} - ${full_name}`,
          _replyto: email,
          'Full Name': full_name,
          'Company Name': company_name || 'N/A',
          'Email': email,
          'Phone / WhatsApp': phone || 'N/A',
          'Country': country || 'India',
          'Inquiry Type': inquiry_type || 'Buyer',
          'Product of Interest': product_interest || 'General',
          'Message / Specifications': message
        })
      });

      if (emailResponse.ok) {
        emailSent = true;
      }
    } catch (emailErr) {
      console.warn('Email gateway notification attempt:', emailErr.message);
    }

    return res.status(200).json({
      success: true,
      emailSent,
      recipient: 'info@novasphereexim.com',
      message: 'Inquiry received and processed for trade desk follow-up.'
    });

  } catch (err) {
    console.error('Inquiry processing exception:', err);
    return res.status(500).json({
      error: 'Failed to process inquiry',
      details: err.message
    });
  }
}
