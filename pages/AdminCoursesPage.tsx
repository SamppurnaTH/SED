import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useCourses } from '../contexts/CoursesContext';
import Logo from '../components/icons/Logo';

const AdminCoursesPage: React.FC = () => {
    const { logout } = useAdminAuth();
    const { courses, deleteCourse } = useCourses();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleDelete = (slug: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete the course "${name}"? This action cannot be undone.`)) {
            deleteCourse(slug);
        }
    }

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
                            <li><span className="font-semibold text-dark-gray">Manage Courses</span></li>
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
                        Courses ({courses.length})
                    </h2>
                    <Link
                        to="/admin/courses/new"
                        className="bg-primary text-white font-poppins font-bold py-2 px-5 rounded-lg hover:bg-accent transition-all duration-300 shadow-sm"
                    >
                        + Add New Course
                    </Link>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-dark-gray">
                            <thead className="text-xs text-dark-gray/80 uppercase bg-light-gray">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Course Name</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Tagline</th>
                                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? courses.map(course => (
                                    <tr key={course.slug} className="bg-white border-b hover:bg-primary/5">
                                        <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap">
                                            {course.name}
                                        </th>
                                        <td className="px-6 py-4">{course.category}</td>
                                        <td className="px-6 py-4 max-w-sm truncate">
                                            {course.tagline}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link to={`/admin/courses/edit/${course.slug}`} className="font-medium text-primary hover:underline">Edit</Link>
                                            <button onClick={() => handleDelete(course.slug, course.name)} className="font-medium text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-10 text-dark-gray/70">
                                            No courses found. Click "Add New Course" to get started.
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

export default AdminCoursesPage;