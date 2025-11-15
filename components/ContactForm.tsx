
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState('');
    const [submittedName, setSubmittedName] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields (Name, Email, Message).');
            return;
        }

        setIsLoading(true);
        setSubmissionStatus('idle');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                You are a friendly and helpful support agent for an tech training academy called "SCHOLASTIC A EDU. DEPOT".
                A user named "${formData.name}" has sent a message through the contact form.
                Their email is: ${formData.email}
                The subject of their message is: "${formData.subject || 'No Subject'}"
                Their message is: "${formData.message}"

                Please provide a warm, reassuring, and helpful response. Acknowledge their message, thank them for reaching out, and let them know that a member of the support team will get back to them at their email address shortly regarding their specific query. Keep the tone professional yet approachable. Address them by their name.
            `;

            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });

            setResponseMessage(response.text);
            setSubmissionStatus('success');
            setSubmittedName(formData.name);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error sending message:', error);
            setResponseMessage('Sorry, something went wrong while sending your message. Please try again later or contact us directly via email.');
            setSubmissionStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    if (submissionStatus === 'success') {
        return (
            <div>
                <h4 className="font-poppins font-bold text-lg">Message Sent!</h4>
                <div className="mt-4 p-4 bg-dark-gray/50 border border-green-500 rounded-lg text-white/90">
                    <p className="font-semibold text-primary">Thank you, {submittedName}!</p>
                    <p className="mt-2 whitespace-pre-wrap">{responseMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h4 className="font-poppins font-bold text-lg">Contact Us</h4>
            <p className="mt-1 text-white/70">Have a question? Fill out the form below.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name*"
                        className="w-full bg-dark-gray/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email*"
                        className="w-full bg-dark-gray/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="sr-only">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full bg-dark-gray/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Your Message*"
                        className="w-full bg-dark-gray/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-poppins font-bold py-3 px-6 rounded-lg hover:bg-accent transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
                {submissionStatus === 'error' && (
                     <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-white/90 text-center">
                        <p>{responseMessage}</p>
                    </div>
                )}
            </form>
             <div className="mt-6 text-white/70">
                <p>You can also reach us at:</p>
                <a 
                  href="mailto:Info-skolar@scholastic-edu-depot.com" 
                  className="hover:text-white transition" 
                  aria-label="Email us at Info-skolar@scholastic-edu-depot.com"
                >
                  Email: Info-skolar@scholastic-edu-depot.com
                </a>
                <br />
                <a 
                  href="tel:+918179846868" 
                  className="hover:text-white transition" 
                  aria-label="Call us at +91 81798 46868"
                >
                  Phone: +91 81798 46868
                </a>
            </div>
        </div>
    );
};

export default ContactForm;
