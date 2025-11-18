


import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Logo from '../components/icons/Logo';
import { usePartners } from '../contexts/PartnersContext';
import { useServices } from '../contexts/ServicesContext';
import { useContactSubmissions } from '../contexts/ContactSubmissionsContext';
import { useCourses } from '../contexts/CoursesContext';
import { VideoIcon, ContentCreationIcon, AnalyticsIcon, BlogIcon } from '../components/icons/AdminIcons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; to?: string }> = ({ title, value, icon, to }) => {
    const content = (
        <div className={`bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 ${to ? 'hover:bg-primary/5 hover:shadow-lg transition-all duration-300 cursor-pointer' : ''}`}>
            <div className="bg-primary/10 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-dark-gray/70">{title}</p>
                <p className="text-2xl font-bold text-dark-gray">{value}</p>
            </div>
        </div>
    );

    if (to) {
        return <Link to={to} aria-label={`Navigate to ${title}`}>{content}</Link>;
    }

    return content;
};


const AdminDashboardPage: React.FC = () => {
    const { logout, adminUser } = useAdminAuth();
    const { partners } = usePartners();
    const { services } = useServices();
    const { submissions } = useContactSubmissions();
    const { courses } = useCourses();

    const handleLogout = () => {
        logout();
    };

    const partnerCount = partners.length;
    const courseCount = courses.length;
    const serviceCount = services.length;
    const leadCount = submissions.length;
    
    const dashboardTitle = adminUser?.role === 'marketing' ? 'Marketing Dashboard' : 'Admin Dashboard';


    return (
        <div className="min-h-screen bg-light-gray">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Logo className="h-8 w-8 text-primary" />
                        <h1 className="font-poppins font-bold text-xl text-dark-gray">{dashboardTitle}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">High-Level Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Active Courses"
                        value={courseCount}
                        to="/admin/courses"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
                    />
                    <StatCard
                        title="Services Offered"
                        value={serviceCount}
                        to="/admin/services"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>}
                    />
                    <StatCard
                        title="Hiring Partners"
                        value={partnerCount}
                        to="/admin/partners"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                    />
                    <StatCard
                        title="Contact Submissions"
                        value={leadCount}
                        to="/admin/submissions"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    />
                </div>
                <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6 mt-12">Management & Tools</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Manage Blog"
                        value="Posts"
                        to="/admin/blog"
                        icon={<BlogIcon className="h-6 w-6 text-primary" />}
                    />
                    <StatCard
                        title="AI Content Generator"
                        value="Draft"
                        to="/admin/content-generator"
                        icon={<ContentCreationIcon className="h-6 w-6 text-primary" />}
                    />
                    <StatCard
                        title="Video Generation"
                        value="Create"
                        to="/admin/videos"
                        icon={<VideoIcon className="h-6 w-6 text-primary" />}
                    />
                    <StatCard
                        title="Advanced Analytics"
                        value="View"
                        to="/admin/analytics"
                        icon={<AnalyticsIcon className="h-6 w-6 text-primary" />}
                    />
                 </div>
            </main>
        </div>
    );
};

export default AdminDashboardPage;