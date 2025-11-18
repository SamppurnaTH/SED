import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useBlog } from '../contexts/BlogContext';
import Logo from '../components/icons/Logo';
import { BlogPost } from '../types';
import { GoogleGenAI, Modality } from '@google/genai';
import { API_URL } from '../constants';

const AdminBlogFormPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const isEditing = Boolean(slug);
    const navigate = useNavigate();
    const { adminUser, logout } = useAdminAuth();
    const { getPostBySlug, addPost, updatePost, posts } = useBlog();
    
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState<Omit<BlogPost, 'publishedDate'>>({
        title: '',
        slug: '',
        content: '',
        imageUrl: '',
        category: 'Industry News',
        tags: [],
        author: { name: 'SED Academy', imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop' },
    });

    useEffect(() => {
        if (isEditing && slug) {
            const existingPost = getPostBySlug(slug);
            if (existingPost) {
                setFormData(existingPost);
            } else {
                alert('Blog post not found!');
                navigate('/admin/blog');
            }
        }
    }, [isEditing, slug, getPostBySlug, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData(prev => ({ ...prev, tags: value.split(',').map(s => s.trim()) }));
        } else if (name === 'authorName' || name === 'authorImageUrl') {
            const field = name === 'authorName' ? 'name' : 'imageUrl';
            setFormData(prev => ({ ...prev, author: { ...prev.author, [field]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setFormData(prev => ({ ...prev, imageUrl: data.url }));
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };
    
    const handleSlugGeneration = () => {
        if (formData.title && !isEditing) {
            const newSlug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    };
    
    const handleDraftWithAI = async () => {
        if (!formData.title) {
            alert('Please provide a title to draft a post with AI.');
            return;
        }
        setIsGeneratingContent(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Write a 4-paragraph blog post for a tech academy about "${formData.title}". The tone should be informative and engaging.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setFormData(prev => ({ ...prev, content: response.text }));
        } catch (error) {
            console.error("AI content generation failed:", error);
            alert("Failed to draft content. Please try again.");
        } finally {
            setIsGeneratingContent(false);
        }
    };
    
    const handleGenerateImage = async () => {
        if (!formData.title) {
            alert('Please provide a title to generate an image.');
            return;
        }
        setIsGeneratingImage(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A professional blog post banner image about "${formData.title}". The style should be modern, abstract, and related to technology or learning. No text in the image.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { responseModalities: [Modality.IMAGE] },
            });
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    setFormData(prev => ({ ...prev, imageUrl }));
                    break;
                }
            }
        } catch (error) {
            console.error("AI image generation failed:", error);
            alert("Failed to generate image. Please try again.");
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (uploading) {
             alert("Please wait for images to upload.");
             return;
        }
        
        if (!isEditing && posts.some(p => p.slug === formData.slug)) {
            alert('Error: This slug is already in use.');
            return;
        }

        const postData = { ...formData, publishedDate: new Date().toISOString() };

        if (isEditing && slug) {
            updatePost(slug, postData);
        } else {
            addPost(postData);
        }
        navigate('/admin/blog');
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
                            <li><Link to="/admin/blog" className="text-dark-gray/70 hover:text-primary">Manage Blog</Link></li>
                            <li><span className="text-dark-gray/50">/</span></li>
                            <li><span className="font-semibold text-dark-gray">{isEditing ? 'Edit Post' : 'New Post'}</span></li>
                          </ol>
                        </nav>
                    </div>
                    <button onClick={() => logout()} className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary">Logout</button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">
                    {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-dark-gray mb-1">Post Title</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} onBlur={handleSlugGeneration} required className="w-full border border-gray-300 rounded-lg p-2"/>
                    </div>
                     <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-dark-gray mb-1">URL Slug</label>
                        <input type="text" name="slug" id="slug" value={formData.slug} onChange={handleChange} required disabled={isEditing} className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"/>
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-dark-gray mb-1">Content</label>
                        <div className="relative">
                            <textarea name="content" id="content" value={formData.content} onChange={handleChange} rows={15} required className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                            <button type="button" onClick={handleDraftWithAI} disabled={isGeneratingContent} className="absolute top-2 right-2 bg-primary/10 text-primary text-xs font-bold py-1 px-3 rounded-full hover:bg-primary/20 disabled:opacity-50">
                                {isGeneratingContent ? 'Drafting...' : 'Draft with AI ✨'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-dark-gray mb-1">Banner Image</label>
                         <div className="flex items-center gap-4">
                            <div className="w-full">
                                <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required className="w-full border border-gray-300 rounded-lg p-2"/>
                                <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer disabled:opacity-50"/>
                            </div>
                            <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage} className="bg-secondary text-primary font-bold py-2 px-4 rounded-lg hover:bg-secondary/80 whitespace-nowrap disabled:opacity-50 self-start mt-1">
                                {isGeneratingImage ? 'Generating...' : 'Generate with AI'}
                            </button>
                         </div>
                        {formData.imageUrl && <img src={formData.imageUrl} alt="preview" className="mt-2 h-32 w-auto rounded-lg" />}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-dark-gray mb-1">Category</label>
                            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-dark-gray mb-1">Tags (comma-separated)</label>
                            <input type="text" name="tags" id="tags" value={formData.tags.join(', ')} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Link to="/admin/blog" className="bg-gray-200 text-dark-gray font-poppins font-bold py-2 px-5 rounded-lg hover:bg-gray-300">Cancel</Link>
                        <button type="submit" disabled={uploading} className="bg-primary text-white font-poppins font-bold py-2 px-5 rounded-lg hover:bg-accent disabled:opacity-50">
                            {uploading ? 'Uploading...' : (isEditing ? 'Save Changes' : 'Publish Post')}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AdminBlogFormPage;