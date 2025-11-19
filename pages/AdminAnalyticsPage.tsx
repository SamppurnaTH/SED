import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useCourses } from '../contexts/CoursesContext';
import { useContactSubmissions } from '../contexts/ContactSubmissionsContext';
import Logo from '../components/icons/Logo';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import { AnalyticsIcon } from '../components/icons/AdminIcons';
import { API_URL } from '../constants';

interface BackendOrder {
    _id: string;
    amount: number;
    status: string;
    course: {
        name: string;
        slug: string;
    };
    user: {
        name: string;
        email: string;
    };
    createdAt: string;
    orderId: string;
}

const StatCard: React.FC<{ title: string; value: string; subtext?: string; icon: React.ReactNode; }> = ({ title, value, subtext, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
        <div className="bg-primary/10 p-3 rounded-full mt-1">
            {icon}
        </div>
        <div>
            <p className="text-sm text-dark-gray/70">{title}</p>
            <p className="text-3xl font-bold text-dark-gray">{value}</p>
            {subtext && <p className="text-xs text-dark-gray/60">{subtext}</p>}
        </div>
    </div>
);


const AdminAnalyticsPage: React.FC = () => {
    const { logout, adminUser } = useAdminAuth();
    const navigate = useNavigate();
    const { courses } = useCourses();
    const { submissions } = useContactSubmissions();
    const [orders, setOrders] = useState<BackendOrder[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_URL}/orders`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, []);
    
    // --- METRIC CALCULATIONS ---

    // 1. Overview Stats from Real Data
    const totalEnrollments = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const newSubmissions = submissions.filter(s => new Date(s.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;

    // 2. Course Popularity Data (from Real Orders)
    const coursePopularity = courses.map(course => {
        const enrollmentCount = orders.filter(o => o.course?.slug === course.slug).length;
        return { label: course.name, value: enrollmentCount };
    }).sort((a, b) => b.value - a.value);

    // 3. Submissions Over Time Data
    const submissionsByDay: { [key: string]: number } = {};
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        submissionsByDay[dateString] = 0;
    }
    submissions.forEach(sub => {
        const dateString = new Date(sub.submittedAt).toISOString().split('T')[0];
        if (submissionsByDay[dateString] !== undefined) {
            submissionsByDay[dateString]++;
        }
    });
    const submissionTrendData = Object.entries(submissionsByDay).map(([date, count]) => ({
        label: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: count,
    }));
    

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
                            <li><span className="font-semibold text-dark-gray">Analytics</span></li>
                          </ol>
                        </nav>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-3xl font-poppins font-semibold text-dark-gray mb-6">Business Analytics</h2>
                
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard 
                        title="Total Revenue"
                        value={`₹${(totalRevenue / 100000).toFixed(2)}L`}
                        icon={<AnalyticsIcon className="h-6 w-6 text-primary" />}
                    />
                    <StatCard 
                        title="Total Enrollments"
                        value={loadingOrders ? "..." : totalEnrollments.toLocaleString()}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    />
                     <StatCard 
                        title="New Leads"
                        value={newSubmissions.toLocaleString()}
                        subtext="in last 7 days"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    />
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                         <h3 className="font-poppins font-bold text-xl text-dark-gray mb-4">Course Sales (By Volume)</h3>
                         <BarChart data={coursePopularity} />
                    </div>
                     <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                         <h3 className="font-poppins font-bold text-xl text-dark-gray mb-4">Contact Submissions (Last 30 Days)</h3>
                         <LineChart data={submissionTrendData} />
                    </div>
                </div>
                
                {/* Recent Orders Table */}
                <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
                    <h3 className="p-6 font-poppins font-bold text-xl text-dark-gray border-b border-gray-100">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-dark-gray">
                            <thead className="text-xs text-dark-gray/80 uppercase bg-light-gray">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Student</th>
                                    <th className="px-6 py-3">Course</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map(order => (
                                    <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-xs">{order.orderId}</td>
                                        <td className="px-6 py-4">{order.user?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4">{order.course?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4">₹{order.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{order.status}</span>
                                        </td>
                                        <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan={6} className="text-center py-4">No orders found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default AdminAnalyticsPage;