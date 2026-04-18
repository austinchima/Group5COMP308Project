import React, { useEffect, useState } from 'react';

interface StoredUser {
  name: string;
  email: string;
  role: string;
  interests?: string[];
  location?: string;
}

const DEFAULT_USER: StoredUser = {
  name: 'Community Member',
  email: 'Not available',
  role: 'Resident',
  interests: [],
  location: '',
};

function readStoredUser(): StoredUser {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return DEFAULT_USER;
    const parsed = JSON.parse(raw) as StoredUser;
    return {
      ...DEFAULT_USER,
      ...parsed,
      interests: Array.isArray(parsed.interests) ? parsed.interests : [],
      location: parsed.location ?? '',
    };
  } catch {
    return DEFAULT_USER;
  }
}

export default function Profile({ onLogout }: { onLogout: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<StoredUser>(readStoredUser);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    interests: user.interests?.join(', ') ?? '',
    location: user.location ?? '',
  });

  useEffect(() => {
    const syncUser = () => {
      const nextUser = readStoredUser();
      setUser(nextUser);
      setEditForm({
        name: nextUser.name,
        email: nextUser.email,
        interests: nextUser.interests?.join(', ') ?? '',
        location: nextUser.location ?? '',
      });
    };

    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const interestsArray = editForm.interests
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const nextUser: StoredUser = {
      ...user,
      name: editForm.name.trim() || user.name,
      email: editForm.email.trim() || user.email,
      interests: interestsArray,
      location: editForm.location.trim(),
    };

    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setIsEditing(false);
  };

  const resetForm = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      interests: user.interests?.join(', ') ?? '',
      location: user.location ?? '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
        <div className="flex justify-between items-start mb-8 gap-4">
          <div>
            <h2 className="font-headline text-3xl font-bold">Your Profile</h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Account identity now comes from the authenticated session. Inline profile edits are stored locally until a dedicated profile mutation is added.
            </p>
          </div>
          {!isEditing ? (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  resetForm();
                  setIsEditing(true);
                }}
                className="bg-surface-container text-on-primary-container px-4 py-2 rounded-full font-bold text-sm hover:brightness-95 transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={onLogout}
                className="bg-error-container text-on-error-container px-4 py-2 rounded-full font-bold text-sm hover:brightness-95 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsEditing(false);
                resetForm();
              }}
              className="text-on-surface-variant font-bold text-sm hover:underline shrink-0"
            >
              Cancel
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Location</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="City, Neighborhood"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Interests (comma separated)</label>
              <input
                type="text"
                value={editForm.interests}
                onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="Gardening, Technology, Volunteering"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-6"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-2xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <span className="px-3 py-1 bg-surface-container text-on-primary-container text-xs font-bold rounded-full inline-block mt-1">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-on-surface/5">
              <div>
                <h4 className="text-sm font-bold text-on-surface-variant mb-1">Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface-variant mb-1">Location</h4>
                <p>{user.location || 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-sm font-bold text-on-surface-variant mb-2">Interests</h4>
                {user.interests && user.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, idx) => (
                      <span
                        key={`${interest}-${idx}`}
                        className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-on-surface-variant italic">No interests added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
