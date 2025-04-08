'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto sign in after successful registration
      await signIn('credentials', {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">
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
            
            <h2>Create Your Account</h2>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && (
                <div className="auth-error">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min. 6 characters)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>

              <div className="terms-agreement">
                <p>
                  By registering, you agree to our{' '}
                  <Link href="/terms" className="highlight">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="highlight">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cta-button primary full-width"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
              
              <div className="auth-alt-action">
                <p>Already have an account?</p>
                <Link href="/auth/login" className="highlight">
                  Sign in instead
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 