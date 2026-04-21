import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

type DisplayRole = "Resident" | "Business Owner" | "Community Organizer";
type BackendRole = "RESIDENT" | "BUSINESS_OWNER" | "COMMUNITY_ORGANIZER";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: DisplayRole;
  location?: string;
  interests?: string[];
}

interface AuthPayload {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: BackendRole;
    location?: string | null;
    interests?: string[] | null;
  };
}

const API_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:4000/graphql";

const ROLE_TO_BACKEND: Record<DisplayRole, BackendRole> = {
  Resident: "RESIDENT",
  "Business Owner": "BUSINESS_OWNER",
  "Community Organizer": "COMMUNITY_ORGANIZER",
};

const ROLE_FROM_BACKEND: Record<BackendRole, DisplayRole> = {
  RESIDENT: "Resident",
  BUSINESS_OWNER: "Business Owner",
  COMMUNITY_ORGANIZER: "Community Organizer",
};

async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown>,
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(
      payload.errors[0].message || "Authentication request failed.",
    );
  }

  return payload.data as T;
}

function persistAuth(payload: AuthPayload) {
  const storedUser: AuthUser = {
    id: payload.user.id,
    name: payload.user.name,
    email: payload.user.email,
    role: ROLE_FROM_BACKEND[payload.user.role],
    location: payload.user.location ?? "",
    interests: payload.user.interests ?? [],
  };

  localStorage.setItem("token", payload.token);
  localStorage.setItem("user", JSON.stringify(storedUser));
}

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
        location
        interests
      }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $role: Role!
    $location: String
    $interests: [String]
  ) {
    register(
      name: $name
      email: $email
      password: $password
      role: $role
      location: $location
      interests: $interests
    ) {
      token
      user {
        id
        name
        email
        role
        location
        interests
      }
    }
  }
`;

export default function Auth({ onAuth }: { onAuth: () => void }) {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: DisplayRole;
  }>({
    name: "",
    email: "",
    password: "",
    role: "Resident",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!authForm.email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (authForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!isLogin && authForm.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return false;
    }
    return true;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);

    try {
      if (isLogin) {
        const data = await graphqlRequest<{ login: AuthPayload }>(LOGIN_MUTATION, {
          email: authForm.email.trim(),
          password: authForm.password,
        });
        persistAuth(data.login);
      } else {
        const data = await graphqlRequest<{ register: AuthPayload }>(REGISTER_MUTATION, {
          name: authForm.name.trim(),
          email: authForm.email.trim(),
          password: authForm.password,
          role: ROLE_TO_BACKEND[authForm.role],
          location: null,
          interests: [],
        });
        persistAuth(data.register);
      }
      onAuth();
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const roles: { id: DisplayRole; icon: string; desc: string }[] = [
    { id: "Resident", icon: "person", desc: "Join your neighbors, share news, and offer help." },
    { id: "Business Owner", icon: "storefront", desc: "List your business, post deals, and engage locals." },
    { id: "Community Organizer", icon: "groups", desc: "Start projects, organize events, and lead change." },
  ];

  return (
    <div className="min-h-screen bg-[#eaffea] flex items-center justify-center p-6 font-body">
      <motion.div 
        layout
        className={`w-full ${isLogin ? 'max-w-md' : 'max-w-5xl'} bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(14,58,32,0.15)] border border-white/50 overflow-hidden flex flex-col`}
      >
        {/* Toggle Header */}
        <div className="flex border-b border-on-surface/5 p-2 bg-surface-container-lowest/50">
          <button 
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all ${isLogin ? 'bg-primary text-on-primary shadow-xl scale-100' : 'text-on-surface/50 hover:bg-surface-container'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all ${!isLogin ? 'bg-primary text-on-primary shadow-xl scale-100' : 'text-on-surface/50 hover:bg-surface-container'}`}
          >
            Create Account
          </button>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Main Form Area */}
          <div className={`p-10 lg:p-16 ${isLogin ? 'w-full' : 'lg:w-1/2 border-r border-on-surface/5'} flex flex-col justify-center`}>
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl font-black text-on-surface font-headline italic tracking-tighter mb-2">
                {isLogin ? "Welcome Back." : "The Digital Commons."}
              </h1>
              <p className="text-on-surface-variant font-medium">
                {isLogin ? "Enter your credentials to connect with neighbors." : "Create your profile to start shaping your neighborhood."}
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-error-container/10 border border-error/30 rounded-2xl text-error text-sm font-bold flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-lg">warning</span>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-on-surface/60 ml-1">Full Name</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full bg-surface-container-highest/50 px-6 py-4 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all placeholder:text-on-surface/20 font-bold"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/60 ml-1">Email Address</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full bg-surface-container-highest/50 px-6 py-4 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all placeholder:text-on-surface/20 font-bold"
                  placeholder="name@neighborhood.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/60 ml-1">Password</label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full bg-surface-container-highest/50 px-6 py-4 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all placeholder:text-on-surface/20 font-bold"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-primary to-primary-dim text-on-primary py-5 rounded-full font-black text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-8"
              >
                {loading ? <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                {isLogin ? "Sign In" : "Get Started"}
              </button>
            </form>
          </div>

          {/* Role Selection Beside Form (Signup Only) */}
          {!isLogin && (
            <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-center bg-surface-container-lowest/30">
              <div className="mb-10 text-center">
                <h3 className="text-sm font-black text-primary tracking-[0.3em] uppercase mb-2">Select Your Lens</h3>
                <p className="text-on-surface-variant font-medium">How will you participate today?</p>
              </div>

              <div className="grid gap-4">
                {roles.map((role) => {
                  const isActive = authForm.role === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setAuthForm({ ...authForm, role: role.id })}
                      className={`group p-8 rounded-4xl border-2 transition-all flex items-start gap-6 text-left ${
                        isActive 
                          ? 'border-primary bg-primary/5 shadow-xl scale-[1.02]' 
                          : 'border-on-surface/5 bg-white/50 hover:border-primary/30 hover:bg-white shadow-sm'
                      }`}
                    >
                      <div className={`p-4 rounded-2xl transition-colors ${isActive ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface/40 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>{role.icon}</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className={`font-black text-lg font-headline ${isActive ? 'text-primary' : 'text-on-surface'}`}>{role.id}</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{role.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
