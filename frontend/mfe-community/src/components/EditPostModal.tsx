import React, { useState, useEffect } from 'react';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: { id: string; title: string; content: string } | null;
  onSubmit: (id: string, title: string, content: string) => Promise<void> | void;
}

export default function EditPostModal({ isOpen, onClose, post, onSubmit }: EditPostModalProps) {
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setForm({ title: post.title, content: post.content });
      setError('');
    }
  }, [post]);

  if (!isOpen || !post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(post.id, form.title.trim(), form.content.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not edit the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold">Edit Post</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container-highest">
            <span className="material-symbols-outlined text-xl block">close</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-error/10 text-error p-4 rounded-xl text-sm font-bold flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Post Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-surface-container px-4 py-3 rounded-xl border border-on-surface/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
              placeholder="What's happening in your neighborhood?"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Content</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full bg-surface-container px-4 py-3 rounded-xl border border-on-surface/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface resize-none min-h-[160px]"
              placeholder="Share updates, discuss issues, or post local news here..."
              maxLength={1000}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 bg-surface-container-highest text-on-surface font-bold rounded-full hover:bg-on-surface/10 active:scale-95 transition-all text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !form.title.trim() || !form.content.trim()}
              className="px-6 py-3 bg-linear-to-r from-primary to-primary-dim text-on-primary font-bold rounded-full hover:brightness-110 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
