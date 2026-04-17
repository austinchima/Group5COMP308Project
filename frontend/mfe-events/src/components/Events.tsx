import React, { useState } from 'react';
import CreateEventModal from './CreateEventModal.tsx';
import VolunteerMatching from './VolunteerMatching.tsx';
import SmartTimingPanel from './SmartTimingPanel.tsx';

export default function Events() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const [events, setEvents] = useState([
    { id: 1, title: 'Morning Pottery & Tea', date: 'Tomorrow at 9:00 AM', participants: 18, engagement: 85, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBFLGeeQ8kxlNsVaxLO0nypK_VwbVtLsJm7r8DDx8pjBR_ztJTtXenIVZffoujGWMTicudcMAqMQqHLyNbLi_IDmHfmxL3fDcxFvp8oen3xVoevARlfy5MGqeukY8Q-cCr99pi08VDIfxSTdlrDLCGoEeDcLsVVr0RAf3Qlb8OdvZL6N9knbLHeIgIVRNK_siDnWp20-XVDSCpR6Be-UGf4r3_Xzk5p2GC7LBu1uzZln4d7RQvOVX0YNOw9yG7I8k2FD4AEusu39s' },
    { id: 2, title: 'Community Garden Planting', date: 'Oct 12 at 2:00 PM', participants: 32, engagement: 42, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLjha5S3Ie3hwnXN-Woa-qI7hfQ2wQS-mXXFGZ9la11m9A4VItUKwAnYx39OWtAUsCnXLfO_DzKqV8gHXN1GYNhnzaLPo-X4a-ep4LLo8b9lRA21qQnylHaii1oP2ch6ymJMjsDChXuWbqKb6ck_OVUMFvgIjsy2gcxGKTLGE8i-dPHUxOHhfqyN85XzQvD2U615rBH-JMlZbyuYJrXXc4KlzwLOniOu23CGm7aJpUyTVYsDDAL1GCB4VgGuch7mj6hKXcgF8FAc0' },
  ]);

  const handleNewEvent = (evt: { title: string; description: string; date: string; time: string; location: string; capacity: string; category: string }) => {
    setEvents([...events, {
      id: Date.now(),
      title: evt.title,
      date: `${evt.date} at ${evt.time}`,
      participants: 0,
      engagement: 0,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLjha5S3Ie3hwnXN-Woa-qI7hfQ2wQS-mXXFGZ9la11m9A4VItUKwAnYx39OWtAUsCnXLfO_DzKqV8gHXN1GYNhnzaLPo-X4a-ep4LLo8b9lRA21qQnylHaii1oP2ch6ymJMjsDChXuWbqKb6ck_OVUMFvgIjsy2gcxGKTLGE8i-dPHUxOHhfqyN85XzQvD2U615rBH-JMlZbyuYJrXXc4KlzwLOniOu23CGm7aJpUyTVYsDDAL1GCB4VgGuch7mj6hKXcgF8FAc0',
    }]);
  };

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">Organizer Hub</h1>
            <p className="text-on-surface-variant max-w-xl text-lg">Curate meaningful moments. Manage participants and track the pulse of your community.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:brightness-95 transition-all">Export Report</button>
            <button 
              onClick={() => setShowCreateEvent(true)}
              className="bg-linear-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
            >
              Create Event
            </button>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Smart Timing AI Suggestion */}
        <SmartTimingPanel eventCategory="workshop" />

        {/* Active Events List */}
        <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold">Manage Active Events</h3>
            <div className="flex gap-2">
              <span className="px-4 py-1 bg-surface-container text-on-primary-container text-xs font-bold rounded-full">All Status</span>
              <span className="px-4 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-full">Workshops</span>
            </div>
          </div>
          <div className="space-y-6">
            {events.map(evt => (
              <div key={evt.id} className="group flex flex-col lg:flex-row lg:items-center gap-6 p-4 -mx-4 rounded-xl hover:bg-surface-container-low/50 transition-colors">
                <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                  <img alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={evt.img} />
                </div>
                <div className="grow">
                  <h4 className="font-bold text-xl mb-1">{evt.title}</h4>
                  <p className="text-sm text-on-surface-variant">{evt.date} • {evt.participants} Participants</p>
                </div>
                <div className="flex items-center gap-12 lg:ml-auto">
                  <div className="text-right">
                    <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Engagement</p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${evt.engagement > 70 ? 'bg-primary' : 'bg-tertiary'}`} style={{ width: `${evt.engagement}%` }}></div>
                      </div>
                      <span className="text-sm font-bold">{evt.engagement}%</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Matching Section */}
        <VolunteerMatching eventTitle="Garden Planting Day" />
      </div>

      <CreateEventModal isOpen={showCreateEvent} onClose={() => setShowCreateEvent(false)} onSubmit={handleNewEvent} />
    </>
  );
}
