import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { usePartners } from '../contexts/PartnersContext';
import Logo from '../components/icons/Logo';
import { Partner } from '../types';
import { API_URL } from '../constants';

const AdminPartnerFormPage: React.FC = () => {
    const { partnerSlug } = useParams<{ partnerSlug: string }>();
    const isEditing = Boolean(partnerSlug);
    const navigate = useNavigate();
    const { logout, adminUser } = useAdminAuth();
    const { getPartnerBySlug, addPartner, updatePartner, partners } = usePartners();
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState<Partner>({
        name: '',
        slug: '',
        logoUrl: '',
        websiteUrl: '',
        description: '',
        bannerImageUrl: '',
        longDescription: '',
        hiringRoles: [],
        contact: { email: '', phone: '' },
    });

    useEffect(() => {
        if (isEditing && partnerSlug) {
            const existingPartner = getPartnerBySlug(partnerSlug);
            if (existingPartner) {
                setFormData(existingPartner);
            } else {
                alert('Partner not found!');
                navigate('/admin/partners');
            }
        }
    }, [isEditing, partnerSlug, getPartnerBySlug, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'email' || name === 'phone') {
            setFormData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
        } else if (name === 'hiringRoles') {
            setFormData(prev => ({ ...prev, hiringRoles: value.split(',').map(s => s.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'bannerImageUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File is too large. Please upload an image under 5MB.');
            return;
        }

        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        setUploading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataUpload,
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            setFormData(prev => ({ ...prev, [field]: data.url }));
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSlugGeneration = () => {
        if (formData.name && !isEditing) {
            const newSlug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (uploading) {
            alert("Please wait for images to upload.");
            return;
        }

        // Validation for new partner slug
        if (!isEditing && partners.some(p => p.slug === formData.slug)) {
            alert('Error: This slug is already in use. Please choose a unique one.');
            return;
        }

        if (isEditing && partnerSlug) {
            updatePartner(partnerSlug, formData);
        } else {
            addPartner(formData);
        }
        navigate('/admin/partners');
    };
    
    const dashboardName = adminUser?.role === 'marketing' ? 'Marketing Dashboard' : 'Admin Dashboard';


    return (
        <div className="min-h-screen bg-light-gray">
             <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Logo className="h-8 w-8 text-primary" />
                         <nav aria-label="breadcrumb">
                          <ol className="flex items-center space-x-2 text-sm">
                            <li><Link to="/admin/dashboard" className="text-dark-gray/70 hover:text-primary">{dashboardName}</Link></li>
                            <li><span className="text-dark-gray/50">/</span></li>
                            <li><Link to="/admin/partners" className="text-dark-gray/70 hover:text-primary">Manage Partners</Link></li>
                             <li><span className="text-dark-gray/50">/</span></li>
                            <li><span className="font-semibold text-dark-gray">{isEditing ? 'Edit Partner' : 'New Partner'}</span></li>
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
                    {isEditing ? `Editing "${formData.name}"` : 'Create New Partner'}
                </h2>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-1">Partner Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} onBlur={handleSlugGeneration} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                        </div>
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-dark-gray mb-1">URL Slug (auto-generated)</label>
                            <input type="text" name="slug" id="slug" value={formData.slug} onChange={handleChange} required disabled={isEditing} className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 disabled:cursor-not-allowed"/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-dark-gray mb-1">Short Description (for cards)</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={2} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"></textarea>
                    </div>
                     <div>
                        <label htmlFor="longDescription" className="block text-sm font-medium text-dark-gray mb-1">Long Description (for detail page)</label>
                        <textarea name="longDescription" id="longDescription" value={formData.longDescription} onChange={handleChange} rows={5} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="logoUrl" className="block text-sm font-medium text-dark-gray mb-1">Logo Image</label>
                            <div className="space-y-2">
                                <input type="url" name="logoUrl" id="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="Image URL" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logoUrl')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"/>
                            </div>
                            {formData.logoUrl && <img src={formData.logoUrl} alt="Logo Preview" className="mt-2 h-12 w-auto object-contain border p-1 rounded"/>}
                        </div>
                         <div>
                            <label htmlFor="bannerImageUrl" className="block text-sm font-medium text-dark-gray mb-1">Banner Image</label>
                             <div className="space-y-2">
                                <input type="url" name="bannerImageUrl" id="bannerImageUrl" value={formData.bannerImageUrl} onChange={handleChange} placeholder="Image URL" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'bannerImageUrl')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"/>
                             </div>
                             {formData.bannerImageUrl && <img src={formData.bannerImageUrl} alt="Banner Preview" className="mt-2 h-24 w-full object-cover rounded"/>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="websiteUrl" className="block text-sm font-medium text-dark-gray mb-1">Careers Page Website URL</label>
                        <input type="url" name="websiteUrl" id="websiteUrl" value={formData.websiteUrl} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                    </div>
                     <div>
                        <label htmlFor="hiringRoles" className="block text-sm font-medium text-dark-gray mb-1">Hiring Roles (comma-separated)</label>
                        <input type="text" name="hiringRoles" id="hiringRoles" value={formData.hiringRoles.join(', ')} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-dark-gray mb-1">Contact Email</label>
                            <input type="email" name="email" id="email" value={formData.contact.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-dark-gray mb-1">Contact Phone</label>
                            <input type="tel" name="phone" id="phone" value={formData.contact.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate('/admin/partners')} className="bg-gray-200 text-dark-gray font-poppins font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={uploading} className="bg-primary text-white font-poppins font-bold py-2 px-5 rounded-lg hover:bg-accent transition-colors disabled:opacity-50">
                            {uploading ? 'Uploading...' : (isEditing ? 'Save Changes' : 'Create Partner')}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AdminPartnerFormPage;