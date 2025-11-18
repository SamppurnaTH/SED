
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import MetaTags from '../components/MetaTags';
import BlogPostCard from '../components/BlogPostCard';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, getPostBySlug } = useBlog();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = posts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);
  
  const publishedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });

  return (
    <>
      <MetaTags
        title={`${post.title} | SED Blog`}
        description={post.content.substring(0, 150) + '...'}
        imageUrl={post.imageUrl}
      />
      <div className="bg-background pt-32 pb-20 lg:pt-40">
        <div className="container mx-auto px-6 max-w-4xl">
          <article>
            <header className="text-center mb-12">
              <p className="text-primary font-bold uppercase tracking-wider">{post.category}</p>
              <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-text-primary mt-4">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center justify-center gap-4">
                <img src={post.author.imageUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                  <p className="font-semibold text-text-primary">{post.author.name}</p>
                  <p className="text-sm text-text-muted">{publishedDate}</p>
                </div>
              </div>
            </header>

            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
            />

            <div 
              className="prose prose-lg lg:prose-xl max-w-none mx-auto mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-card border border-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <h2 className="font-poppins font-bold text-3xl text-text-primary text-center mb-12">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map(related => (
                <BlogPostCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPostPage;
