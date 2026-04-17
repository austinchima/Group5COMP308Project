import React, { useState } from 'react';

interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deal: { title: string; description: string; discount: string; expiry: string }) => void;
}

export default function CreateDealModal({ isOpen, onClose, onSubmit }: CreateDealModalProps) {
  const [form, setForm] = useState({ title: '', description: '', discount: '', expiry: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onSubmit(form);
    setForm({ title: '', description: '', discount: '', expiry: '' });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary">local_offer</span>
            <h2 className="font-headline text-2xl font-bold">Create Deal</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Deal Title</label>
            <input 
              type="text"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="e.g., Spring Sale"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Discount / Offer</label>
            <input 
              type="text"
              value={form.discount}
              onChange={e => setForm({...form, discount: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="e.g., 20% off all indoor plants"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea 
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none min-h-[80px] resize-y"
              placeholder="Details about this promotion..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Expires</label>
            <input 
              type="date"
              value={form.expiry}
              onChange={e => setForm({...form, expiry: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-tertiary to-tertiary-dim text-on-tertiary py-3 rounded-full font-bold shadow-lg shadow-tertiary/20 active:scale-95 duration-200 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-tertiary/30 border-t-on-tertiary rounded-full animate-spin"></div>}
            Publish Deal
          </button>
        </form>
      </div>
    </div>
  );
}
