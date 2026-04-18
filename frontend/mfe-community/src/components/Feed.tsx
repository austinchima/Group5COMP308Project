import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import CreatePostModal from './CreatePostModal.tsx';
import CommentSection from './CommentSection.tsx';
import { GET_POSTS, CREATE_POST } from '../graphql/community';

type PostType = 'News' | 'Discussion' | 'Emergency';
type FilterType = 'All' | PostType;

type BackendPost = {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  createdAt?: string;
};

type UiPost = {
  id: string;
  authorName: string;
  type: PostType;
  title: string;
  content: string;
  summary?: string;
  createdAt?: string;
  time: string;
};

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

function typeIcon(type: string): string {
  switch (type) {
    case 'News':
      return 'newspaper';
    case 'Discussion':
      return 'forum';
    case 'Emergency':
      return 'warning';
    default:
      return 'article';
  }
}

const FILTERS: FilterType[] = ['All', 'News', 'Discussion', 'Emergency'];

const filterButtonBase =
  'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200';

function filterActiveClass(filter: FilterType): string {
  switch (filter) {
    case 'News':
      return 'bg-blue-600 text-white shadow-md shadow-blue-200';
    case 'Discussion':
      return 'bg-amber-500 text-white shadow-md shadow-amber-200';
    case 'Emergency':
      return 'bg-red-600 text-white shadow-md shadow-red-200';
    default:
      return 'bg-emerald-800 text-white shadow-md shadow-emerald-200';
  }
}

const filterInactiveClass =
  'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container';

function formatRelativeTime(createdAt?: string): string {
  if (!createdAt) return 'Recently';

  const now = new Date().getTime();
  const created = new Date(createdAt).getTime();
  const diffMs = now - created;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

function getPostTypeFromTags(tags?: string[]): PostType {
  if (!tags || tags.length === 0) return 'Discussion';

  if (tags.includes('Emergency')) return 'Emergency';
  if (tags.includes('News')) return 'News';
  if (tags.includes('Discussion')) return 'Discussion';

  return 'Discussion';
}

export default function Feed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const { data, loading, error } = useQuery(GET_POSTS);

  const [createPost, { loading: creatingPost }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    awaitRefetchQueries: true,
  });

  const posts: UiPost[] = useMemo(() => {
    const rawPosts: BackendPost[] = data?.posts ?? [];

    return rawPosts.map((post) => ({
      id: post.id,
      authorName: post.authorName || 'Unknown User',
      type: getPostTypeFromTags(post.tags),
      title: post.title,
      content: post.content,
      summary: post.summary,
      createdAt: post.createdAt,
      time: formatRelativeTime(post.createdAt),
    }));
  }, [data]);

  const handleNewPost = async (post: { title: string; content: string; type: string }) => {
    try {
      await createPost({
        variables: {
          title: post.title,
          content: post.content,
          tags: [post.type],
        },
      });

      setShowCreatePost(false);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const visiblePosts =
    activeFilter === 'All'
      ? posts
      : posts.filter((p) => p.type === activeFilter);

  return (
    <>
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">
              Community Feed
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Stay updated with local news and join neighborhood discussions.
            </p>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
          >
            New Post
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-1">
          Filter:
        </span>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`${filterButtonBase} ${
              activeFilter === filter
                ? filterActiveClass(filter)
                : filterInactiveClass
            }`}
          >
            {filter !== 'All' && (
              <span className="material-symbols-outlined text-[14px]">
                {typeIcon(filter)}
              </span>
            )}
            {filter}
          </button>
        ))}
        {activeFilter !== 'All' && !loading && (
          <span className="ml-2 text-xs text-on-surface-variant">
            {visiblePosts.length} post{visiblePosts.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="space-y-6 max-w-3xl">
        {loading ? (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-40 animate-pulse">
              hourglass_top
            </span>
            <p className="font-bold text-lg">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-70">
              error
            </span>
            <p className="font-bold text-lg">Could not load posts.</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">
              inbox
            </span>
            <p className="font-bold text-lg">No {activeFilter} posts yet.</p>
            <p className="text-sm mt-1">Be the first to post.</p>
          </div>
        ) : (
          visiblePosts.map((post) => (
            <div
              key={post.id}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-on-surface/5 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{post.authorName}</h4>
                    <p className="text-xs text-on-surface-variant">{post.time}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${typeTagClasses(
                    post.type
                  )}`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {typeIcon(post.type)}
                  </span>
                  {post.type}
                </span>
              </div>

              <h3 className="font-headline text-2xl font-bold mb-2">{post.title}</h3>
              <p className="text-on-surface-variant mb-4">{post.content}</p>

              {post.summary && (
                <div className="bg-surface-container-low p-4 rounded-lg flex gap-3 items-start">
                  <span className="material-symbols-outlined text-tertiary">
                    auto_awesome
                  </span>
                  <div>
                    <p className="text-xs font-bold text-tertiary uppercase mb-1">
                      AI Summary
                    </p>
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

      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleNewPost}
      />

      {creatingPost && (
        <div className="fixed bottom-6 right-6 bg-surface-container-lowest border border-on-surface/10 shadow-lg rounded-full px-4 py-2 text-sm font-medium">
          Creating post...
        </div>
      )}
    </>
  );
}