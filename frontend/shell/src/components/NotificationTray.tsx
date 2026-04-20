import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:4000/graphql";

const GET_NOTIFICATIONS = `
  query GetNotifications {
    notifications {
      id
      type
      message
      senderName
      isRead
      createdAt
    }
  }
`;

const MARK_READ = `
  mutation MarkRead($id: ID!) {
    markNotificationAsRead(notificationId: $id) {
      id
      isRead
    }
  }
`;

const MARK_ALL_READ = `
  mutation MarkAllRead {
    markAllNotificationsAsRead
  }
`;

async function graphqlRequest(query: string, variables = {}, requiresAuth = true) {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (requiresAuth && token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (payload.errors) throw new Error(payload.errors[0].message);
  return payload.data;
}

export default function NotificationTray() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await graphqlRequest(GET_NOTIFICATIONS);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleMarkRead = async (id: string) => {
    try {
      await graphqlRequest(MARK_READ, { id });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await graphqlRequest(MARK_ALL_READ);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-emerald-100/50 transition-colors relative"
      >
        <span className="material-symbols-outlined text-emerald-800">
          notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-white text-[10px] font-black rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 max-h-[480px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-on-surface/5 z-50 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-on-surface/5 flex justify-between items-center bg-surface-container-low/30">
              <h3 className="font-headline font-bold">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-bold text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="overflow-y-auto flex-1">
              {loading && notifications.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant text-sm">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-20">notifications_off</span>
                  <p className="text-sm font-bold">All caught up!</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => handleMarkRead(n.id)}
                    className={`p-4 border-b border-on-surface/5 cursor-pointer transition-colors hover:bg-surface-container-low ${!n.isRead ? 'bg-primary-container/10' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.isRead ? 'bg-primary' : 'bg-transparent'}`}></div>
                      <div>
                        <p className="text-sm text-on-surface leading-tight mb-1">
                          {n.message}
                        </p>
                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                          {new Date(Number(n.createdAt)).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
