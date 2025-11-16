import React from 'react';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '../components/icons/contactIcons';

const ContactPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-light-gray to-white pt-32 pb-20 lg:pt-48 lg:pb-28 text-center overflow-hidden">
        <div className="absolute top-0 right-0 -z-0 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-accent to-secondary rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-dark-gray leading-tight">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dark-gray/80 max-w-3xl mx-auto">
            We're here to help. Reach out to us with any questions or inquiries, and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Info */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="font-poppins font-bold text-3xl text-dark-gray">Contact Information</h2>
              <p className="mt-4 text-dark-gray/80">
                Find us at our office, or feel free to give us a call or send an email. We look forward to hearing from you.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="w-8 h-8 text-primary flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-dark-gray">Address</h3>
                    <p className="text-dark-gray/80">D No 37-8-4, OPP 5th town police station, Sathyanagar, Industrial Estate, Visakhapatnam, Andhra Pradesh 530007</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="w-8 h-8 text-primary flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-dark-gray">Phone</h3>
                    <a href="tel:+918179846868" className="text-dark-gray/80 hover:text-primary transition-colors">+91 81798 46868</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="w-8 h-8 text-primary flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-dark-gray">Email</h3>
                    <a href="mailto:Info-skolar@scholastic-edu-depot.com" className="text-dark-gray/80 hover:text-primary transition-colors">Info-skolar@scholastic-edu-depot.com</a>
                  </div>
                </div>
                 <div className="flex items-start">
                  <ClockIcon className="w-8 h-8 text-primary flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-dark-gray">Business Hours</h3>
                    <p className="text-dark-gray/80">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-dark-gray/80">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-dark-gray text-white p-8 md:p-12 rounded-2xl shadow-lg">
                <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark-gray">Find Us On The Map</h2>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.6722883408453!2d83.28292407593256!3d17.712863983226756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943ea6aaaaaab%3A0x8aa86f876249114b!2sSCHOLASTIC%20A%20EDU.%20DEPOT!5e0!3m2!1en!2sin!4v1718042428515!5m2!1en!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SCHOLASTIC A EDU. DEPOT Location"
              className="absolute top-0 left-0 w-full h-full grayscale contrast-125 opacity-90"
            ></iframe>
          </div>
        </div>
      </section>
      
      <FAQ />
    </>
  );
};

export default ContactPage;