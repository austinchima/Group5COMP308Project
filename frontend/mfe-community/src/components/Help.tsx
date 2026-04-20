import React, { useState, useEffect } from "react";
import CreateHelpModal from "./CreateHelpModal.tsx";
import EmergencyAlertModal from "./EmergencyAlertModal.tsx";
import { formatRelativeTime } from "../utils/time.ts";

const API_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:4000/graphql";

const FETCH_HELP_DATA = `
  query GetHelpData {
    helpRequests {
      id
      requesterName
      title
      description
      category
      urgency
      matchedVolunteers {
        userName
      }
      createdAt
    }
    emergencyAlerts {
      id
      reporterName
      title
      description
      type
      severity
      location
      createdAt
    }
  }
`;

const CREATE_HELP_REQUEST = `
  mutation CreateHelp($title: String!, $description: String!, $category: String, $urgency: String) {
    createHelpRequest(title: $title, description: $description, category: $category, urgency: $urgency) {
      id
    }
  }
`;

const CREATE_EMERGENCY_ALERT = `
  mutation CreateAlert($title: String!, $description: String!, $type: String, $location: String) {
    createEmergencyAlert(title: $title, description: $description, type: $type, location: $location) {
      id
    }
  }
`;

const OFFER_HELP_MUTATION = `
  mutation OfferHelp($requestId: ID!) {
    offerHelpToRequest(requestId: $requestId) {
      id
    }
  }
`;

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
  const payload = await response.json();
  if (payload.errors) throw new Error(payload.errors[0].message);
  return payload.data as T;
}

export default function Help() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const [alerts, setAlerts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await graphqlRequest<{ helpRequests: any[]; emergencyAlerts: any[] }>(FETCH_HELP_DATA);
      setRequests(data.helpRequests || []);
      setAlerts(data.emergencyAlerts || []);
    } catch (err) {
      console.error("Failed to fetch help data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRequest = async (req: {
    title: string;
    content: string;
    category: string;
    urgency: string;
  }) => {
    try {
      await graphqlRequest(CREATE_HELP_REQUEST, {
        title: req.title,
        description: req.content,
        category: req.category,
        urgency: req.urgency
      }, true);
      await fetchData();
    } catch (err) {
      window.alert("Failed to post help request");
    }
  };

  const handleNewAlert = async (alertData: {
    title: string;
    content: string;
    type: string;
    location: string;
  }) => {
    try {
      await graphqlRequest(CREATE_EMERGENCY_ALERT, {
        title: alertData.title,
        description: alertData.content,
        type: alertData.type,
        location: alertData.location
      }, true);
      await fetchData();
    } catch (err) {
      window.alert("Failed to broadcast alert");
    }
  };

  const handleOfferHelp = async (requestId: string) => {
    try {
      await graphqlRequest(OFFER_HELP_MUTATION, { requestId }, true);
      window.alert("Thank you for offering help!");
      await fetchData();
    } catch (err) {
      window.alert("Failed to offer help: " + (err as Error).message);
    }
  };

  React.useEffect(() => {
    fetchData();
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    const handleFab = (e: any) => {
      if (e.detail.pathname === "/help") {
        setShowHelpModal(true);
      }
    };

    window.addEventListener("commons-fab-click", handleFab);
    return () => {
      window.removeEventListener("commons-fab-click", handleFab);
      clearInterval(timer);
    };
  }, []);

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
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">handshake</span>
              <p className="font-bold text-lg">No help requests yet.</p>
              <p className="text-sm mt-1">Click "Request Help" to ask your neighbors for support.</p>
            </div>
          ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-on-surface/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-bold">
                    {(req.requesterName || "U").charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{req.requesterName || "Anonymous"}</h4>
                    <p className="text-xs text-on-surface-variant">
                      {formatRelativeTime(req.createdAt)}
                    </p>
                  </div>
                </div>
                {req.urgency === 'High' && (
                   <span className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-black uppercase rounded-full">
                     High Urgency
                   </span>
                )}
              </div>
              <h3 className="font-headline text-xl font-bold mb-1">
                {req.title}
              </h3>
              <div className="flex gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-container-high rounded-sm text-on-surface-variant uppercase">
                  {req.category || 'General'}
                </span>
              </div>
              <p className="text-on-surface-variant mb-4">{req.description}</p>

              <div className="bg-surface-container-low p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">
                    auto_awesome
                  </span>
                  <p className="text-xs font-bold text-primary uppercase">
                    AI Matched Volunteers
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(req.matchedVolunteers?.length > 0) ? (
                    req.matchedVolunteers.map((vol: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white text-on-surface text-xs font-bold rounded-full border border-on-surface/10"
                      >
                        {vol.userName}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-on-surface-variant italic">AI is analyzing volunteers...</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-on-surface/5">
                <button 
                  onClick={() => handleOfferHelp(req.id)}
                  className="text-primary font-bold hover:underline py-1"
                >
                  Offer Help
                </button>
              </div>
            </div>
          ))
          )}
        </div>

        <div className="md:col-span-4 space-y-6">
          <h3 className="font-headline text-2xl font-bold mb-4 text-error">
            Active Alerts
          </h3>
          {loading ? null : alerts.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2 block opacity-40">verified_user</span>
              <p className="font-bold">All clear</p>
              <p className="text-xs mt-1">No active alerts in your area.</p>
            </div>
          ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-on-error p-6 rounded-xl border border-error/20 relative overflow-hidden mb-6"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
              <div className="flex items-center gap-2 mb-2 text-error">
                <span className="material-symbols-outlined animate-pulse">
                  campaign
                </span>
                <span className="font-bold text-sm uppercase tracking-wider">
                  {alert.type || 'Emergency'}
                </span>
              </div>
              <h4 className="font-bold text-lg mb-1">{alert.title}</h4>
              <p className="text-sm text-on-surface-variant mb-2">
                {alert.description}
              </p>
              {alert.location && (
                <p className="text-[10px] text-on-surface-variant/60 mb-2 italic flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  {alert.location}
                </p>
              )}
              <p className="text-xs text-error/70 font-bold">{formatRelativeTime(alert.createdAt)}</p>
            </div>
          ))
          )}
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
