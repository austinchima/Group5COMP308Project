import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import CreateEventModal, { EventFormData } from './CreateEventModal';
import VolunteerMatching from './VolunteerMatching';
import SmartTimingPanel from './SmartTimingPanel';
import { CREATE_EVENT, GET_EVENTS } from '../graphql/events';

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

export default function Events() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const { data, loading, error } = useQuery(GET_EVENTS);

  const [createEvent] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  const events: EventItem[] = useMemo(() => data?.events ?? [], [data]);
  const selectedEvent = events[0] ?? null;

  const handleNewEvent = async (evt: EventFormData) => {
    await createEvent({
      variables: {
        title: evt.title,
        description: evt.description,
        category: evt.category || null,
        date: evt.date,
        time: evt.time || null,
        location: evt.location || null,
        capacity: evt.capacity ? Number(evt.capacity) : null,
      },
    });
  };

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">
              Organizer Hub
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Curate meaningful moments. Manage your events, volunteers, and scheduling details.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateEvent(true)}
              className="bg-linear-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
            >
              Create Event
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <SmartTimingPanel event={selectedEvent} />

        <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold">Manage Active Events</h3>
          </div>

          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">Failed to load events.</p>}

          {!loading && !error && (
            <div className="space-y-6">
              {events.length === 0 ? (
                <p className="text-on-surface-variant">No events found.</p>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className="group flex flex-col lg:flex-row lg:items-start gap-6 p-4 -mx-4 rounded-xl hover:bg-surface-container-low/50 transition-colors"
                  >
                    <div className="grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="font-bold text-xl">{evt.title}</h4>
                        {evt.category && (
                          <span className="px-3 py-1 bg-surface-container text-xs font-bold rounded-full">
                            {evt.category}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-on-surface-variant">
                        {evt.date}
                        {evt.time ? ` at ${evt.time}` : ''}
                      </p>

                      <p className="text-sm text-on-surface-variant mt-1">
                        {evt.location || 'No location provided'}
                      </p>

                      <p className="text-sm text-on-surface-variant mt-1">
                        Organizer: {evt.organizerName || 'Unknown'}
                      </p>

                      <p className="text-sm text-on-surface-variant mt-1">
                        Capacity: {evt.capacity ?? 'Not set'}
                      </p>

                      <p className="text-sm text-on-surface-variant mt-1">
                        Volunteers: {evt.volunteers?.length || 0}
                      </p>

                      {evt.suggestedBestTime && (
                        <p className="text-sm text-primary font-semibold mt-2">
                          Suggested time: {evt.suggestedBestTime}
                        </p>
                      )}

                      <p className="text-sm mt-3">{evt.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {selectedEvent && <VolunteerMatching event={selectedEvent} />}
      </div>

      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onSubmit={handleNewEvent}
      />
    </>
  );
}