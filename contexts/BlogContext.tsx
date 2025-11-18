
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { BlogPost } from '../types';
import { blogPosts as staticBlogPosts, API_URL } from '../constants';

interface BlogContextType {
  posts: BlogPost[];
  getPostBySlug: (slug: string) => BlogPost | undefined;
  addPost: (post: BlogPost) => Promise<void>;
  updatePost: (slug: string, updatedPost: BlogPost) => Promise<void>;
  deletePost: (slug: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/blog`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.info("Using static blog data (Backend offline).");
            setPosts(staticBlogPosts);
        }
    };
    fetchPosts();
  }, []);

  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  const addPost = async (post: BlogPost) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/blog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(post),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setPosts(prev => [data, ...prev]);
    } catch (error: any) {
        alert(`Error adding post: ${error.message}`);
        throw error;
    }
  };

  const updatePost = async (slug: string, updatedPost: BlogPost) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/blog/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(updatedPost),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setPosts(prev => prev.map(p => (p.slug === slug ? data : p)));
    } catch (error: any) {
        alert(`Error updating post: ${error.message}`);
        throw error;
    }
  };

  const deletePost = async (slug: string) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/blog/${slug}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
             const data = await response.json();
             throw new Error(data.message);
        }
        setPosts(prev => prev.filter(p => p.slug !== slug));
    } catch (error: any) {
        alert(`Error deleting post: ${error.message}`);
        throw error;
    }
  };


  return (
    <BlogContext.Provider value={{ posts, getPostBySlug, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
