import React, { useState } from 'react';

interface CreateBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (business: { name: string; category: string; description: string; contact: string }) => void;
}

export default function CreateBusinessModal({ isOpen, onClose, onSubmit }: CreateBusinessModalProps) {
  const [form, setForm] = useState({ name: '', category: 'Retail', description: '', contact: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onSubmit(form);
    setForm({ name: '', category: 'Retail', description: '', contact: '' });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold">List Your Business</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Business Name</label>
            <input 
              type="text"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="Your business name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Category</label>
            <select 
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
            >
              <option value="Retail">Retail</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Services">Services</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea 
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none min-h-[100px] resize-y"
              placeholder="Tell the community about your business..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Contact Info</label>
            <input 
              type="text"
              value={form.contact}
              onChange={e => setForm({...form, contact: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="Phone, email, or website"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
            List Business
          </button>
        </form>
      </div>
    </div>
  );
}
