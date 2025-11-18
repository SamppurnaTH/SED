
import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import BlogPostCard from './BlogPostCard';

const BlogHighlights: React.FC = () => {
    const { posts } = useBlog();
    const latestPosts = posts.slice(0, 3);

    return (
        <section className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl text-text-primary">
                        Latest from the Blog
                    </h2>
                    <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
                        Stay updated with the latest industry trends, success stories, and academy news.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map(post => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        to="/blog"
                        className="bg-primary text-white font-poppins font-bold py-3 px-8 rounded-lg hover:bg-accent hover:scale-105 hover:shadow-xl transition-all duration-300 transform"
                    >
                        View All Posts
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogHighlights;
