import React, { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
}

interface CommentSectionProps {
  comments: Comment[];
  currentUserInitial: string;
  onSubmit: (text: string) => Promise<void>;
}

export default function CommentSection({ comments, currentUserInitial, onSubmit }: CommentSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      await onSubmit(newComment.trim());
      setNewComment('');
      setExpanded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post the comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-on-surface/5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-bold"
      >
        <span className="material-symbols-outlined text-sm">chat_bubble</span>
        {comments.length} Comments
        <span className="material-symbols-outlined text-sm">{expanded ? 'expand_less' : 'expand_more'}</span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-on-surface-variant">No comments yet. Start the conversation.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-bold shrink-0">
                  {comment.author.charAt(0)}
                </div>
                <div className="grow">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold">{comment.author}</span>
                    <span className="text-[10px] text-on-surface-variant">{comment.time}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">{comment.content}</p>
                </div>
              </div>
            ))
          )}

          {error && (
            <div className="p-3 bg-error-container/10 border border-error/20 rounded-lg text-error text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary text-xs font-bold shrink-0">
              {currentUserInitial}
            </div>
            <div className="grow flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="grow bg-surface-container-highest px-4 py-2 rounded-full text-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="Write a comment..."
              />
              <button
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-bold disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {submitting && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
