/**
 * Vercel Serverless Function: Inquiries & RFQ Dispatcher
 * Dispatches trade inquiries, logs commercial leads, and notifies the trade desk at info@novasphereexim.com
 */

const RECIPIENT_EMAIL = process.env.TRADE_DESK_EMAIL || 'info@novasphereexim.com';
const CC_EMAIL = process.env.TRADE_DESK_CC || 'suyash23yewale@gmail.com';

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
      company: company_name || 'N/A',
      email,
      phone: phone || 'N/A',
      country: country || 'India',
      product: product_interest || 'General',
      type: inquiry_type || 'Buyer',
      timestamp: new Date().toISOString()
    });

    let emailSent = false;
    let gatewayProvider = 'none';
    let gatewayStatus = '';
    let activationRequired = false;

    // 1. Primary Option: Resend API (if RESEND_API_KEY is configured in Vercel or environment)
    if (process.env.RESEND_API_KEY) {
      try {
        const fromAddress = process.env.RESEND_FROM || 'NovaSphere Trade Desk <onboarding@resend.dev>';
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [RECIPIENT_EMAIL],
            cc: CC_EMAIL ? [CC_EMAIL] : undefined,
            reply_to: email,
            subject: `[Commercial RFQ] ${product_interest || inquiry_type} - ${full_name} (${company_name || 'Individual'})`,
            html: `
              <h2>NovaSphere Exim - Commercial Inquiry / RFQ</h2>
              <table style="width:100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Full Name</td><td style="padding: 8px; border: 1px solid #ddd;">${full_name}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Name</td><td style="padding: 8px; border: 1px solid #ddd;">${company_name || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone / WhatsApp</td><td style="padding: 8px; border: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country / Region</td><td style="padding: 8px; border: 1px solid #ddd;">${country || 'India'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Inquirer Type</td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry_type || 'Buyer looking for products'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Product of Interest</td><td style="padding: 8px; border: 1px solid #ddd;">${product_interest || 'General'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Requirement / Message</td><td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</td></tr>
              </table>
              <p style="margin-top: 16px; font-size: 12px; color: #666;">Received via NovaSphere International Trade Desk web portal at ${new Date().toUTCString()}</p>
            `
          })
        });

        const resendData = await resendRes.json().catch(() => null);
        if (resendRes.ok && resendData?.id) {
          emailSent = true;
          gatewayProvider = 'resend';
          gatewayStatus = 'Delivered via Resend API';
          console.log('✅ [Resend] Email notification dispatched successfully. ID:', resendData.id);
        } else {
          console.warn('⚠️ [Resend] Dispatch returned non-OK status:', resendData);
        }
      } catch (resendErr) {
        console.warn('⚠️ [Resend] Failed to dispatch via Resend:', resendErr.message);
      }
    }

    // 2. Secondary Option: FormSubmit free email gateway
    if (!emailSent) {
      try {
        const originHeader = req.headers?.origin || req.headers?.referer || 'https://novasphereexim.com';
        const refererHeader = req.headers?.referer || `${originHeader}/`;

        const emailResponse = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': originHeader,
            'Referer': refererHeader
          },
          body: JSON.stringify({
            _subject: `New Commercial RFQ: ${product_interest || inquiry_type} - ${full_name}`,
            _replyto: email,
            _captcha: 'false',
            _template: 'table',
            _cc: CC_EMAIL,
            'Full Name': full_name,
            'Company Name': company_name || 'N/A',
            'Email Address': email,
            'Phone / WhatsApp': phone || 'N/A',
            'Country': country || 'India',
            'Inquiry Type': inquiry_type || 'Buyer',
            'Product of Interest': product_interest || 'General',
            'Buyer Requirement / Message': message
          })
        });

        const emailData = await emailResponse.json().catch(() => null);
        const isDelivered = emailResponse.ok && (emailData?.success === 'true' || emailData?.success === true);
        const needsActivation = emailData?.message?.toLowerCase().includes('activation');

        if (isDelivered) {
          emailSent = true;
          gatewayProvider = 'formsubmit';
          gatewayStatus = 'Delivered via FormSubmit gateway';
          console.log('✅ [FormSubmit] Email notification dispatched successfully to', RECIPIENT_EMAIL);
        } else if (needsActivation) {
          gatewayProvider = 'formsubmit';
          activationRequired = true;
          gatewayStatus = 'FormSubmit activation required: please open the inbox for ' + RECIPIENT_EMAIL + ' and click "Activate Form".';
          console.warn('⚠️ [FormSubmit] Activation required for recipient:', RECIPIENT_EMAIL);
          console.warn('Action Required: FormSubmit sent an activation email to ' + RECIPIENT_EMAIL + '. Click the link inside to enable delivery.');
        } else {
          gatewayProvider = 'formsubmit';
          gatewayStatus = emailData?.message || `HTTP ${emailResponse.status}`;
          console.warn('⚠️ [FormSubmit] Delivery attempt status:', gatewayStatus);
        }
      } catch (emailErr) {
        console.warn('⚠️ [FormSubmit] Exception during dispatch:', emailErr.message);
        gatewayStatus = emailErr.message;
      }
    }

    return res.status(200).json({
      success: true,
      emailSent,
      gatewayProvider,
      gatewayStatus,
      activationRequired,
      recipient: RECIPIENT_EMAIL,
      cc: CC_EMAIL,
      message: emailSent
        ? 'Inquiry received and emailed to the NovaSphere Trade Desk.'
        : (activationRequired
            ? 'Inquiry recorded. Gateway requires one-time email activation at ' + RECIPIENT_EMAIL
            : 'Inquiry received and recorded for trade desk follow-up.')
    });

  } catch (err) {
    console.error('Inquiry processing exception:', err);
    return res.status(500).json({
      error: 'Failed to process inquiry',
      details: err.message
    });
  }
}

