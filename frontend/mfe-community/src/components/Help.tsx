import React, { useState } from "react";
import CreateHelpModal from "./CreateHelpModal.tsx";
import EmergencyAlertModal from "./EmergencyAlertModal.tsx";

export default function Help() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Emergency",
      title: "Missing Golden Retriever",
      content:
        'Lost near the central park. Answers to "Buddy". Please contact if seen.',
      time: "10 mins ago",
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      author: "Emily Chen",
      title: "Need a pet sitter for the weekend",
      content:
        "Looking for someone to watch my cat from Friday to Sunday. Will compensate!",
      matchedVolunteers: ["Marcus T.", "Sophie L."],
      time: "1 day ago",
    },
  ]);

  const handleNewRequest = (req: {
    title: string;
    content: string;
    category: string;
    urgency: string;
  }) => {
    setRequests([
      {
        id: Date.now(),
        author: "You",
        title: req.title,
        content: req.content,
        matchedVolunteers: ["AI Matching..."],
        time: "Just now",
      },
      ...requests,
    ]);
  };

  const handleNewAlert = (alert: {
    title: string;
    content: string;
    type: string;
    location: string;
  }) => {
    setAlerts([
      {
        id: Date.now(),
        type: alert.type,
        title: alert.title,
        content: `${alert.content} (Location: ${alert.location})`,
        time: "Just now",
      },
      ...alerts,
    ]);
  };

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">
              Neighborhood Help
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Support your neighbors and stay alert to local emergencies.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAlertModal(true)}
              className="bg-error-container text-on-error-container px-6 py-3 rounded-full font-bold hover:brightness-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">warning</span>
              Emergency Alert
            </button>
            <button
              onClick={() => setShowHelpModal(true)}
              className="bg-linear-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
            >
              Request Help
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
          <h3 className="font-headline text-2xl font-bold mb-4">
            Help Requests
          </h3>
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-on-surface/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-bold">
                    {req.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{req.author}</h4>
                    <p className="text-xs text-on-surface-variant">
                      {req.time}
                    </p>
                    bg-on-error
                  </div>
                </div>
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">
                {req.title}
              </h3>
              <p className="text-on-surface-variant mb-4">{req.content}</p>

              <div className="bg-surface-container-low p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">
                    auto_awesome
                  </span>
                  <p className="text-xs font-bold text-primary uppercase">
                    AI Matched Volunteers
                  </p>
                </div>
                <div className="flex gap-2">
                  {req.matchedVolunteers.map((vol, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white text-on-surface text-xs font-bold rounded-full border border-on-surface/10"
                    >
                      {vol}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-on-surface/5">
                <button className="text-primary font-bold hover:underline">
                  Offer Help
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-4 space-y-6">
          <h3 className="font-headline text-2xl font-bold mb-4 text-error">
            Active Alerts
          </h3>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-on-error p-6 rounded-xl border border-error/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
              <div className="flex items-center gap-2 mb-2 text-error">
                <span className="material-symbols-outlined animate-pulse">
                  campaign
                </span>
                <span className="font-bold text-sm uppercase tracking-wider">
                  {alert.type}
                </span>
              </div>
              <h4 className="font-bold text-lg mb-1">{alert.title}</h4>
              <p className="text-sm text-on-surface-variant mb-2">
                {alert.content}
              </p>
              <p className="text-xs text-error/70 font-bold">{alert.time}</p>
            </div>
          ))}
        </div>
      </div>

      <CreateHelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        onSubmit={handleNewRequest}
      />
      <EmergencyAlertModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onSubmit={handleNewAlert}
      />
    </>
  );
}
