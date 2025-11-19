import React from 'react';
import CTA from '../components/CTA';
import LegalPageLayout from '../components/LegalPageLayout';
import { cookiePolicyContent } from '../constants/legalContent';

const navItems = cookiePolicyContent.map(section => ({
    name: section.title.substring(section.title.indexOf(' ') + 1),
    href: `#${section.id}`,
}));

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <LegalPageLayout
        title="Cookie Policy"
        lastUpdated={new Date().toLocaleDateString()}
        navItems={navItems}
      >
        {cookiePolicyContent.map(section => (
            <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-poppins font-bold text-text-primary">{section.title}</h2>
                {section.content}
            </section>
        ))}
      </LegalPageLayout>

      <CTA />
    </>
  );
};

export default CookiePolicyPage;
