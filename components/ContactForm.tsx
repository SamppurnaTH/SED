import React, { useState } from 'react';
import { API_URL } from '../constants';

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
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const validate = () => {
        let tempErrors = { name: '', email: '', message: '' };
        let isValid = true;
        if (!formData.name) {
            tempErrors.name = 'Name is required.';
            isValid = false;
        }
        if (!formData.email) {
            tempErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid.';
            isValid = false;
        }
        if (!formData.message) {
            tempErrors.message = 'Message is required.';
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setSubmissionStatus('idle');

        try {
            const response = await fetch(`${API_URL}/submissions`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': window.csrfToken || '',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message.');
            }

            setResponseMessage(data.replyText);
            setSubmissionStatus('success');
            setSubmittedName(formData.name);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } catch (error: any) {
            console.error('Error sending message:', error);
            let errorMessage = 'Sorry, something went wrong. Please try again later.';
            if (error.message && error.message.includes('Failed to fetch')) {
                 errorMessage = 'Unable to connect to the server. Please check your internet connection.';
            }
            setResponseMessage(error.message || errorMessage);
            setSubmissionStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    if (submissionStatus === 'success') {
        return (
            <div>
                <h4 className="font-poppins font-bold text-lg">Message Sent!</h4>
                <div className="mt-4 p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary/90">
                    <p className="font-semibold text-secondary">Thank you, {submittedName}!</p>
                    <p className="mt-2 whitespace-pre-wrap">{responseMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h4 className="font-poppins font-bold text-lg">Contact Us</h4>
            <p className="mt-1 text-secondary/70">Have a question? Fill out the form below.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                 <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name*"
                        className="w-full bg-transparent border-b-2 border-secondary/30 focus:border-secondary transition-colors py-2 text-secondary placeholder-secondary/50 focus:outline-none disabled:cursor-not-allowed"
                        disabled={isLoading}
                    />
                    {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email*"
                        className="w-full bg-transparent border-b-2 border-secondary/30 focus:border-secondary transition-colors py-2 text-secondary placeholder-secondary/50 focus:outline-none disabled:cursor-not-allowed"
                        disabled={isLoading}
                    />
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full bg-transparent border-b-2 border-secondary/30 focus:border-secondary transition-colors py-2 text-secondary placeholder-secondary/50 focus:outline-none disabled:cursor-not-allowed"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Your Message*"
                        className="w-full bg-transparent border-b-2 border-secondary/30 focus:border-secondary transition-colors py-2 text-secondary placeholder-secondary/50 focus:outline-none resize-none disabled:cursor-not-allowed"
                        disabled={isLoading}
                    ></textarea>
                    {errors.message && <p className="text-red-300 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent text-white font-poppins font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 disabled:bg-accent/50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                     <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center">
                        <p>{responseMessage}</p>
                    </div>
                )}
            </form>
             <div className="mt-6 text-sm text-secondary/70 space-y-1">
                <p>You can also reach us at:</p>
                <p>
                  <a 
                    href="mailto:Info-skolar@scholastic-edu-depot.com" 
                    className="hover:text-secondary transition" 
                    aria-label="Email us at Info-skolar@scholastic-edu-depot.com"
                  >
                    Email: Info-skolar@scholastic-edu-depot.com
                  </a>
                </p>
                <p>
                  <a 
                    href="tel:+918179846868" 
                    className="hover:text-secondary transition" 
                    aria-label="Call us at +91 81798 46868"
                  >
                    Phone: +91 81798 46868
                  </a>
                </p>
            </div>
        </div>
    );
};

export default ContactForm;