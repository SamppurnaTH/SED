
import React, { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, imageUrl }) => {
  useEffect(() => {
    // 1. Update page title
    document.title = title;

    // 2. Helper to update or create meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Set standard meta tags
    setMetaTag('name', 'description', description);

    // 4. Set Open Graph (Facebook, LinkedIn, etc.) tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    if (imageUrl) {
      setMetaTag('property', 'og:image', imageUrl);
    }

    // 5. Set Twitter Card tags
    setMetaTag('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (imageUrl) {
      setMetaTag('name', 'twitter:image', imageUrl);
    }

  }, [title, description, imageUrl]);

  return null; // This component doesn't render anything to the DOM
};

export default MetaTags;
