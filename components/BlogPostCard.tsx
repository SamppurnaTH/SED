
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogPostCardProps {
    post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    const excerpt = post.content.substring(0, 100) + '...';
    const publishedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Link to={`/blog/${post.slug}`} className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 transform flex flex-col h-full overflow-hidden border border-gray-200">
            <div className="relative">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{post.category}</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-poppins font-bold text-xl text-text-primary group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="mt-2 text-sm text-text-muted flex-grow">{excerpt}</p>
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center">
                    <img src={post.author.imageUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                    <div>
                        <p className="font-semibold text-sm text-text-primary">{post.author.name}</p>
                        <p className="text-xs text-text-muted">{publishedDate}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCard;
