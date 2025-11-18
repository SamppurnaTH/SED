
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useCourses } from '../contexts/CoursesContext';
import Logo from '../components/icons/Logo';
import { Course, FAQ, Topic } from '../types';
import { courses as defaultCourses, API_URL } from '../constants';

const AdminCourseFormPage: React.FC = () => {
    const { courseSlug } = useParams<{ courseSlug: string }>();
    const isEditing = Boolean(courseSlug);
    const navigate = useNavigate();
    const { logout, adminUser } = useAdminAuth();
    const { getCourseBySlug, addCourse, updateCourse, courses } = useCourses();
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [generatingProjectImageIndex, setGeneratingProjectImageIndex] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState<Course>({
        ...defaultCourses[0],
        name: '',
        slug: '',
        tagline: '',
        description: '',
        points: [],
        category: 'Web Development',
        imageUrl: '',
        duration: '',
        highlights: [],
        learningObjectives: [],
        instructor: { name: '', title: '', imageUrl: '', bio: '' },
        pricing: { amount: 0, currency: 'INR', note: '', inclusions: [] },
        curriculum: [],
        projects: [],
        faqs: [],
        deadlines: [],
    });

    useEffect(() => {
        if (isEditing && courseSlug) {
            const existingCourse = getCourseBySlug(courseSlug);
            if (existingCourse) {
                setFormData(existingCourse);
            } else {
                alert('Course not found!');
                navigate('/admin/courses');
            }
        }
    }, [isEditing, courseSlug, getCourseBySlug, navigate]);
    
    // ... (Image Generation and Upload handlers remain largely same)
     const handleGenerateImage = async () => {
        if (!formData.name) {
            alert('Please enter a course name first to generate a relevant image.');
            return;
        }
        setIsGeneratingImage(true);
        try {
            const prompt = `A professional, high-quality banner image for a tech academy course titled "${formData.name}". The course focuses on: "${formData.tagline}". The image should be visually appealing, modern, and represent concepts like coding, technology, and learning. Abstract representations are preferred. Avoid text in the image.`;
            const response = await fetch(`${API_URL}/ai/generate-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
        } catch (error) {
            console.error("Image generation failed:", error);
            alert("Failed to generate image. Please try again or upload manually.");
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'instructorImageUrl' | { type: 'project', index: number }) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { alert('File is too large. Max 5MB.'); return; }

        const formDataUpload = new FormData();
        formDataUpload.append('image', file);
        setUploading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formDataUpload,
            });
            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            
            if (typeof field === 'string') {
                if (field === 'imageUrl') setFormData(prev => ({ ...prev, imageUrl: data.url }));
                else if (field === 'instructorImageUrl') setFormData(prev => ({ ...prev, instructor: { ...prev.instructor, imageUrl: data.url } }));
            } else if (field.type === 'project') {
                 const newProjects = [...formData.projects];
                 newProjects[field.index] = { ...newProjects[field.index], imageUrl: data.url };
                 setFormData(prev => ({ ...prev, projects: newProjects }));
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload image.');
        } finally {
            setUploading(false);
        }
    };

    // Basic Handlers
    const handleSimpleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, instructor: { ...prev.instructor, [name]: value }}));
    };

    const handleSlugGeneration = () => {
        if (formData.name && !isEditing) {
            const newSlug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    };

    // --- Curriculum Handlers (Updated for Rich Objects) ---
    const handleCurriculumChange = (index: number, value: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index] = { ...newCurriculum[index], title: value };
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const handleTopicChange = (weekIndex: number, topicIndex: number, field: keyof Topic, value: string) => {
        const newCurriculum = [...formData.curriculum];
        const newTopics = [...newCurriculum[weekIndex].topics];
        newTopics[topicIndex] = { ...newTopics[topicIndex], [field]: value };
        newCurriculum[weekIndex] = { ...newCurriculum[weekIndex], topics: newTopics };
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const addCurriculumWeek = () => {
        setFormData(prev => ({
            ...prev,
            curriculum: [
                ...prev.curriculum,
                { week: prev.curriculum.length + 1, title: '', topics: [{ title: '', videoUrl: '', content: '' }] }
            ]
        }));
    };

    const removeCurriculumWeek = (index: number) => {
        const newCurriculum = formData.curriculum.filter((_, i) => i !== index)
            .map((week, i) => ({ ...week, week: i + 1 }));
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const addTopic = (weekIndex: number) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[weekIndex].topics.push({ title: '', videoUrl: '', content: '' });
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const removeTopic = (weekIndex: number, topicIndex: number) => {
        const newCurriculum = [...formData.curriculum];
        if (newCurriculum[weekIndex].topics.length > 1) {
            newCurriculum[weekIndex].topics = newCurriculum[weekIndex].topics.filter((_, i) => i !== topicIndex);
            setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
        } else {
            alert("A week must have at least one topic.");
        }
    };

    // --- Validation & Submit ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (uploading) { alert("Please wait for uploads."); return; }
        
        if (!isEditing && courses.some(c => c.slug === formData.slug)) {
            alert('Error: This slug is already in use.');
            return;
        }

        if (isEditing && courseSlug) {
            updateCourse(courseSlug, formData);
        } else {
            addCourse(formData);
        }
        navigate('/admin/courses');
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
                            <li><Link to="/admin/courses" className="text-dark-gray/70 hover:text-primary">Manage Courses</Link></li>
                             <li><span className="text-dark-gray/50">/</span></li>
                            <li><span className="font-semibold text-dark-gray">{isEditing ? 'Edit Course' : 'New Course'}</span></li>
                          </ol>
                        </nav>
                    </div>
                    <button onClick={() => { logout(); navigate('/admin/login'); }} className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors">Logout</button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">
                    {isEditing ? `Editing "${formData.name}"` : 'Create New Course'}
                </h2>

                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-8">
                    {/* Basic Info */}
                    <fieldset className="space-y-6 border-b pb-6">
                        <legend className="text-lg font-semibold text-primary">Basic Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Course Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleSimpleChange} onBlur={handleSlugGeneration} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">URL Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleSimpleChange} required disabled={isEditing} className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"/>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Tagline</label>
                            <input type="text" name="tagline" value={formData.tagline} onChange={handleSimpleChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleSimpleChange} rows={4} required className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleSimpleChange} required className="w-full border border-gray-300 rounded-lg p-2">
                                     <option>Web Development</option>
                                     <option>Data Science</option>
                                     <option>Cloud & DevOps</option>
                                     <option>AI & ML</option>
                                     <option>Cybersecurity</option>
                                     <option>Marketing</option>
                                     <option>Design</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Course Duration</label>
                                <input type="text" name="duration" value={formData.duration} onChange={handleSimpleChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Course Image</label>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'imageUrl')} disabled={uploading} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer disabled:opacity-50"/>
                                <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage} className="bg-secondary text-primary font-bold py-2 px-4 rounded-lg hover:bg-secondary/80 shadow-sm whitespace-nowrap disabled:opacity-50">
                                    {isGeneratingImage ? 'Generating...' : 'Generate Image'}
                                </button>
                            </div>
                        </div>
                         {formData.imageUrl && <img src={formData.imageUrl} alt="preview" className="mt-4 w-full h-48 object-cover rounded-lg border" />}
                    </fieldset>
                    
                    {/* Curriculum Section */}
                    <fieldset className="space-y-6 border-b pb-6">
                        <div className="flex justify-between items-center">
                             <legend className="text-lg font-semibold text-primary">Curriculum</legend>
                             <button type="button" onClick={addCurriculumWeek} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded hover:bg-primary/20">+ Add Week</button>
                        </div>
                        {formData.curriculum.map((week, wIndex) => (
                            <div key={wIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-dark-gray">Week {week.week}</h4>
                                    <button type="button" onClick={() => removeCurriculumWeek(wIndex)} className="text-red-500 text-xs hover:underline">Remove Week</button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Week Title</label>
                                    <input type="text" value={week.title} onChange={(e) => handleCurriculumChange(wIndex, e.target.value)} placeholder="e.g., Introduction to React" className="w-full border border-gray-300 rounded p-2 text-sm"/>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-gray-500">Lessons / Topics</p>
                                    {week.topics.map((topic, tIndex) => (
                                        <div key={tIndex} className="p-3 bg-white border border-gray-200 rounded relative">
                                            <div className="grid gap-3">
                                                <input 
                                                    type="text" 
                                                    value={topic.title} 
                                                    onChange={(e) => handleTopicChange(wIndex, tIndex, 'title', e.target.value)} 
                                                    placeholder="Lesson Title" 
                                                    className="w-full border border-gray-300 rounded p-2 text-sm"
                                                />
                                                <input 
                                                    type="url" 
                                                    value={topic.videoUrl || ''} 
                                                    onChange={(e) => handleTopicChange(wIndex, tIndex, 'videoUrl', e.target.value)} 
                                                    placeholder="Video URL (YouTube/MP4)" 
                                                    className="w-full border border-gray-300 rounded p-2 text-sm"
                                                />
                                                <textarea 
                                                    value={topic.content || ''} 
                                                    onChange={(e) => handleTopicChange(wIndex, tIndex, 'content', e.target.value)} 
                                                    placeholder="Lesson Content / Notes (Markdown supported)" 
                                                    rows={3}
                                                    className="w-full border border-gray-300 rounded p-2 text-sm"
                                                />
                                            </div>
                                            <button type="button" onClick={() => removeTopic(wIndex, tIndex)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold">X</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addTopic(wIndex)} className="text-xs text-primary hover:underline font-medium">+ Add Lesson</button>
                                </div>
                            </div>
                        ))}
                    </fieldset>

                    {/* Instructor Section */}
                    <fieldset className="space-y-6 border-b pb-6">
                         <legend className="text-lg font-semibold text-primary">Instructor</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Name</label>
                                <input type="text" name="name" value={formData.instructor.name} onChange={handleInstructorChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Title</label>
                                <input type="text" name="title" value={formData.instructor.title} onChange={handleInstructorChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Bio</label>
                            <textarea name="bio" value={formData.instructor.bio} onChange={handleInstructorChange} rows={3} required className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                        </div>
                    </fieldset>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate('/admin/courses')} className="bg-gray-200 text-dark-gray font-poppins font-bold py-2 px-5 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-primary text-white font-poppins font-bold py-2 px-5 rounded-lg">{isEditing ? 'Save Changes' : 'Create Course'}</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AdminCourseFormPage;
