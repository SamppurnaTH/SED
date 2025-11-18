import React from 'react';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';
import LegalPageLayout from '../components/LegalPageLayout';

const navItems = [
    { name: 'Information We Collect', href: '#info-collect' },
    { name: 'How We Use Your Information', href: '#info-use' },
    { name: 'Sharing of Information', href: '#info-share' },
    { name: 'Data Security', href: '#data-security' },
    { name: 'Your Choices', href: '#your-choices' },
    { name: 'Contact Us', href: '#contact-us' },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <LegalPageLayout
        title="Privacy Policy"
        lastUpdated={new Date().toLocaleDateString()}
        navItems={navItems}
      >
        <section id="info-collect" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, register for a course, or contact us. This may include your name, email address, phone number, and any other information you choose to provide. We also collect anonymous data about your use of our website through analytics tools.
          </p>
        </section>

        <section id="info-use" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc list-outside space-y-2 pl-6">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send you related information, including confirmations and invoices.</li>
            <li>Respond to your comments, questions, and requests and provide customer service.</li>
            <li>Communicate with you about products, services, offers, and events offered by SCHOLASTIC A EDU. DEPOT.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
          </ul>
        </section>

        <section id="info-share" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">3. Sharing of Information</h2>
          <p>
            We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
          </p>
        </section>

        <section id="data-security" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
          </p>
        </section>

        <section id="your-choices" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">5. Your Choices</h2>
          <p>
            You may update, correct, or delete information about you at any time by logging into your online account or emailing us. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.
          </p>
        </section>

        <section id="contact-us" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-primary font-semibold hover:underline">contact us</Link>.
          </p>
        </section>
      </LegalPageLayout>

      <CTA />
    </>
  );
};

export default PrivacyPolicyPage;