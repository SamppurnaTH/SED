import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { useCourses } from '../contexts/CoursesContext';
import { API_URL } from '../constants';
import { Type } from '@google/genai';
// FIX: Import `reportError` to make it available in the scope for error handling.
import { trackEvent, reportError } from '../services/analytics';

// --- TYPE DEFINITIONS ---
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

// --- THE CUSTOM HOOK ---
const useResumeBuilder = () => {
    const { user } = useAuth();
    const { enrolledCourses: enrolledCourseInfo } = useUserProgress();
    const { courses } = useCourses();

    // --- STATE MANAGEMENT ---
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ name: user?.name || '', email: user?.email || '', phone: '', linkedin: '' });
    const [experience, setExperience] = useState<Experience[]>([{ id: 1, role: '', company: '', dates: '', responsibilities: '' }]);
    const [education, setEducation] = useState<Education[]>([{ id: 1, institution: '', degree: '', dates: '' }]);
    const [skills, setSkills] = useState<string>('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);

    // --- SIDE EFFECTS ---
    useEffect(() => {
        // Pre-populate skills from enrolled courses
        const skillsFromCourses = enrolledCourseInfo.flatMap(enrolled => {
            const course = courses.find(c => c.slug === enrolled.courseSlug);
            return course ? [...course.highlights, ...course.learningObjectives] : [];
        });
        const uniqueSkills = [...new Set(skillsFromCourses)];
        setSkills(uniqueSkills.join(', '));
    }, [enrolledCourseInfo, courses]);

    // --- ACTION HANDLERS ---
    const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSkillsChange = (value: string) => {
        setSkills(value);
    };

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
            trackEvent('resume_generated', { experience_count: experience.length, education_count: education.length });

        } catch (err) {
            console.error("Resume generation failed:", err);
            setError("Sorry, we couldn't generate your resume at this time. Please check your inputs and try again.");
            reportError(err as Error, { context: 'AI Resume Generation' });
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

    // --- RETURN VALUES ---
    return {
        personalInfo,
        experience,
        education,
        skills,
        isLoading,
        error,
        generatedResume,
        actions: {
            handlePersonalInfoChange,
            handleSkillsChange,
            handleAddExperience,
            handleRemoveExperience,
            handleExperienceChange,
            handleAddEducation,
            handleRemoveEducation,
            handleEducationChange,
            handleGenerateResume,
            copyToClipboard,
        },
    };
};

export default useResumeBuilder;
