
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useContactSubmissions } from '../contexts/ContactSubmissionsContext';
import Logo from '../components/icons/Logo';
import { ContactSubmission } from '../types';

const AdminSubmissionsPage: React.FC = () => {
    const { logout, adminUser } = useAdminAuth();
    const { submissions } = useContactSubmissions();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };
    
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }

    const exportToCSV = () => {
        const headers = ['ID', 'Submitted At', 'Name', 'Email', 'Subject', 'Message'];
        const rows = submissions.map(s => [
            s.id,
            formatDate(s.submittedAt),
            `"${s.name.replace(/"/g, '""')}"`,
            `"${s.email.replace(/"/g, '""')}"`,
            `"${s.subject.replace(/"/g, '""')}"`,
            `"${s.message.replace(/"/g, '""')}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `sed-contact-submissions-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            <li><span className="font-semibold text-dark-gray">Contact Submissions</span></li>
                          </ol>
                        </nav>
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                        Contact Submissions ({submissions.length})
                    </h2>
                    <button
                        onClick={exportToCSV}
                        disabled={submissions.length === 0}
                        className="bg-secondary text-primary font-poppins font-bold py-2 px-5 rounded-lg hover:bg-secondary/80 transition-all duration-300 shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Export to CSV
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-dark-gray">
                            <thead className="text-xs text-dark-gray/80 uppercase bg-light-gray">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Subject</th>
                                    <th scope="col" className="px-6 py-3">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.length > 0 ? submissions.map(sub => (
                                    <tr key={sub.id} className="bg-white border-b hover:bg-primary/5">
                                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(sub.submittedAt)}</td>
                                        <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap">
                                            {sub.name}
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">{sub.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{sub.subject || '-'}</td>
                                        <td className="px-6 py-4 max-w-sm truncate" title={sub.message}>
                                            {sub.message}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-dark-gray/70">
                                            No contact submissions yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminSubmissionsPage;
