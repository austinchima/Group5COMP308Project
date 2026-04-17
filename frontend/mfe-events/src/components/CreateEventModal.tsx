import React, { useState } from 'react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: { title: string; description: string; date: string; time: string; location: string; capacity: string; category: string }) => void;
}

export default function CreateEventModal({ isOpen, onClose, onSubmit }: CreateEventModalProps) {
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', capacity: '', category: 'Workshop' });
  const [loading, setLoading] = useState(false);
  const [showAiTip, setShowAiTip] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onSubmit(form);
    setForm({ title: '', description: '', date: '', time: '', location: '', capacity: '', category: 'Workshop' });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold">Create Event</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Event Title</label>
            <input 
              type="text"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="e.g., Community Garden Planting Day"
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
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Clean-up Drive">Clean-up Drive</option>
              <option value="Festival">Festival</option>
              <option value="Fundraiser">Fundraiser</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Date</label>
              <input 
                type="date"
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Time</label>
              <input 
                type="time"
                value={form.time}
                onChange={e => setForm({...form, time: e.target.value})}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Location</label>
            <input 
              type="text"
              value={form.location}
              onChange={e => setForm({...form, location: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="Community hall, Park, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Max Capacity</label>
            <input 
              type="number"
              value={form.capacity}
              onChange={e => setForm({...form, capacity: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="50"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea 
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none min-h-[80px] resize-y"
              placeholder="What will attendees experience?"
              required
            />
          </div>

          {/* AI Timing Suggestion */}
          <button 
            type="button"
            onClick={() => setShowAiTip(!showAiTip)}
            className="w-full bg-surface-container-high p-4 rounded-lg flex items-center gap-3 hover:bg-surface-container transition-colors text-left"
          >
            <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-tertiary">Get AI Timing Suggestion</span>
            <span className="material-symbols-outlined text-sm text-on-surface-variant ml-auto">{showAiTip ? 'expand_less' : 'expand_more'}</span>
          </button>
          {showAiTip && (
            <div className="bg-surface-container-low p-4 rounded-lg border border-tertiary/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-sm">auto_awesome</span>
                <p className="text-xs font-bold text-tertiary uppercase">Smart Timing AI</p>
              </div>
              <p className="text-sm text-on-surface-variant">Based on local engagement patterns, <strong>Saturday mornings (10 AM – 1 PM)</strong> have the highest attendance rate for {form.category || 'Workshop'} events in your area.</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
