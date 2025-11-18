import React from 'react';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';
import LegalPageLayout from '../components/LegalPageLayout';

const navItems = [
    { name: 'Introduction', href: '#introduction' },
    { name: 'Use of Our Services', href: '#use-of-services' },
    { name: 'Intellectual Property', href: '#intellectual-property' },
    { name: 'Limitation of Liability', href: '#limitation-of-liability' },
    { name: 'Changes to Terms', href: '#changes-to-terms' },
    { name: 'Governing Law', href: '#governing-law' },
    { name: 'Contact Us', href: '#contact-us' },
];

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <LegalPageLayout
        title="Terms & Conditions"
        lastUpdated={new Date().toLocaleDateString()}
        navItems={navItems}
      >
        <section id="introduction" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">1. Introduction</h2>
          <p>
            Welcome to SCHOLASTIC A EDU. DEPOT. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
          </p>
        </section>
        
        <section id="use-of-services" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">2. Use of Our Services</h2>
          <p>
            You agree to use our services for lawful purposes only. You must not use our services to harass, abuse, or harm another person or to engage in any illegal activity. You are responsible for maintaining the confidentiality of your account and password.
          </p>
        </section>

        <section id="intellectual-property" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and course materials, is the property of SCHOLASTIC A EDU. DEPOT and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.
          </p>
        </section>
        
        <section id="limitation-of-liability" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">4. Limitation of Liability</h2>
          <p>
            SCHOLASTIC A EDU. DEPOT will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </section>
        
        <section id="changes-to-terms" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms and Conditions on this page. Your continued use of the website after any such changes constitutes your acceptance of the new terms.
          </p>
        </section>
        
        <section id="governing-law" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
        </section>

        <section id="contact-us" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please <Link to="/contact" className="text-primary font-semibold hover:underline">contact us</Link>.
          </p>
        </section>
      </LegalPageLayout>

      <CTA />
    </>
  );
};

export default TermsAndConditionsPage;