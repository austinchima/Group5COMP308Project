import React, { useState } from 'react';

interface ReviewReplyFormProps {
  reviewAuthor: string;
  onSubmit: (reply: string) => void;
}

export default function ReviewReplyForm({ reviewAuthor, onSubmit }: ReviewReplyFormProps) {
  const [reply, setReply] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    onSubmit(reply);
    setSubmitted(true);
    setIsOpen(false);
  };

  if (submitted) {
    return (
      <div className="mt-2 p-3 bg-primary-container/20 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
          <p className="text-xs text-primary font-bold">Business Owner Reply</p>
        </div>
        <p className="text-sm text-on-surface-variant mt-1">{reply}</p>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="mt-2 text-xs text-primary font-bold hover:underline flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-xs">reply</span>
        Reply to {reviewAuthor}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <textarea 
        value={reply}
        onChange={e => setReply(e.target.value)}
        className="w-full bg-surface-container-highest px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/40 outline-none min-h-[60px] resize-y"
        placeholder={`Respond to ${reviewAuthor}...`}
        autoFocus
      />
      <div className="flex gap-2 justify-end">
        <button 
          type="button" 
          onClick={() => { setIsOpen(false); setReply(''); }}
          className="px-3 py-1 text-sm text-on-surface-variant font-bold hover:underline"
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={!reply.trim()}
          className="px-4 py-1 bg-primary text-on-primary text-sm font-bold rounded-full disabled:opacity-40 active:scale-95 transition-all"
        >
          Reply
        </button>
      </div>
    </form>
  );
}
