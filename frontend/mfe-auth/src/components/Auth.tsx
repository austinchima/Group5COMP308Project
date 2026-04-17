import React, { useState } from 'react';

export default function Auth({ onAuth }: { onAuth: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', role: 'Resident' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!authForm.email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (authForm.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (!isLogin && authForm.name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return false;
    }
    return true;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    // Simulate API delay — will be replaced with GraphQL mutation
    await new Promise(r => setTimeout(r, 800));

    // Mock authentication — stores token
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      name: isLogin ? 'John Doe' : authForm.name,
      email: authForm.email,
      role: authForm.role,
    }));
    setLoading(false);
    onAuth();
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-900 font-headline text-center mb-2">The Commons</h1>
        <h2 className="font-headline text-xl font-bold mb-6 text-center text-on-surface-variant">
          {isLogin ? 'Welcome Back' : 'Join the Community'}
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200 mt-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
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
