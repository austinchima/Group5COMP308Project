import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

interface CommentSectionProps {
  postId: number | string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Anna M.', content: 'This is great news! Looking forward to it.', time: '1 hour ago' },
    { id: 2, author: 'David K.', content: 'Will there be parking available?', time: '45 min ago' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, {
      id: Date.now(),
      author: 'You',
      content: newComment,
      time: 'Just now',
    }]);
    setNewComment('');
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
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-bold shrink-0">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold">{comment.author}</span>
                  <span className="text-[10px] text-on-surface-variant">{comment.time}</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">{comment.content}</p>
              </div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary text-xs font-bold shrink-0">
              Y
            </div>
            <div className="flex-grow flex gap-2">
              <input 
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="flex-grow bg-surface-container-highest px-4 py-2 rounded-full text-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="Write a comment..."
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-bold disabled:opacity-40 active:scale-95 transition-all"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
