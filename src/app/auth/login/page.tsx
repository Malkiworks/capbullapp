'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await signIn('credentials', {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (response?.error) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      if (response?.ok) {
        router.push('/dashboard');
        return;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="auth-page login-page">
      <div className="container">
        <div className="auth-form-container card-3d mouse-interactive">
          <div className="card-shine"></div>
          <div className="card-3d-content">
            <div className="auth-logo">
              <Image 
                src="/images/logo.png" 
                alt="CapitalBulls Logo" 
                width={200} 
                height={70} 
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            
            <h2>Sign In To Your Account</h2>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && (
                <div className="auth-error">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="username">Username or Email</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username or email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label htmlFor="remember-me">
                    Remember me
                  </label>
                </div>

                <Link href="/auth/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cta-button primary full-width"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="auth-alt-action">
                <p>Don't have an account?</p>
                <Link href="/auth/register" className="highlight">
                  Create one now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 