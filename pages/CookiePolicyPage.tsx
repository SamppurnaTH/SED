import React from 'react';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';
import LegalPageLayout from '../components/LegalPageLayout';

const navItems = [
    { name: 'What Are Cookies?', href: '#what-are-cookies' },
    { name: 'How We Use Cookies', href: '#how-we-use' },
    { name: 'Your Choices', href: '#your-choices' },
    { name: 'Changes to This Policy', href: '#policy-changes' },
    { name: 'Contact Us', href: '#contact-us' },
];

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <LegalPageLayout
        title="Cookie Policy"
        lastUpdated={new Date().toLocaleDateString()}
        navItems={navItems}
      >
        <section id="what-are-cookies" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit certain websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </section>

        <section id="how-we-use" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">2. How We Use Cookies</h2>
          <p>
            We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site.
          </p>
          <ul className="list-disc list-outside space-y-2 pl-6">
            <li>
              <strong className="font-semibold text-text-primary">Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
            </li>
            <li>
              <strong className="font-semibold text-text-primary">Performance and Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
            </li>
            <li>
              <strong className="font-semibold text-text-primary">Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. For example, we use cookies to remember your saved courses.
            </li>
          </ul>
        </section>

        <section id="your-choices" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">3. Your Choices Regarding Cookies</h2>
          <p>
            When you first visit our site, you will see a cookie consent banner that allows you to accept or decline the use of non-essential cookies. You can also modify your browser settings to decline cookies. However, if you choose to decline cookies, you may not be able to fully experience the interactive features of our services.
          </p>
        </section>

        <section id="policy-changes" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">4. Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
          </p>
        </section>

        <section id="contact-us" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-poppins font-bold text-text-primary">5. Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, please contact us through our <Link to="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
          </p>
        </section>
      </LegalPageLayout>

      <CTA />
    </>
  );
};

export default CookiePolicyPage;