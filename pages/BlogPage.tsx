
import React, { useState } from 'react';
import { useBlog } from '../contexts/BlogContext';
import BlogPostCard from '../components/BlogPostCard';
import MetaTags from '../components/MetaTags';

const BlogPage: React.FC = () => {
    const { posts } = useBlog();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(posts.map(p => p.category))];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <MetaTags
                title="Blog | SED Tech Academy"
                description="Stay updated with the latest industry trends, success stories, and academy news from SED Tech Academy."
            />
            <section className="bg-secondary pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl text-text-primary">The SED Blog</h1>
                    <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                        Industry insights, student success stories, and the latest news from the world of tech.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
                        <div className="relative flex-grow max-w-lg">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-5 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                             {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`font-poppins font-semibold py-2 px-5 rounded-full border-2 transition-all duration-300 ${
                                        selectedCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-text-primary border-gray-300 hover:border-primary'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(post => (
                                <BlogPostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                             <h3 className="font-poppins font-bold text-2xl text-text-primary">No Articles Found</h3>
                             <p className="mt-2 text-text-muted">Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default BlogPage;
