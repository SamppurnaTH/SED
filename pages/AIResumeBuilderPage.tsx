import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { useCourses } from '../contexts/CoursesContext';
import { API_URL } from '../constants';
import { Type } from '@google/genai';

interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
}

interface Experience {
    id: number;
    role: string;
    company: string;
    dates: string;
    responsibilities: string;
}

interface Education {
    id: number;
    institution: string;
    degree: string;
    dates: string;
}

interface GeneratedResume {
    summary: string;
    experience: {
        company: string;
        role: string;
        dates: string;
        achievements: string[];
    }[];
}

const AIResumeBuilderPage: React.FC = () => {
    const { user } = useAuth();
    const { enrolledCourses: enrolledCourseInfo } = useUserProgress();
    const { courses } = useCourses();

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ name: user?.name || '', email: user?.email || '', phone: '', linkedin: '' });
    const [experience, setExperience] = useState<Experience[]>([{ id: 1, role: '', company: '', dates: '', responsibilities: '' }]);
    const [education, setEducation] = useState<Education[]>([{ id: 1, institution: '', degree: '', dates: '' }]);
    const [skills, setSkills] = useState<string>('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);

    useEffect(() => {
        const skillsFromCourses = enrolledCourseInfo.flatMap(enrolled => {
            const course = courses.find(c => c.slug === enrolled.courseSlug);
            return course ? [...course.highlights, ...course.learningObjectives] : [];
        });
        const uniqueSkills = [...new Set(skillsFromCourses)];
        setSkills(uniqueSkills.join(', '));
    }, [enrolledCourseInfo, courses]);
    
    // Form change handlers
    const handleAddExperience = () => setExperience([...experience, { id: Date.now(), role: '', company: '', dates: '', responsibilities: '' }]);
    const handleRemoveExperience = (id: number) => setExperience(experience.filter(exp => exp.id !== id));
    const handleExperienceChange = (id: number, field: keyof Omit<Experience, 'id'>, value: string) => {
        setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };
    
    const handleAddEducation = () => setEducation([...education, { id: Date.now(), institution: '', degree: '', dates: '' }]);
    const handleRemoveEducation = (id: number) => setEducation(education.filter(edu => edu.id !== id));
    const handleEducationChange = (id: number, field: keyof Omit<Education, 'id'>, value: string) => {
        setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
    };

    const handleGenerateResume = async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedResume(null);

        try {
            const prompt = `
                You are an expert career coach and professional resume writer for the tech industry.
                Your task is to take the following raw information from a student and transform it into a professional, polished resume.

                **Student Details:**
                - Name: ${personalInfo.name}
                - Contact: ${personalInfo.email}, ${personalInfo.phone}, ${personalInfo.linkedin}
                - Key Skills: ${skills}

                **Work Experience (raw notes):**
                ${experience.map(exp => `
                - Company: ${exp.company}
                  Role: ${exp.role}
                  Dates: ${exp.dates}
                  Responsibilities: ${exp.responsibilities}
                `).join('')}

                **Education:**
                ${education.map(edu => `
                - Institution: ${edu.institution}
                  Degree: ${edu.degree}
                  Dates: ${edu.dates}
                `).join('')}

                **Instructions:**
                1.  **Professional Summary:** Write a concise, 2-3 sentence summary. It should highlight their key skills, position them as an aspiring tech professional (based on their skills), and state their career ambitions.
                2.  **Work Experience:** For each job, rewrite the user's responsibilities into 3-4 achievement-oriented bullet points. Start each bullet with a strong action verb. Quantify results where possible (e.g., "Increased efficiency by 15%," "Reduced load times by 200ms"). If specifics are missing, invent reasonable and impressive metrics that align with the described responsibilities.
            `;
            
            const responseSchema = {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                experience: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      company: { type: Type.STRING },
                      role: { type: Type.STRING },
                      dates: { type: Type.STRING },
                      achievements: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["company", "role", "dates", "achievements"],
                  }
                }
              },
              required: ["summary", "experience"],
            };

            // Call backend proxy
            const response = await fetch(`${API_URL}/ai/generate-resume`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, schema: responseSchema })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            const parsedResume = JSON.parse(data.text);
            setGeneratedResume(parsedResume);

        } catch (err) {
            console.error("Resume generation failed:", err);
            setError("Sorry, we couldn't generate your resume at this time. Please check your inputs and try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const copyToClipboard = () => {
      if (!generatedResume) return;

      const resumeText = `
        ${personalInfo.name}
        ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.linkedin}

        PROFESSIONAL SUMMARY
        ${generatedResume.summary}

        SKILLS
        ${skills}

        WORK EXPERIENCE
        ${generatedResume.experience.map(exp => `
        ${exp.role} | ${exp.company} | ${exp.dates}
        ${exp.achievements.map(a => `- ${a}`).join('\n')}
        `).join('\n')}

        EDUCATION
        ${education.map(edu => `
        ${edu.degree}, ${edu.institution} | ${edu.dates}
        `).join('')}
      `;
      
      navigator.clipboard.writeText(resumeText.trim());
      alert('Resume content copied to clipboard!');
    };


    return (
        <>
            <section className="bg-light-gray pt-32 pb-16 lg:pt-40 lg:pb-20">
                <div className="container mx-auto px-6">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl text-dark-gray">AI Resume Builder</h1>
                    <p className="mt-4 text-lg text-dark-gray/80 max-w-3xl">Fill in your details, and let our AI assistant craft a professional, job-ready resume for you.</p>
                </div>
            </section>
            <section className="py-20 bg-light-gray">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                        <div className="space-y-8">
                            {/* Personal Info */}
                            <fieldset className="space-y-4">
                                <legend className="font-poppins font-bold text-xl text-primary border-b pb-2">Personal Information</legend>
                                {/* Form fields for personal info */}
                                <input value={personalInfo.name} onChange={e => setPersonalInfo({...personalInfo, name: e.target.value})} placeholder="Full Name" className="w-full border border-gray-300 rounded-lg p-2"/>
                                <input value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} placeholder="Email" className="w-full border border-gray-300 rounded-lg p-2"/>
                                <input value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} placeholder="Phone" className="w-full border border-gray-300 rounded-lg p-2"/>
                                <input value={personalInfo.linkedin} onChange={e => setPersonalInfo({...personalInfo, linkedin: e.target.value})} placeholder="LinkedIn Profile URL" className="w-full border border-gray-300 rounded-lg p-2"/>
                            </fieldset>
                            
                            {/* Experience */}
                            <fieldset className="space-y-4">
                                <legend className="font-poppins font-bold text-xl text-primary border-b pb-2">Work Experience</legend>
                                {experience.map((exp, index) => (
                                    <div key={exp.id} className="p-4 border rounded-lg bg-light-gray/50 space-y-3 relative">
                                        <input value={exp.role} onChange={e => handleExperienceChange(exp.id, 'role', e.target.value)} placeholder="Role / Title" className="w-full border border-gray-300 rounded-lg p-2"/>
                                        <input value={exp.company} onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)} placeholder="Company" className="w-full border border-gray-300 rounded-lg p-2"/>
                                        <input value={exp.dates} onChange={e => handleExperienceChange(exp.id, 'dates', e.target.value)} placeholder="Dates (e.g., Jan 2022 - Present)" className="w-full border border-gray-300 rounded-lg p-2"/>
                                        <textarea value={exp.responsibilities} onChange={e => handleExperienceChange(exp.id, 'responsibilities', e.target.value)} placeholder="Your responsibilities (in bullet points or notes)" rows={3} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                                        {experience.length > 1 && <button onClick={() => handleRemoveExperience(exp.id)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">REMOVE</button>}
                                    </div>
                                ))}
                                <button onClick={handleAddExperience} className="w-full text-center bg-primary/10 text-primary font-poppins font-semibold py-2 px-4 rounded-lg hover:bg-primary/20">+ Add Experience</button>
                            </fieldset>

                            {/* Education */}
                            <fieldset className="space-y-4">
                                <legend className="font-poppins font-bold text-xl text-primary border-b pb-2">Education</legend>
                                {education.map((edu) => (
                                     <div key={edu.id} className="p-4 border rounded-lg bg-light-gray/50 space-y-3 relative">
                                        <input value={edu.institution} onChange={e => handleEducationChange(edu.id, 'institution', e.target.value)} placeholder="Institution / University" className="w-full border border-gray-300 rounded-lg p-2"/>
                                        <input value={edu.degree} onChange={e => handleEducationChange(edu.id, 'degree', e.target.value)} placeholder="Degree / Certificate" className="w-full border border-gray-300 rounded-lg p-2"/>
                                        <input value={edu.dates} onChange={e => handleEducationChange(edu.id, 'dates', e.target.value)} placeholder="Dates (e.g., 2018 - 2022)" className="w-full border border-gray-300 rounded-lg p-2"/>
                                        {education.length > 1 && <button onClick={() => handleRemoveEducation(edu.id)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">REMOVE</button>}
                                    </div>
                                ))}
                                <button onClick={handleAddEducation} className="w-full text-center bg-primary/10 text-primary font-poppins font-semibold py-2 px-4 rounded-lg hover:bg-primary/20">+ Add Education</button>
                            </fieldset>

                             {/* Skills */}
                            <fieldset>
                                <legend className="font-poppins font-bold text-xl text-primary border-b pb-2">Skills</legend>
                                <p className="text-sm text-dark-gray/70 my-2">These are pre-populated from your courses. Feel free to edit them.</p>
                                <textarea value={skills} onChange={e => setSkills(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
                            </fieldset>
                            
                            <button onClick={handleGenerateResume} disabled={isLoading} className="w-full bg-primary text-white font-poppins font-bold py-4 px-8 rounded-lg hover:bg-accent disabled:bg-gray-400 flex items-center justify-center">
                               {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Generating...
                                    </>
                               ) : '✨ Generate with AI'}
                            </button>
                        </div>
                    </div>

                    {/* Resume Preview */}
                    <div className="sticky top-28 h-fit">
                         {isLoading && (
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
                                <p className="font-semibold text-primary">Generating your professional resume...</p>
                                <p className="text-sm text-dark-gray/70 mt-2">This may take a moment.</p>
                            </div>
                         )}
                         {error && (
                            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                         )}
                         {generatedResume && (
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 font-serif text-sm relative">
                                <button onClick={copyToClipboard} className="absolute top-4 right-4 bg-primary/10 text-primary font-sans text-xs font-bold py-1 px-3 rounded-full hover:bg-primary/20">Copy</button>
                                <h2 className="text-2xl font-bold text-center">{personalInfo.name}</h2>
                                <p className="text-center text-xs mb-4">{personalInfo.email} | {personalInfo.phone} | {personalInfo.linkedin}</p>
                                
                                <h3 className="font-bold border-b mt-4 mb-2">PROFESSIONAL SUMMARY</h3>
                                <p>{generatedResume.summary}</p>
                                
                                <h3 className="font-bold border-b mt-4 mb-2">SKILLS</h3>
                                <p>{skills}</p>

                                <h3 className="font-bold border-b mt-4 mb-2">WORK EXPERIENCE</h3>
                                {generatedResume.experience.map((exp, i) => (
                                    <div key={i} className="mb-3">
                                        <div className="flex justify-between font-bold">
                                            <p>{exp.role}</p>
                                            <p>{exp.dates}</p>
                                        </div>
                                        <p className="italic">{exp.company}</p>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                            {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                                        </ul>
                                    </div>
                                ))}

                                <h3 className="font-bold border-b mt-4 mb-2">EDUCATION</h3>
                                {education.map((edu, i) => (
                                    <div key={i} className="flex justify-between">
                                        <p><span className="font-bold">{edu.institution}</span>, {edu.degree}</p>
                                        <p className="font-bold">{edu.dates}</p>
                                    </div>
                                ))}
                            </div>
                         )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AIResumeBuilderPage;