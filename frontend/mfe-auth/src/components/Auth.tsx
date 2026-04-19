import React, { useState, useEffect } from "react";

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

const API_URL = "http://localhost:4000/graphql";

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
    // Failsafe: Eradicate JWT and user payload whenever the Auth component mounts.
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

  const handleAuthSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const data = await graphqlRequest<{ login: AuthPayload }>(
          LOGIN_MUTATION,
          {
            email: authForm.email.trim(),
            password: authForm.password,
          },
        );
        persistAuth(data.login);
      } else {
        const data = await graphqlRequest<{ register: AuthPayload }>(
          REGISTER_MUTATION,
          {
            name: authForm.name.trim(),
            email: authForm.email.trim(),
            password: authForm.password,
            role: ROLE_TO_BACKEND[authForm.role],
            location: null,
            interests: [],
          },
        );
        persistAuth(data.register);
      }

      onAuth();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-900 font-headline text-center mb-2">
          The Commons
        </h1>
        <h2 className="font-headline text-xl font-bold mb-6 text-center text-on-surface-variant">
          {isLogin ? "Welcome Back" : "Join the Community"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-error-container/10 border border-error/20 rounded-lg text-error text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleAuthSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                value={authForm.name}
                onChange={(e) =>
                  setAuthForm({ ...authForm, name: e.target.value })
                }
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="Your name"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
              className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-1">Role</label>
              <select
                value={authForm.role}
                onChange={(e) =>
                  setAuthForm({
                    ...authForm,
                    role: e.target.value as DisplayRole,
                  })
                }
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              >
                <option value="Resident">Resident</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Community Organizer">Community Organizer</option>
              </select>
            </div>
          )}

          <div className="bg-surface-container-low p-4 rounded-lg flex items-start gap-3 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary mt-0.5">
              cloud_sync
            </span>
            <p>
              This screen now connects to the live GraphQL authentication flow
              whenever the backend gateway is running.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
            )}
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sm text-primary font-bold hover:underline"
            type="button"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
