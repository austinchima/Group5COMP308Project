import React, { useState, useEffect } from 'react';
import { EventFormData } from './CreateEventModal';

export interface EventItem {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  category?: string | null;
  date: string;
  time?: string | null;
  location?: string | null;
  capacity?: number | null;
  suggestedBestTime?: string | null;
}

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onSubmit: (eventId: string, data: EventFormData) => Promise<void> | void;
}

export default function EditEventModal({
  isOpen,
  onClose,
  event,
  onSubmit,
}: EditEventModalProps) {
  const [form, setForm] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    category: 'Workshop',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time || '',
        location: event.location || '',
        capacity: event.capacity ? String(event.capacity) : '',
        category: event.category || 'Workshop',
      });
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await onSubmit(event.id, form);
      onClose();
    } catch (error) {
      console.error('Failed to edit event:', error);
      alert('Failed to edit event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-2xl font-bold">Edit Event</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold mb-1">Event Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
            >
              <option value="Workshop">Workshop</option>
              <option value="Social">Social</option>
              <option value="Town Hall">Town Hall</option>
              <option value="Clean Up">Clean Up</option>
              <option value="Fundraiser">Fundraiser</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
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
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="e.g., Central Park"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Capacity</label>
            <input
              type="number"
              min="1"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="Leave blank for unlimited"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none resize-none min-h-[100px]"
              required
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 text-on-surface font-bold hover:bg-surface-container rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !form.title || !form.description || !form.date}
              className="bg-primary text-on-primary px-8 py-2 rounded-full font-bold shadow-md hover:brightness-110 active:scale-95 duration-200 flex items-center gap-2"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
