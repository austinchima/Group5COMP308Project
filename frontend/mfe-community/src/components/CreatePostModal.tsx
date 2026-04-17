import React, { useState } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string; type: string }) => void;
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [form, setForm] = useState({ title: '', content: '', type: 'News' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onSubmit(form);
    setForm({ title: '', content: '', type: 'News' });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold">Create Post</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Post Type</label>
            <select 
              value={form.type}
              onChange={e => setForm({...form, type: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
            >
              <option value="News">News</option>
              <option value="Discussion">Discussion</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              type="text"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="What's happening in the neighborhood?"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Content</label>
            <textarea 
              value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none min-h-[120px] resize-y"
              placeholder="Share details, updates, or start a conversation..."
              required
            />
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
            <p className="text-xs text-on-surface-variant">AI will auto-generate a summary of your post for quick reading.</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
