import React, { useState } from 'react';

interface CreateHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: { title: string; content: string; category: string; urgency: string }) => void;
}

export default function CreateHelpModal({ isOpen, onClose, onSubmit }: CreateHelpModalProps) {
  const [form, setForm] = useState({ title: '', content: '', category: 'General', urgency: 'Normal' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onSubmit(form);
    setForm({ title: '', content: '', category: 'General', urgency: 'Normal' });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold">Request Help</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Category</label>
            <select 
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
            >
              <option value="General">General</option>
              <option value="Pet Care">Pet Care</option>
              <option value="Home Repair">Home Repair</option>
              <option value="Transportation">Transportation</option>
              <option value="Childcare">Childcare</option>
              <option value="Errands">Errands</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Urgency</label>
            <div className="flex gap-3">
              {['Low', 'Normal', 'High'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm({...form, urgency: level})}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    form.urgency === level 
                      ? level === 'High' 
                        ? 'bg-error-container text-on-error-container' 
                        : 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              type="text"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="e.g., Need a pet sitter for the weekend"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea 
              value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none min-h-[100px] resize-y"
              placeholder="Provide details about what you need help with..."
              required
            />
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <p className="text-xs text-on-surface-variant">AI will match volunteers based on their interests and availability.</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
            Post Request
          </button>
        </form>
      </div>
    </div>
  );
}
