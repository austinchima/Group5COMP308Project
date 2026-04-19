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

interface VolunteerMatchingProps {
  events: EventItem[];
}

export default function VolunteerMatching({ events }: VolunteerMatchingProps) {
  const allVolunteers = events.flatMap((event) =>
    (event.volunteers || []).map((vol) => ({
      ...vol,
      eventTitle: event.title,
      eventId: event.id,
    }))
  );

  return (
    <div className="md:col-span-12 bg-surface-container-low p-8 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h3 className="font-headline text-3xl font-bold mb-2">Community Volunteers</h3>
          <p className="text-on-surface-variant">
            See who is volunteering to help out with upcoming events.
          </p>
        </div>
      </div>

      {allVolunteers.length === 0 ? (
        <p className="text-on-surface-variant">No volunteers have signed up for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allVolunteers.map((vol, index) => (
            <div key={`${vol.userId}-${vol.eventId}-${index}`} className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow border border-on-surface/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
                <h5 className="font-bold text-lg">{vol.userName}</h5>
              </div>
              <p className="text-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">event</span>
                {vol.eventTitle}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}