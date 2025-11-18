
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useBlog } from '../contexts/BlogContext';
import Logo from '../components/icons/Logo';

const AdminBlogPage: React.FC = () => {
    const { logout, adminUser } = useAdminAuth();
    const { posts, deletePost } = useBlog();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const handleDelete = (slug: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete the post "${title}"?`)) {
            deletePost(slug);
        }
    };
    
    const dashboardName = adminUser?.role === 'marketing' ? 'Marketing Dashboard' : 'Admin Dashboard';

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                            <li><span className="font-semibold text-dark-gray">Manage Blog</span></li>
                          </ol>
                        </nav>
                    </div>
                    <button onClick={() => logout()} className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary">
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                        Blog Posts ({posts.length})
                    </h2>
                    <Link to="/admin/blog/new" className="bg-primary text-white font-poppins font-bold py-2 px-5 rounded-lg hover:bg-accent transition-colors shadow-sm">
                        + Add New Post
                    </Link>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col min-h-[400px]">
                    <div className="overflow-x-auto flex-grow">
                        <table className="w-full text-sm text-left text-dark-gray">
                            <thead className="text-xs text-dark-gray/80 uppercase bg-light-gray">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Author</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.length > 0 ? currentPosts.map(post => (
                                    <tr key={post.slug} className="bg-white border-b hover:bg-primary/5">
                                        <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap">{post.title}</th>
                                        <td className="px-6 py-4">{post.author.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(post.publishedDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link to={`/admin/blog/edit/${post.slug}`} className="font-medium text-primary hover:underline">Edit</Link>
                                            <button onClick={() => handleDelete(post.slug, post.title)} className="font-medium text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-10 text-dark-gray/70">No posts found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Controls */}
                    {posts.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                            <span className="text-sm text-dark-gray/70">
                                Showing <span className="font-semibold text-dark-gray">{indexOfFirstPost + 1}</span> to <span className="font-semibold text-dark-gray">{Math.min(indexOfLastPost, posts.length)}</span> of <span className="font-semibold text-dark-gray">{posts.length}</span> entries
                            </span>
                            <div className="flex gap-1">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 rounded border border-gray-300 bg-white text-dark-gray hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-3 py-1 rounded border text-sm font-medium ${
                                            currentPage === i + 1
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-dark-gray border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 rounded border border-gray-300 bg-white text-dark-gray hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminBlogPage;
