import React, { useEffect, useMemo, useState } from "react";
import CreatePostModal from "./CreatePostModal.tsx";
import EditPostModal from "./EditPostModal.tsx";
import CommentSection from "./CommentSection.tsx";

type PostType = "News" | "Discussion" | "Emergency";
type FilterType = "All" | PostType;

interface BackendComment {
  id?: string;
  userName: string;
  text: string;
  createdAt?: string;
}

interface BackendPost {
  id: string;
  authorId?: string;
  authorName: string;
  title: string;
  content: string;
  summary?: string | null;
  tags?: string[] | null;
  createdAt?: string;
  comments?: BackendComment[] | null;
}

interface FeedComment {
  id: string;
  author: string;
  content: string;
  time: string;
}

interface FeedPost {
  id: string;
  authorId: string;
  author: string;
  type: PostType;
  title: string;
  content: string;
  summary: string;
  time: string;
  comments: FeedComment[];
}

const API_URL = "http://localhost:4000/graphql";
const FILTERS: FilterType[] = ["All", "News", "Discussion", "Emergency"];

const POSTS_QUERY = `
  query GetPosts {
    posts {
      id
      authorId
      authorName
      title
      content
      summary
      tags
      createdAt
      comments {
        id
        userName
        text
        createdAt
      }
    }
  }
`;

const CREATE_POST_MUTATION = `
  mutation CreatePost($title: String!, $content: String!, $tags: [String]) {
    createPost(title: $title, content: $content, tags: $tags) {
      id
      authorName
      title
      content
      summary
      tags
      createdAt
      comments {
        id
        userName
        text
        createdAt
      }
    }
  }
`;

const ADD_COMMENT_MUTATION = `
  mutation AddComment($postId: ID!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      comments {
        id
        userName
        text
        createdAt
      }
    }
  }
`;

const SUMMARIZE_DISCUSSION_MUTATION = `
  mutation SummarizeDiscussion($text: String!) {
    summarizeDiscussion(text: $text)
  }
`;

const UPDATE_SUMMARY_MUTATION = `
  mutation UpdatePostSummary($postId: ID!, $summary: String!) {
    updatePostSummary(postId: $postId, summary: $summary) {
      id
      summary
    }
  }
`;

