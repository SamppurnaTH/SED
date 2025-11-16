
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useServices } from '../contexts/ServicesContext';
import Logo from '../components/icons/Logo';
import { Service } from '../types';

const AdminServiceFormPage: React.FC = () => {
    const { serviceSlug } = useParams<{ serviceSlug: string }>();
    const isEditing = Boolean(serviceSlug);
    const navigate = useNavigate();
    const { logout } = useAdminAuth();
    const { getServiceBySlug, addService, updateService, services } = useServices();

    const [formData, setFormData] = useState<Service>({
        title: '',
        slug: '',
        tagline: '',
        description: '',
        features: [],
    });

    useEffect(() => {
        if (isEditing && serviceSlug) {
            const existingService = getServiceBySlug(serviceSlug);
            if (existingService) {
                setFormData(existingService);
            } else {
                alert('Service not found!');
                navigate('/admin/services');
            }
        }
    }, [isEditing, serviceSlug, getServiceBySlug, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'features') {
            setFormData(prev => ({ ...prev, features: value.split(',').map(s => s.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSlugGeneration = () => {
        if (formData.title && !isEditing) {
            const newSlug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isEditing && services.some(s => s.slug === formData.slug)) {
            alert('Error: This slug is already in use. Please choose a unique one.');
            return;
        }

        if (isEditing && serviceSlug) {
            updateService(serviceSlug, formData);
        } else {
            addService(formData);
        }
        navigate('/admin/services');
    };

    return (
        <div className="min-h-screen bg-light-gray">
             <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Logo className="h-8 w-8 text-primary" />
                         <nav aria-label="breadcrumb">
                          <ol className="flex items-center space-x-2 text-sm">
                            <li><Link to="/admin/dashboard" className="text-dark-gray/70 hover:text-primary">Dashboard</Link></li>
                            <li><span className="text-dark-gray/50">/</span></li>
                            <li><Link to="/admin/services" className="text-dark-gray/70 hover:text-primary">Manage Services</Link></li>
                             <li><span className="text-dark-gray/50">/</span></li>
                            <li><span className="font-semibold text-dark-gray">{isEditing ? 'Edit Service' : 'New Service'}</span></li>
                          </ol>
                        </nav>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/admin/login'); }}
                        className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">
                    {isEditing ? `Editing "${formData.title}"` : 'Create New Service'}
                </h2>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-dark-gray mb-1">Service Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} onBlur={handleSlugGeneration} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                        </div>
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-dark-gray mb-1">URL Slug (auto-generated)</label>
                            <input type="text" name="slug" id="slug" value={formData.slug} onChange={handleChange} required disabled={isEditing} className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 disabled:cursor-not-allowed"/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="tagline" className="block text-sm font-medium text-dark-gray mb-1">Tagline</label>
                        <input type="text" name="tagline" id="tagline" value={formData.tagline} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-dark-gray mb-1">Description</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"></textarea>
                    </div>
                     <div>
                        <label htmlFor="features" className="block text-sm font-medium text-dark-gray mb-1">Key Features (comma-separated)</label>
                        <textarea name="features" id="features" value={formData.features.join(', ')} onChange={handleChange} rows={3} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate('/admin/services')} className="bg-gray-200 text-dark-gray font-poppins font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white font-poppins font-bold py-2 px-5 rounded-lg hover:bg-accent transition-colors">
                            {isEditing ? 'Save Changes' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AdminServiceFormPage;
