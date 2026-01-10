import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export default function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg'
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta description
    setMetaTag('description', description);

    // Set keywords if provided
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Set Open Graph tags
    setMetaTag('og:title', ogTitle || title, 'property');
    setMetaTag('og:description', ogDescription || description, 'property');
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:type', 'website', 'property');

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image', 'name');
    setMetaTag('twitter:title', ogTitle || title, 'name');
    setMetaTag('twitter:description', ogDescription || description, 'name');
    setMetaTag('twitter:image', ogImage, 'name');
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('content', content);
}