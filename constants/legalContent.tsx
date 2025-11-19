import React from 'react';
import { Link } from 'react-router-dom';

// --- Privacy Policy ---
export const privacyPolicyContent = [
    {
        id: 'info-collect',
        title: '1. Information We Collect',
        content: (
          <p>
            We collect information you provide directly to us, such as when you create an account, register for a course, or contact us. This may include your name, email address, phone number, and any other information you choose to provide. We also collect anonymous data about your use of our website through analytics tools.
          </p>
        ),
    },
    {
        id: 'info-use',
        title: '2. How We Use Your Information',
        content: (
            <>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-outside space-y-2 pl-6">
                    <li>Provide, maintain, and improve our services.</li>
                    <li>Process transactions and send you related information, including confirmations and invoices.</li>
                    <li>Respond to your comments, questions, and requests and provide customer service.</li>
                    <li>Communicate with you about products, services, offers, and events offered by SCHOLASTIC A EDU. DEPOT.</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'info-share',
        title: '3. Sharing of Information',
        content: (
            <p>
            We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>
        ),
    },
    {
        id: 'data-security',
        title: '4. Data Security',
        content: (
            <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>
        ),
    },
    {
        id: 'your-choices',
        title: '5. Your Choices',
        content: (
            <p>
            You may update or correct information about you at any time by logging into your online account. If you wish to deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.
            </p>
        ),
    },
    {
        id: 'data-retention-deletion',
        title: '6. Data Retention and Deletion',
        content: (
            <p>
                We retain your personal data for as long as your account is active or as needed to provide you with our services. We may also retain your data as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. You have the right to request the export or deletion of your personal data. You can make a deletion request from your <Link to="/profile" className="text-primary font-semibold hover:underline">Profile Page</Link>. For data export, please contact us directly.
            </p>
        )
    },
    {
        id: 'contact-us',
        title: '7. Contact Us',
        content: (
            <p>
            If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-primary font-semibold hover:underline">contact us</Link>.
            </p>
        ),
    },
];

// --- Terms and Conditions ---
export const termsAndConditionsContent = [
    {
        id: 'introduction',
        title: '1. Introduction',
        content: (
            <p>
            Welcome to SCHOLASTIC A EDU. DEPOT. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
            </p>
        ),
    },
    {
        id: 'use-of-services',
        title: '2. Use of Our Services',
        content: (
            <p>
            You agree to use our services for lawful purposes only. You must not use our services to harass, abuse, or harm another person or to engage in any illegal activity. You are responsible for maintaining the confidentiality of your account and password.
            </p>
        ),
    },
    {
        id: 'intellectual-property',
        title: '3. Intellectual Property',
        content: (
            <p>
            All content on this website, including text, graphics, logos, and course materials, is the property of SCHOLASTIC A EDU. DEPOT and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.
            </p>
        ),
    },
    {
        id: 'limitation-of-liability',
        title: '4. Limitation of Liability',
        content: (
            <p>
            SCHOLASTIC A EDU. DEPOT will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
        ),
    },
    {
        id: 'changes-to-terms',
        title: '5. Changes to Terms',
        content: (
            <p>
            We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms and Conditions on this page. Your continued use of the website after any such changes constitutes your acceptance of the new terms.
            </p>
        ),
    },
    {
        id: 'governing-law',
        title: '6. Governing Law',
        content: (
            <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
        ),
    },
    {
        id: 'contact-us',
        title: '7. Contact Us',
        content: (
            <p>
            If you have any questions about these Terms, please <Link to="/contact" className="text-primary font-semibold hover:underline">contact us</Link>.
            </p>
        ),
    },
];

// --- Cookie Policy ---
export const cookiePolicyContent = [
    {
        id: 'what-are-cookies',
        title: '1. What Are Cookies?',
        content: (
            <p>
            Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit certain websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
        ),
    },
    {
        id: 'how-we-use',
        title: '2. How We Use Cookies',
        content: (
            <>
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
            </>
        ),
    },
    {
        id: 'your-choices',
        title: '3. Your Choices Regarding Cookies',
        content: (
            <p>
            When you first visit our site, you will see a cookie consent banner that allows you to accept or decline the use of non-essential cookies. You can also modify your browser settings to decline cookies. However, if you choose to decline cookies, you may not be able to fully experience the interactive features of our services.
            </p>
        ),
    },
    {
        id: 'policy-changes',
        title: '4. Changes to This Cookie Policy',
        content: (
            <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
            </p>
        ),
    },
    {
        id: 'contact-us',
        title: '5. Contact Us',
        content: (
            <p>
            If you have any questions about this Cookie Policy, please contact us through our <Link to="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
            </p>
        ),
    },
];

// --- Refund Policy ---
export const refundPolicyContent = [
    {
        id: 'commitment',
        title: '1. Our Commitment',
        content: (
            <p>
                At SCHOLASTIC A EDU. DEPOT, we are committed to your satisfaction and success. We offer high-quality, industry-relevant training programs. However, we understand that circumstances can change. This policy outlines the conditions under which a refund may be granted.
            </p>
        ),
    },
    {
        id: 'eligibility',
        title: '2. Refund Eligibility',
        content: (
            <>
                <p>To be eligible for a refund, you must meet the following criteria:</p>
                <ul className="list-disc list-outside space-y-2 pl-6">
                    <li>You must request the refund within <strong>7 calendar days</strong> of your purchase date.</li>
                    <li>You must have completed less than <strong>20%</strong> of the total course content (as tracked by our Learning Management System).</li>
                    <li>Refunds are not applicable to any course fees paid using EMI options or special promotional offers.</li>
                </ul>
                <p>
                    Requests that do not meet these criteria will not be considered.
                </p>
            </>
        ),
    },
    {
        id: 'request-process',
        title: '3. How to Request a Refund',
        content: (
            <p>
                To request a refund, please send an email to our support team at <a href="mailto:support@scholastic-edu-depot.com" className="text-primary font-semibold hover:underline">support@scholastic-edu-depot.com</a> with the subject line "Refund Request". Please include your full name, the course you purchased, the date of purchase, and the reason for your request.
            </p>
        ),
    },
    {
        id: 'processing',
        title: '4. Refund Processing',
        content: (
            <p>
                Once we receive your refund request, we will review it and notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.
            </p>
        ),
    },
    {
        id: 'non-refundable',
        title: '5. Non-Refundable Items',
        content: (
            <p>
                Please note that certain items are non-refundable, including but not limited to: examination fees, certification fees, and any course materials that have been downloaded or fully accessed.
            </p>
        ),
    },
     {
        id: 'contact-us',
        title: '6. Contact Us',
        content: (
            <p>
                If you have any questions about our Refund Policy, please <Link to="/contact" className="text-primary font-semibold hover:underline">contact us</Link>.
            </p>
        ),
    },
];
