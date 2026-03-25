import { useState } from 'react';
import { usePageTitle } from '@/hooks';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  usePageTitle('Login');
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Task 1 Logic: Firebase signInWithEmailAndPassword or LocalStorage check
    console.log("Attempting login for:", credentials.email);
    
    // After success, you'd typically:
    // 1. Update Global State
    // 2. navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--color-primary)]">
            Welcome Back
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Log in to access your wishlist
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1.5 text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all placeholder:opacity-50"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">Password</label>
              <Link to="/forgot-password" size="sm" className="text-xs text-[var(--color-primary)] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all placeholder:opacity-50"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="w-full mt-2 btn-primary">
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            New to the app?{' '}
            <Link to="/register" className="text-[var(--color-primary)] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}