const EDIT_POST_MUTATION = `
  mutation EditPost($postId: ID!, $title: String!, $content: String!) {
    editPost(postId: $postId, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  requiresAuth = false,
) {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "GraphQL request failed.");
  }

  return payload.data as T;
}

function typeTagClasses(type: PostType): string {
  switch (type) {
    case "News":
      return "bg-blue-100 text-blue-800";
    case "Discussion":
      return "bg-amber-100 text-amber-800";
    case "Emergency":
      return "bg-red-100 text-red-800";
    default:
      return "bg-surface-container text-on-primary-container";
  }
}

function typeIcon(type: PostType): string {
  switch (type) {
    case "News":
      return "newspaper";
    case "Discussion":
      return "forum";
    case "Emergency":
      return "warning";
    default:
      return "article";
  }
}

const filterButtonBase =
  "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200";

function filterActiveClass(filter: FilterType): string {
  switch (filter) {
    case "News":
      return "bg-blue-600 text-white shadow-md shadow-blue-200";
    case "Discussion":
      return "bg-amber-500 text-white shadow-md shadow-amber-200";
    case "Emergency":
      return "bg-red-600 text-white shadow-md shadow-red-200";
    default:
      return "bg-emerald-800 text-white shadow-md shadow-emerald-200";
  }
}

const filterInactiveClass =
  "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container";

function getCurrentUserName() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "You";
    const parsed = JSON.parse(raw) as { name?: string };
    return parsed.name?.trim() || "You";
  } catch {
    return "You";
  }
}

function formatRelativeTime(dateString?: string) {
  if (!dateString) return "Just now";

  const created = new Date(dateString).getTime();
  if (Number.isNaN(created)) return "Just now";

  const diffMs = Date.now() - created;
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function inferType(tags?: string[] | null): PostType {
  const normalized = (tags ?? []).map((tag) => tag.toLowerCase());
  if (normalized.includes("emergency")) return "Emergency";
  if (normalized.includes("news")) return "News";
  return "Discussion";
}

function mapComment(comment: BackendComment, index: number): FeedComment {
  return {
    id: comment.id ?? `${comment.userName}-${index}`,
    author: comment.userName,
    content: comment.text,
    time: formatRelativeTime(comment.createdAt),
  };
}

function getCurrentUserId() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "";
    const parsed = JSON.parse(raw) as { id?: string };
    return parsed.id?.trim() || "";
  } catch {
    return "";
  }
}

function mapPost(post: BackendPost): FeedPost {
  return {
    id: post.id,
    authorId: post.authorId || "",
    author: post.authorName,
    type: inferType(post.tags),
    title: post.title,
    content: post.content,
    summary: post.summary?.trim() ?? "",
    time: formatRelativeTime(post.createdAt),
    comments: (post.comments ?? []).map(mapComment),
  };
}

export default function Feed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPost, setEditingPost] = useState<FeedPost | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUserName = useMemo(() => getCurrentUserName(), []);
  const currentUserId = useMemo(() => getCurrentUserId(), []);
  const currentUserInitial = currentUserName.charAt(0).toUpperCase();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await graphqlRequest<{ posts: BackendPost[] }>(
          POSTS_QUERY,
        );
        setPosts(data.posts.map(mapPost));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not load the feed.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadPosts();
  }, []);

  const refreshPostSummary = async (postId: string, text: string) => {
    try {
      const summaryData = await graphqlRequest<{ summarizeDiscussion: string }>(
        SUMMARIZE_DISCUSSION_MUTATION,
        {
          text,
        },
      );

      const summary = summaryData.summarizeDiscussion?.trim();
      if (!summary) return;

      await graphqlRequest(UPDATE_SUMMARY_MUTATION, { postId, summary }, true);
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                summary,
              }
            : post,
        ),
      );
    } catch {
      // Leave the post visible even if AI enrichment is unavailable.
    }
  };

  const handleNewPost = async (post: {
    title: string;
    content: string;
    type: string;
  }) => {
    const data = await graphqlRequest<{ createPost: BackendPost }>(
      CREATE_POST_MUTATION,
      {
        title: post.title,
        content: post.content,
        tags: [post.type],
      },
      true,
    );

    const createdPost = mapPost(data.createPost);
    setPosts((currentPosts) => [createdPost, ...currentPosts]);
    void refreshPostSummary(createdPost.id, post.content);
  };

  const handleEditPost = async (id: string, title: string, content: string) => {
    const data = await graphqlRequest<{ editPost: BackendPost }>(
      EDIT_POST_MUTATION,
      { postId: id, title, content },
      true,
    );

    const updatedPost = mapPost(data.editPost);
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === id ? updatedPost : post))
    );
    void refreshPostSummary(id, content);
  };

  const handleAddComment = async (postId: string, text: string) => {
    const data = await graphqlRequest<{
      addComment: { id: string; comments: BackendComment[] };
    }>(ADD_COMMENT_MUTATION, { postId, text }, true);

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: data.addComment.comments.map(mapComment),
            }
          : post,
      ),
    );
  };

  const visiblePosts =
    activeFilter === "All"
      ? posts
      : posts.filter((post) => post.type === activeFilter);

  return (
    <>
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">
              Community Feed
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Stay updated with local news and join neighborhood discussions
              through the live GraphQL community feed.
            </p>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-linear-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
          >
            New Post
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container/10 border border-error/20 rounded-lg text-error text-sm font-medium flex items-center gap-2 max-w-3xl">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-1">
          Filter:
        </span>
        {FILTERS.map((filter) => {
          const count =
            filter === "All"
              ? posts.length
              : posts.filter((p) => p.type === filter).length;
          const isEmergency = filter === "Emergency";
          const badgeClass = isEmergency
            ? "bg-red-500 text-white shadow-sm"
            : activeFilter === filter
              ? "bg-white/20 text-white"
              : "bg-surface-variant text-on-surface-variant";

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`${filterButtonBase} ${
                activeFilter === filter
                  ? filterActiveClass(filter)
                  : filterInactiveClass
              }`}
            >
              {filter !== "All" && (
                <span className="material-symbols-outlined text-[14px]">
                  {typeIcon(filter)}
                </span>
              )}
              {filter}
              <span
                className={`ml-1 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold rounded-full ${badgeClass}`}
              >
                {count}
              </span>
            </button>
          );
        })}
        {activeFilter !== "All" && (
          <span className="ml-2 text-xs text-on-surface-variant">
            {visiblePosts.length} post{visiblePosts.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="space-y-6 max-w-3xl">
        {loading ? (
          <div className="text-center py-16 text-on-surface-variant">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-bold text-lg">Loading live community posts…</p>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">
              inbox
            </span>
            <p className="font-bold text-lg">No {activeFilter} posts yet.</p>
            <p className="text-sm mt-1">Be the first to post!</p>
          </div>
        ) : (
          visiblePosts.map((post) => (
            <div
              key={post.id}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-on-surface/5 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{post.author}</h4>
                    <p className="text-xs text-on-surface-variant">
                      {post.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${typeTagClasses(post.type)}`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {typeIcon(post.type)}
                  </span>
                  {post.type}
                </span>
              </div>

              <h3 className="font-headline text-2xl font-bold mb-2">
                {post.title}
              </h3>
              <p className="text-on-surface-variant mb-4">{post.content}</p>

              {post.summary && (
                <div className="bg-surface-container-low p-4 rounded-lg flex gap-3 items-start">
                  <span className="material-symbols-outlined text-tertiary">
                    auto_awesome
                  </span>
                  <div className="grow">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-bold text-tertiary uppercase">
                        AI Summary
                      </p>
                      {post.summary.includes("generated") && (
                        <button
                          onClick={() =>
                            refreshPostSummary(post.id, post.content)
                          }
                          className="flex items-center gap-1 text-xs text-primary font-bold hover:underline transition-all"
                          title="Retry AI Summary"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            refresh
                          </span>
                          Retry
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      {post.summary}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-on-surface/5 flex gap-4">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    thumb_up
                  </span>
                  <span className="text-sm font-bold">Like</span>
                </button>
                {post.authorId === currentUserId && currentUserId !== "" && (
                  <button
                    onClick={() => setEditingPost(post)}
                    className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                    <span className="text-sm font-bold">Edit</span>
                  </button>
                )}
              </div>

              <CommentSection
                comments={post.comments}
                currentUserInitial={currentUserInitial}
                onSubmit={(text) => handleAddComment(post.id, text)}
              />
            </div>
          ))
        )}
      </div>

      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleNewPost}
      />
      
      <EditPostModal
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
        post={editingPost}
        onSubmit={handleEditPost}
      />
    </>
  );
}
