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
  event: EventItem;
}

export default function VolunteerMatching({ event }: VolunteerMatchingProps) {
  const volunteers = event.volunteers || [];

  return (
    <div className="md:col-span-12 bg-surface-container-low p-8 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h3 className="font-headline text-3xl font-bold mb-2">Assigned Volunteers</h3>
          <p className="text-on-surface-variant">
            Volunteers currently assigned to "{event.title}".
          </p>
        </div>
      </div>

      {volunteers.length === 0 ? (
        <p className="text-on-surface-variant">No volunteers assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteers.map((vol) => (
            <div key={vol.userId} className="bg-white p-6 rounded-xl">
              <h5 className="font-bold">{vol.userName}</h5>
              <p className="text-xs text-on-surface-variant mt-1">{vol.userId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}