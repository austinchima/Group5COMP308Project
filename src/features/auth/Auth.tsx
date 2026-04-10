import React, { useState } from 'react';

export default function Auth({ onAuth }: { onAuth: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', role: 'Resident' });

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    localStorage.setItem('token', 'mock-jwt-token');
    onAuth();
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-900 font-headline text-center mb-2">Editorial Harmony</h1>
        <h2 className="font-headline text-xl font-bold mb-6 text-center text-on-surface-variant">
          {isLogin ? 'Welcome Back' : 'Join the Community'}
        </h2>
        
        <form className="space-y-4" onSubmit={handleAuthSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input 
                type="text" 
                value={authForm.name}
                onChange={e => setAuthForm({...authForm, name: e.target.value})}
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
              onChange={e => setAuthForm({...authForm, email: e.target.value})}
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
              onChange={e => setAuthForm({...authForm, password: e.target.value})}
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
                onChange={e => setAuthForm({...authForm, role: e.target.value})}
                className="w-full bg-surface-container-highest px-4 py-2 rounded-sm border-none focus:ring-2 focus:ring-primary/40 outline-none"
              >
                <option value="Resident">Resident</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Community Organizer">Community Organizer</option>
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-6">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary font-bold hover:underline"
            type="button"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
