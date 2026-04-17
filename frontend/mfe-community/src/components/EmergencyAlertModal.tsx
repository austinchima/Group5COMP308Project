import React, { useState } from 'react';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alert: { title: string; content: string; type: string; location: string }) => void;
}

export default function EmergencyAlertModal({ isOpen, onClose, onSubmit }: EmergencyAlertModalProps) {
  const [form, setForm] = useState({ title: '', content: '', type: 'Safety', location: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onSubmit(form);
    setForm({ title: '', content: '', type: 'Safety', location: '' });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-error-container">warning</span>
            </div>
            <h2 className="font-headline text-2xl font-bold text-error">Emergency Alert</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mb-4 p-3 bg-error-container/10 border border-error/20 rounded-lg text-error text-sm">
          <strong>Important:</strong> This alert will be sent to all nearby community members. Use only for genuine emergencies.
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Alert Type</label>
            <select 
              value={form.type}
              onChange={e => setForm({...form, type: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-error/40 outline-none"
            >
              <option value="Safety">Safety Alert</option>
              <option value="Missing Pet">Missing Pet</option>
              <option value="Infrastructure">Infrastructure Issue</option>
              <option value="Weather">Weather Warning</option>
              <option value="Crime">Crime Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              type="text"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-error/40 outline-none"
              placeholder="e.g., Missing Golden Retriever"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Location</label>
            <input 
              type="text"
              value={form.location}
              onChange={e => setForm({...form, location: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-error/40 outline-none"
              placeholder="Near central park, Oak Street"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea 
              value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-error/40 outline-none min-h-[100px] resize-y"
              placeholder="Provide as much detail as possible..."
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-error text-on-error py-3 rounded-full font-bold shadow-lg shadow-error/20 active:scale-95 duration-200 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-error/30 border-t-on-error rounded-full animate-spin"></div>}
            <span className="material-symbols-outlined text-sm">campaign</span>
            Broadcast Alert
          </button>
        </form>
      </div>
    </div>
  );
}
