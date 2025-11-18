
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useCourses } from '../contexts/CoursesContext';
import Logo from '../components/icons/Logo';
import { API_URL } from '../constants';

const AdminContentGenerationPage: React.FC = () => {
    const { logout, adminUser } = useAdminAuth();
    const { courses } = useCourses();
    const navigate = useNavigate();

    const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>(courses[0]?.slug || '');
    const [contentType, setContentType] = useState<'Blog Post' | 'Social Media Update' | 'Email Newsletter'>('Blog Post');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerateContent = async () => {
        if (!selectedCourseSlug) {
            setError('Please select a course.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedContent('');

        const selectedCourse = courses.find(c => c.slug === selectedCourseSlug);
        if (!selectedCourse) {
            setError('Could not find the selected course details.');
            setIsLoading(false);
            return;
        }

        try {
            const courseDetails = `
                Course Name: ${selectedCourse.name}
                Tagline: ${selectedCourse.tagline}
                Description: ${selectedCourse.description}
                Key Highlights: ${selectedCourse.highlights.join(', ')}
                Learning Objectives: ${selectedCourse.learningObjectives.join(', ')}
            `;

            const prompt = `
                You are a professional marketing content writer for a tech academy called "SCHOLASTIC A EDU. DEPOT".
                Your task is to write a compelling "${contentType}" about the following course:

                ${courseDetails}

                ${topic ? `Please focus on the following topic or angle: "${topic}".` : ''}

                The tone should be engaging, informative, and persuasive, aimed at attracting potential students to enroll.
                - For a 'Blog Post', write a short, engaging article (3-4 paragraphs) with a clear title.
                - For a 'Social Media Update', create a concise and punchy post suitable for platforms like LinkedIn or Twitter. Include 3-5 relevant hashtags.
                - For an 'Email Newsletter', draft a promotional email with a catchy subject line and a clear call-to-action.

                Generate the content now.
            `;

            // Use Backend Proxy
            const response = await fetch(`${API_URL}/ai/generate-content`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Content generation failed');
            }
            
            setGeneratedContent(data.text);

        } catch (err: any) {
            console.error("Content generation failed:", err);
            setError(err.message || 'An unknown error occurred during content generation.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent);
        alert('Content copied to clipboard!');
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
                                <li><span className="font-semibold text-dark-gray">AI Content Generator</span></li>
                            </ol>
                        </nav>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-1">AI Content Generator</h2>
                        <p className="text-dark-gray/70 mb-6">Generate marketing copy for any course in seconds.</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-dark-gray mb-1">1. Select a Course</label>
                                <select
                                    id="course"
                                    value={selectedCourseSlug}
                                    onChange={(e) => setSelectedCourseSlug(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-primary focus:border-primary"
                                >
                                    {courses.map(course => (
                                        <option key={course.slug} value={course.slug}>{course.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark-gray mb-2">2. Choose Content Type</label>
                                <div className="flex flex-wrap gap-3">
                                    {(['Blog Post', 'Social Media Update', 'Email Newsletter'] as const).map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setContentType(type)}
                                            className={`font-poppins font-semibold py-2 px-4 rounded-full border-2 transition-all duration-300 ${
                                                contentType === type ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary border-primary/30 hover:bg-primary/10'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                             <div>
                                <label htmlFor="topic" className="block text-sm font-medium text-dark-gray mb-1">3. Optional: Add a specific topic or angle</label>
                                <input
                                    type="text"
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., 'Focus on career outcomes for recent graduates'"
                                />
                            </div>

                            <button
                                onClick={handleGenerateContent}
                                disabled={isLoading}
                                className="w-full bg-accent text-white font-poppins font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Generating...
                                    </>
                                ) : 'Generate Content ✨'}
                            </button>

                            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                            
                            {generatedContent && (
                                <div className="mt-8 border-t pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-poppins font-bold text-xl text-dark-gray">Generated Content</h3>
                                        <button onClick={copyToClipboard} className="bg-secondary text-primary font-poppins font-semibold py-2 px-4 rounded-lg hover:bg-secondary/80">Copy to Clipboard</button>
                                    </div>
                                    <textarea
                                        readOnly
                                        value={generatedContent}
                                        rows={15}
                                        className="w-full p-4 border border-gray-200 rounded-lg bg-light-gray font-mono text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminContentGenerationPage;
