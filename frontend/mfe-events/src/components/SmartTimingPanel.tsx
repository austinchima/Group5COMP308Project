import React from 'react';

interface Volunteer {
  userId: string;
  userName: string;
}

interface EventItem {
  id: string;
  organizerId: string;
  organizerName: string;
  title: string;
  description: string;
  category?: string | null;
  date: string;
  time?: string | null;
  location?: string | null;
  capacity?: number | null;
  volunteers?: Volunteer[];
  suggestedBestTime?: string | null;
  createdAt?: string | null;
}

interface SmartTimingPanelProps {
  event: EventItem | null;
}

export default function SmartTimingPanel({ event }: SmartTimingPanelProps) {
  return (
    <div className="md:col-span-4 bg-surface-container-high p-8 rounded-xl relative overflow-hidden flex flex-col justify-between">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
          <span className="text-tertiary font-bold text-sm tracking-widest uppercase">
            Smart Timing
          </span>
        </div>

        <h3 className="font-headline text-3xl font-bold mb-4 leading-tight">
          Suggested Event Time
        </h3>

        {!event ? (
          <p className="text-on-surface-variant">
            Create an event to see timing details.
          </p>
        ) : (
          <>
            <p className="text-on-surface-variant mb-6">
              Timing details for <strong>{event.title}</strong>
            </p>

            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="text-sm font-bold text-on-surface">
                {event.date}{event.time ? ` • ${event.time}` : ''}
              </p>
              <p className="text-2xl font-black text-primary">
                {event.suggestedBestTime || 'No suggested time yet'}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-on-surface/5">
        <p className="text-sm text-on-surface-variant">
          This panel reads the `suggestedBestTime` already stored on the event.
        </p>
      </div>

      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
    </div>
  );
}