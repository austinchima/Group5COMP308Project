import React, { useEffect, useMemo, useState } from "react";
import CreateEventModal from "./CreateEventModal.tsx";
import EditEventModal from "./EditEventModal.tsx";
import SmartTimingPanel from "./SmartTimingPanel.tsx";
import VolunteerMatching from "./VolunteerMatching.tsx";

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
  category?: string;
  date: string;
  time?: string;
  location?: string;
  capacity?: number;
  volunteers: Volunteer[];
  suggestedBestTime?: string;
}

interface EventFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
}

const API_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:4000/graphql";

async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  requiresAuth = false,
) {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "GraphQL request failed.");
  }

  return payload.data as T;
}

const GET_EVENTS_STR = `
  query GetEvents {
    events {
      id
      organizerId
      organizerName
      title
      description
      category
      date
      time
      location
      capacity
      volunteers {
        userId
        userName
      }
      suggestedBestTime
    }
  }
`;

const CREATE_EVENT_STR = `
  mutation CreateEvent($title: String!, $description: String!, $category: String, $date: String!, $time: String, $location: String, $capacity: Int) {
    createEvent(title: $title, description: $description, category: $category, date: $date, time: $time, location: $location, capacity: $capacity) {
      id
      title
    }
  }
`;

const EDIT_EVENT_STR = `
  mutation EditEvent($eventId: ID!, $title: String!, $description: String!, $category: String, $date: String!, $time: String, $location: String, $capacity: Int) {
    updateEvent(eventId: $eventId, title: $title, description: $description, category: $category, date: $date, time: $time, location: $location, capacity: $capacity) {
      id
      title
    }
  }
`;

const ASSIGN_VOLUNTEER_STR = `
  mutation AssignVolunteer($eventId: ID!, $userId: String!, $userName: String!) {
    assignVolunteer(eventId: $eventId, userId: $userId, userName: $userName) {
      id
      volunteers {
        userId
        userName
      }
    }
  }
`;

export default function Events() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await graphqlRequest<{ events: EventItem[] }>(GET_EVENTS_STR);
      setEvents(data.events || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events'));
    } finally {
      setLoading(false);
    }
  };

  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw) as { id: string; name: string; role: string };
    } catch {
      return null;
    }
  }, []);

  const isOrganizer = currentUser?.role?.toUpperCase() === "COMMUNITY_ORGANIZER" || currentUser?.role === "Community Organizer";
  const isAllowedToCreate = isOrganizer || currentUser?.role?.toUpperCase() === "RESIDENT" || currentUser?.role === "Resident";

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    fetchEvents();

    const handleFab = (e: any) => {
      if (e.detail.pathname === "/events" && isAllowedToCreate) {
        setShowCreateEvent(true);
      }
    };

    window.addEventListener("commons-fab-click", handleFab);
    return () => window.removeEventListener("commons-fab-click", handleFab);
  }, [isAllowedToCreate]);

  const selectedEvent = events[0] ?? null;

  const handleNewEvent = async (evt: EventFormData) => {
    try {
      await graphqlRequest(CREATE_EVENT_STR, {
        title: evt.title,
        description: evt.description,
        category: evt.category || null,
        date: evt.date,
        time: evt.time || null,
        location: evt.location || null,
        capacity: evt.capacity ? Number(evt.capacity) : null,
      }, true);
      await fetchEvents();
    } catch (e) {
      console.error("Created failed:", e);
      alert("Failed to create event. Make sure you are logged in correctly.");
    }
  };

  const handleEditEvent = async (id: string, data: EventFormData) => {
    try {
      await graphqlRequest(EDIT_EVENT_STR, {
        eventId: id,
        title: data.title,
        description: data.description,
        category: data.category || null,
        date: data.date,
        time: data.time || null,
        location: data.location || null,
        capacity: data.capacity ? Number(data.capacity) : null,
      }, true);
      await fetchEvents();
    } catch (e) {
      console.error("Edit failed:", e);
      alert("Failed to edit event.");
    }
  };

  const handleAssignVolunteer = async (eventId: string) => {
    if (!currentUser) {
      alert("You must be logged in to volunteer for events.");
      return;
    }
    
    try {
      await graphqlRequest(ASSIGN_VOLUNTEER_STR, {
        eventId,
        userId: currentUser.id,
        userName: currentUser.name,
      }, true);
      await fetchEvents();
    } catch (e) {
      console.error("Volunteer failed:", e);
      alert("Failed to volunteer for event.");
    }
  };

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">
              {isOrganizer ? "Organizer Hub" : "Community Events Hub"}
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              {isAllowedToCreate
                ? "Curate meaningful moments. Manage your events, volunteers, and scheduling details."
                : "Discover and participate in events around your neighborhood."}
            </p>
          </div>

          {isAllowedToCreate && (
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreateEvent(true)}
                className="bg-linear-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
              >
                Create Event
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <SmartTimingPanel event={selectedEvent} />

        <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold">
              {isOrganizer ? "Manage Active Events" : "Upcoming Events"}
            </h3>
          </div>

          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">Failed to load events. {error.message}</p>}

          {!loading && !error && (
            <div className="space-y-6">
              {events.length === 0 ? (
                <p className="text-on-surface-variant">No events found.</p>
              ) : (
                events.map((evt) => {
                  const isOwner = currentUser?.id === evt.organizerId;
                  const hasRSVPd = evt.volunteers?.some((v) => v.userId === currentUser?.id) || false;

                  return (
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

                        <div className="flex gap-4 mt-1 items-center">
                          <p className="text-sm text-on-surface-variant">
                            Capacity: {evt.capacity ?? 'Unlimited'}
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            Volunteers: {evt.volunteers?.length || 0}
                          </p>
                        </div>

                        {evt.suggestedBestTime && (
                          <p className="text-sm text-primary font-semibold mt-2">
                            Suggested time: {evt.suggestedBestTime}
                          </p>
                        )}

                        <p className="text-sm mt-3">{evt.description}</p>

                        <div className="mt-4 flex gap-3">
                          {!isOrganizer && (
                            <button
                              disabled={hasRSVPd}
                              onClick={() => handleAssignVolunteer(evt.id)}
                              className={`px-4 py-2 text-sm font-bold rounded-full transition-colors flex items-center gap-1
                                ${hasRSVPd 
                                  ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed' 
                                  : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {hasRSVPd ? 'check_circle' : 'person_add'}
                              </span>
                              {hasRSVPd ? "Already Volunteered" : "Volunteer"}
                            </button>
                          )}

                          {isOwner && (
                            <button
                              onClick={() => setEditingEvent(evt)}
                              className="px-4 py-2 text-sm font-bold bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-full transition-colors flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                edit
                              </span>
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {events.length > 0 && <VolunteerMatching events={events} />}
      </div>

      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onSubmit={handleNewEvent}
      />

      <EditEventModal
        isOpen={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        event={editingEvent}
        onSubmit={handleEditEvent}
      />
    </>
  );
}