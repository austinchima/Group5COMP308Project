import React, { useState } from 'react';
import CreatePostModal from './CreatePostModal.tsx';
import CommentSection from './CommentSection.tsx';

type PostType = 'News' | 'Discussion' | 'Emergency';
type FilterType = 'All' | PostType;

/** Returns Tailwind classes for the type badge based on post type */
function typeTagClasses(type: string): string {
  switch (type) {
    case 'News':
      return 'bg-blue-100 text-blue-800';
    case 'Discussion':
      return 'bg-amber-100 text-amber-800';
    case 'Emergency':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-surface-container text-on-primary-container';
  }
}

/** Returns the icon name for each post type */
function typeIcon(type: string): string {
  switch (type) {
    case 'News':        return 'newspaper';
    case 'Discussion':  return 'forum';
    case 'Emergency':   return 'warning';
    default:            return 'article';
  }
}

const FILTERS: FilterType[] = ['All', 'News', 'Discussion', 'Emergency'];

const filterButtonBase =
  'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200';

function filterActiveClass(filter: FilterType): string {
  switch (filter) {
    case 'News':       return 'bg-blue-600 text-white shadow-md shadow-blue-200';
    case 'Discussion': return 'bg-amber-500 text-white shadow-md shadow-amber-200';
    case 'Emergency':  return 'bg-red-600 text-white shadow-md shadow-red-200';
    default:           return 'bg-emerald-800 text-white shadow-md shadow-emerald-200';
  }
}

const filterInactiveClass = 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container';

export default function Feed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Jenkins',
      type: 'News' as PostType,
      title: 'New Community Garden Opening',
      content: 'We are thrilled to announce the opening of the new community garden on 5th street. Come join us this weekend for the opening ceremony!',
      summary: 'A new community garden is opening on 5th street this weekend.',
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'Mike Ross',
      type: 'Discussion' as PostType,
      title: 'Thoughts on the new parking rules?',
      content: 'Has anyone seen the new parking rules posted downtown? I feel like they are a bit too restrictive during the weekends. What does everyone else think?',
      summary: 'Discussion about the new downtown parking rules being too restrictive on weekends.',
      time: '5 hours ago',
    },
  ]);

  const handleNewPost = (post: { title: string; content: string; type: string }) => {
    setPosts([{
      id: Date.now(),
      author: 'You',
      type: post.type as PostType,
      title: post.title,
      content: post.content,
      summary: `AI-generated summary: ${post.content.slice(0, 80)}...`,
      time: 'Just now',
    }, ...posts]);
  };

  const visiblePosts = activeFilter === 'All'
    ? posts
    : posts.filter(p => p.type === activeFilter);

  return (
    <>
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">Community Feed</h1>
            <p className="text-on-surface-variant max-w-xl text-lg">Stay updated with local news and join neighborhood discussions.</p>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
          >
            New Post
          </button>
        </div>
      </header>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-1">Filter:</span>
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`${filterButtonBase} ${activeFilter === filter ? filterActiveClass(filter) : filterInactiveClass}`}
          >
            {filter !== 'All' && (
              <span className="material-symbols-outlined text-[14px]">{typeIcon(filter)}</span>
            )}
            {filter}
          </button>
        ))}
        {activeFilter !== 'All' && (
          <span className="ml-2 text-xs text-on-surface-variant">
            {visiblePosts.length} post{visiblePosts.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="space-y-6 max-w-3xl">
        {visiblePosts.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">inbox</span>
            <p className="font-bold text-lg">No {activeFilter} posts yet.</p>
            <p className="text-sm mt-1">Be the first to post!</p>
          </div>
        ) : (
          visiblePosts.map(post => (
            <div key={post.id} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-on-surface/5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{post.author}</h4>
                    <p className="text-xs text-on-surface-variant">{post.time}</p>
                  </div>
                </div>
                {/* Color-coded type badge */}
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${typeTagClasses(post.type)}`}>
                  <span className="material-symbols-outlined text-[13px]">{typeIcon(post.type)}</span>
                  {post.type}
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-2">{post.title}</h3>
              <p className="text-on-surface-variant mb-4">{post.content}</p>

              {post.summary && (
                <div className="bg-surface-container-low p-4 rounded-lg flex gap-3 items-start">
                  <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                  <div>
                    <p className="text-xs font-bold text-tertiary uppercase mb-1">AI Summary</p>
                    <p className="text-sm text-on-surface-variant">{post.summary}</p>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-on-surface/5 flex gap-4">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">thumb_up</span>
                  <span className="text-sm font-bold">Like</span>
                </button>
              </div>

              <CommentSection postId={post.id} />
            </div>
          ))
        )}
      </div>

      <CreatePostModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} onSubmit={handleNewPost} />
    </>
  );
}
