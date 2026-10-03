import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../contexts/ContentContext';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  productData = null
}) => {
  const { company } = useContent();

  const siteTitle = title
    ? `${title} | ${company.name}`
    : `${company.name} - ${company.tagline} | International Trading & Market Development`;

  const siteDescription =
    description ||
    `${company.name} is an international trading and market-development company headquartered in ${company.locationDisplay}, India. Connecting manufacturers, suppliers and industrial buyers across borders in Foundry & Metallurgy (GPC, Carbon Raisers), Chemicals and Raw Materials.`;

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://novaspherexim.com/#organization',
        name: company.name,
        url: 'https://novaspherexim.com',
        logo: 'https://novaspherexim.com/assets/logo.png',
        slogan: company.tagline,
        description: company.mission,
        founder: {
          '@type': 'Person',
          name: company.founder,
          jobTitle: company.designation
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Navi Mumbai',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: company.phone,
          contactType: 'customer service',
          email: company.email,
          availableLanguage: ['English', 'Hindi']
        }
      },
      ...(productData
        ? [
            {
              '@type': 'Product',
              name: productData.name,
              description: productData.shortDesc || productData.tagline,
              category: productData.category || 'Foundry Metallurgy Raw Materials',
              brand: {
                '@type': 'Brand',
                name: company.name
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                description: 'Supplied as per client specifications and Incoterms (FOB/CIF/CFR)'
              }
            }
          ]
        : [])
    ]
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* OpenGraph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={company.name} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  );
};

export default SEO;
