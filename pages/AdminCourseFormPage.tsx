import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useCourses } from '../contexts/CoursesContext';
import Logo from '../components/icons/Logo';
import { Course, FAQ } from '../types';
import { courses as defaultCourses } from '../constants';
import { GoogleGenAI, Modality } from '@google/genai';

const AdminCourseFormPage: React.FC = () => {
    const { courseSlug } = useParams<{ courseSlug: string }>();
    const isEditing = Boolean(courseSlug);
    const navigate = useNavigate();
    const { logout } = useAdminAuth();
    const { getCourseBySlug, addCourse, updateCourse, courses } = useCourses();
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

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
    
    const handleGenerateImage = async () => {
        if (!formData.name) {
            alert('Please enter a course name first to generate a relevant image.');
            return;
        }
        setIsGeneratingImage(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A professional, high-quality banner image for a tech academy course titled "${formData.name}". The course focuses on: "${formData.tagline}". The image should be visually appealing, modern, and represent concepts like coding, technology, and learning. Abstract representations are preferred. Avoid text in the image.`;
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: prompt }],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });
    
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setFormData(prev => ({ ...prev, imageUrl: imageUrl }));
                    break;
                }
            }
        } catch (error) {
            console.error("Image generation failed:", error);
            alert("Failed to generate image. Please try again or provide a URL manually.");
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'instructorImageUrl') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('File is too large. Please upload an image under 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    if (field === 'imageUrl') {
                        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
                    } else if (field === 'instructorImageUrl') {
                        setFormData(prev => ({
                            ...prev,
                            instructor: { ...prev.instructor, imageUrl: reader.result as string }
                        }));
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSimpleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value.split(',').map(s => s.trim())}));
    };
    
    const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, instructor: { ...prev.instructor, [name]: value }}));
    };

    const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'amount') {
             setFormData(prev => ({...prev, pricing: { ...prev.pricing, [name]: Number(value) }}));
        } else if (name === 'inclusions') {
             setFormData(prev => ({...prev, pricing: { ...prev.pricing, inclusions: value.split(',').map(s => s.trim()) }}));
        } else {
            setFormData(prev => ({...prev, pricing: { ...prev.pricing, [name]: value }}));
        }
    };

    const handleSlugGeneration = () => {
        if (formData.name && !isEditing) {
            const newSlug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    };
    
    const handleHighlightChange = (index: number, value: string) => {
        const newHighlights = [...formData.highlights];
        newHighlights[index] = value;
        setFormData(prev => ({ ...prev, highlights: newHighlights }));
    };

    const addHighlight = () => {
        setFormData(prev => ({
            ...prev,
            highlights: [...prev.highlights, '']
        }));
    };

    const removeHighlight = (index: number) => {
        const newHighlights = formData.highlights.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, highlights: newHighlights }));
    };

    // Learning Objectives Handlers
    const handleLearningObjectiveChange = (index: number, value: string) => {
        const newObjectives = [...formData.learningObjectives];
        newObjectives[index] = value;
        setFormData(prev => ({ ...prev, learningObjectives: newObjectives }));
    };

    const addLearningObjective = () => {
        setFormData(prev => ({
            ...prev,
            learningObjectives: [...prev.learningObjectives, '']
        }));
    };

    const removeLearningObjective = (index: number) => {
        const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, learningObjectives: newObjectives }));
    };


    // Curriculum Handlers
    const handleCurriculumChange = (index: number, value: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index] = { ...newCurriculum[index], title: value };
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const handleTopicChange = (weekIndex: number, topicIndex: number, value: string) => {
        const newCurriculum = [...formData.curriculum];
        const newTopics = [...newCurriculum[weekIndex].topics];
        newTopics[topicIndex] = value;
        newCurriculum[weekIndex] = { ...newCurriculum[weekIndex], topics: newTopics };
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const addCurriculumWeek = () => {
        setFormData(prev => ({
            ...prev,
            curriculum: [
                ...prev.curriculum,
                { week: prev.curriculum.length + 1, title: '', topics: [''] }
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
        newCurriculum[weekIndex].topics.push('');
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const removeTopic = (weekIndex: number, topicIndex: number) => {
        const newCurriculum = [...formData.curriculum];
        if (newCurriculum[weekIndex].topics.length > 1) {
            newCurriculum[weekIndex].topics = newCurriculum[weekIndex].topics.filter((_, i) => i !== topicIndex);
            setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
        }
    };

    // Project Handlers
    const handleProjectChange = (index: number, field: keyof Course['projects'][0], value: string) => {
        const newProjects = [...formData.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        setFormData(prev => ({ ...prev, projects: newProjects }));
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [
                ...prev.projects,
                { title: '', description: '', imageUrl: '' }
            ]
        }));
    };

    const removeProject = (index: number) => {
        const newProjects = formData.projects.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, projects: newProjects }));
    };

    // FAQ Handlers
    const handleFaqChange = (index: number, field: keyof FAQ, value: string) => {
        const newFaqs = [...(formData.faqs || [])];
        newFaqs[index] = { ...newFaqs[index], [field]: value };
        setFormData(prev => ({ ...prev, faqs: newFaqs }));
    };

    const addFaq = () => {
        setFormData(prev => ({
            ...prev,
            faqs: [...(prev.faqs || []), { question: '', answer: '' }]
        }));
    };

    const removeFaq = (index: number) => {
        const newFaqs = (formData.faqs || []).filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, faqs: newFaqs }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Slug validation
        if (!isEditing && courses.some(c => c.slug === formData.slug)) {
            alert('Error: This slug is already in use. Please choose a unique one.');
            return;
        }

        // Curriculum validation
        for (const week of formData.curriculum) {
            if (!week.title.trim()) {
                alert(`Error: Week ${week.week} is missing a title.`);
                return;
            }
            if (week.topics.length === 0 || week.topics.every(t => !t.trim())) {
                alert(`Error: Week ${week.week} must have at least one topic.`);
                return;
            }
             for (const topic of week.topics) {
                if (!topic.trim()) {
                    alert(`Error: Week ${week.week} has an empty topic. Please fill it in or remove it.`);
                    return;
                }
            }
        }

        if (isEditing && courseSlug) {
            updateCourse(courseSlug, formData);
        } else {
            addCourse(formData);
        }
        navigate('/admin/courses');
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
                            <li><Link to="/admin/courses" className="text-dark-gray/70 hover:text-primary">Manage Courses</Link></li>
                             <li><span className="text-dark-gray/50">/</span></li>
                            <li><span className="font-semibold text-dark-gray">{isEditing ? 'Edit Course' : 'New Course'}</span></li>
                          </ol>
                        </nav>
                    </div>
                    <button onClick={() => { logout(); navigate('/admin/login'); }} className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors">
                        Logout
                    </button>
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
                                <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-1">Course Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleSimpleChange} onBlur={handleSlugGeneration} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-dark-gray mb-1">URL Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleSimpleChange} required disabled={isEditing} className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"/>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="tagline" className="block text-sm font-medium text-dark-gray mb-1">Tagline</label>
                            <input type="text" name="tagline" value={formData.tagline} onChange={handleSimpleChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-dark-gray mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleSimpleChange} rows={4} required className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="category" className="block text-sm font-medium text-dark-gray mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleSimpleChange} required className="w-full border border-gray-300 rounded-lg p-2">
                                     <option>Web Development</option>
                                     <option>Data Science</option>
                                     <option>Cloud & DevOps</option>
                                     <option>AI & ML</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-dark-gray mb-1">Course Duration</label>
                                <input type="text" name="duration" value={formData.duration} onChange={handleSimpleChange} required placeholder="e.g., 8 Weeks" className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="courseImageUpload" className="block text-sm font-medium text-dark-gray mb-1">Course Image</label>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-full">
                                    <input
                                        id="courseImageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'imageUrl')}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload an image (under 2MB) or click "Generate".</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGenerateImage}
                                    disabled={isGeneratingImage || !formData.name}
                                    className="bg-secondary text-primary font-poppins font-bold py-2 px-4 rounded-lg hover:bg-secondary/80 transition-all duration-300 shadow-sm whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] w-full sm:w-auto"
                                >
                                    {isGeneratingImage ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate Image'
                                    )}
                                </button>
                            </div>
                        </div>
                         {formData.imageUrl && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-dark-gray mb-2">Image Preview:</p>
                                <img src={formData.imageUrl} alt="Course banner preview" className="w-full h-auto max-h-48 object-cover rounded-lg border border-gray-200" />
                            </div>
                        )}
                    </fieldset>

                    {/* Details */}
                    <fieldset className="space-y-6 border-b pb-6">
                        <legend className="text-lg font-semibold text-primary">Course Details</legend>
                        <div>
                            <label htmlFor="points" className="block text-sm font-medium text-dark-gray mb-1">Short Points (comma-separated, for cards)</label>
                            <input type="text" name="points" value={formData.points.join(', ')} onChange={handleArrayChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Key Highlights</label>
                            {formData.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={highlight}
                                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        placeholder={`Highlight ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(index)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full flex-shrink-0"
                                        aria-label={`Remove highlight ${index + 1}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addHighlight}
                                className="w-full text-center bg-primary/10 text-primary font-poppins font-semibold py-2 px-4 rounded-lg hover:bg-primary/20 transition-colors mt-2"
                            >
                                + Add Highlight
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Learning Objectives</label>
                            {formData.learningObjectives.map((objective, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={objective}
                                        onChange={(e) => handleLearningObjectiveChange(index, e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        placeholder={`Objective ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeLearningObjective(index)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full flex-shrink-0"
                                        aria-label={`Remove objective ${index + 1}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addLearningObjective}
                                className="w-full text-center bg-primary/10 text-primary font-poppins font-semibold py-2 px-4 rounded-lg hover:bg-primary/20 transition-colors mt-2"
                            >
                                + Add Learning Objective
                            </button>
                        </div>
                    </fieldset>

                    {/* Instructor */}
                    <fieldset className="space-y-6 border-b pb-6">
                         <legend className="text-lg font-semibold text-primary">Instructor</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Instructor Name</label>
                                <input type="text" name="name" value={formData.instructor.name} onChange={handleInstructorChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Instructor Title</label>
                                <input type="text" name="title" value={formData.instructor.title} onChange={handleInstructorChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="instructorImageUpload" className="block text-sm font-medium text-dark-gray mb-1">Instructor Image</label>
                            <input
                                id="instructorImageUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'instructorImageUrl')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                            />
                            {formData.instructor.imageUrl && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-dark-gray mb-2">Preview:</p>
                                    <img src={formData.instructor.imageUrl} alt="Instructor preview" className="w-24 h-24 object-cover rounded-full border border-gray-200" />
                                </div>
                            )}
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Instructor Bio</label>
                            <textarea name="bio" value={formData.instructor.bio} onChange={handleInstructorChange} rows={3} required className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                        </div>
                    </fieldset>
                    
                     {/* Pricing */}
                    <fieldset className="space-y-6 border-b pb-6">
                         <legend className="text-lg font-semibold text-primary">Pricing</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Amount (INR)</label>
                                <input type="number" name="amount" min="0" value={formData.pricing.amount} onChange={handlePricingChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-gray mb-1">Pricing Note</label>
                                <input type="text" name="note" value={formData.pricing.note} onChange={handlePricingChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-dark-gray mb-1">Inclusions (comma-separated)</label>
                            <input type="text" name="inclusions" value={formData.pricing.inclusions.join(', ')} onChange={handlePricingChange} required className="w-full border border-gray-300 rounded-lg p-2"/>
                        </div>
                    </fieldset>
                    
                    {/* Curriculum */}
                    <fieldset className="space-y-4 border-b pb-6">
                        <legend className="text-lg font-semibold text-primary">Curriculum</legend>
                        {formData.curriculum.map((week, weekIndex) => (
                            <div key={weekIndex} className="p-4 border rounded-lg bg-light-gray/50 space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-bold text-dark-gray">Week {week.week}</label>
                                    <button type="button" onClick={() => removeCurriculumWeek(weekIndex)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove Week</button>
                                </div>
                                <input type="text" placeholder="Week Title" value={week.title} onChange={(e) => handleCurriculumChange(weekIndex, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2"/>
                                {week.topics.map((topic, topicIndex) => (
                                    <div key={topicIndex} className="flex items-center gap-2">
                                        <input type="text" placeholder={`Topic ${topicIndex + 1}`} value={topic} onChange={(e) => handleTopicChange(weekIndex, topicIndex, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2"/>
                                        <button type="button" onClick={() => removeTopic(weekIndex, topicIndex)} className="text-red-500 hover:text-red-700 p-1 rounded-full text-xs disabled:opacity-50" disabled={week.topics.length <= 1}>✕</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addTopic(weekIndex)} className="text-primary hover:text-accent text-sm font-semibold">+ Add Topic</button>
                            </div>
                        ))}
                        <button type="button" onClick={addCurriculumWeek} className="w-full bg-primary/10 text-primary font-poppins font-bold py-2 px-5 rounded-lg hover:bg-primary/20 transition-colors">+ Add Week</button>
                    </fieldset>

                    {/* Projects */}
                    <fieldset className="space-y-4 border-b pb-6">
                        <legend className="text-lg font-semibold text-primary">Projects</legend>
                        {formData.projects.map((project, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-light-gray/50 space-y-3">
                                 <div className="flex justify-between items-center">
                                    <label className="block text-sm font-bold text-dark-gray">Project {index + 1}</label>
                                    <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove Project</button>
                                </div>
                                <input type="text" placeholder="Project Title" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2"/>
                                <textarea placeholder="Project Description" value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                                <input type="url" placeholder="Project Image URL" value={project.imageUrl} onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2"/>
                            </div>
                        ))}
                         <button type="button" onClick={addProject} className="w-full bg-primary/10 text-primary font-poppins font-bold py-2 px-5 rounded-lg hover:bg-primary/20 transition-colors">+ Add Project</button>
                    </fieldset>

                     {/* FAQs */}
                    <fieldset className="space-y-4">
                        <legend className="text-lg font-semibold text-primary">Course-Specific FAQs</legend>
                        {formData.faqs?.map((faq, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-light-gray/50 space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-bold text-dark-gray">FAQ {index + 1}</label>
                                    <button type="button" onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove FAQ</button>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Question" 
                                    value={faq.question} 
                                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)} 
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                <textarea 
                                    placeholder="Answer" 
                                    value={faq.answer} 
                                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} 
                                    rows={3} 
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                ></textarea>
                            </div>
                        ))}
                        <button type="button" onClick={addFaq} className="w-full bg-primary/10 text-primary font-poppins font-bold py-2 px-5 rounded-lg hover:bg-primary/20 transition-colors">+ Add FAQ</button>
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
