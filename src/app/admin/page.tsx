'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardNavigation from '../../components/DashboardNavigation';
import { UserRole } from '../../constants/roles';
import { toast } from 'react-hot-toast';

interface User {
  _id: string;
  username: string;
  email: string;
  membershipTier: string;
  role: string;
  premiumAccessStart: string | null;
  premiumAccessExpiry: string | null;
  joinedDate: string;
  lastLogin: string;
  isActive: boolean;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [accessType, setAccessType] = useState<string>('premium_24h');
  const [startDate, setStartDate] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    if (session && session.user.role !== UserRole.ADMIN) {
      router.push('/dashboard');
      return;
    }

    if (session) {
      fetchUsers();
    }
  }, [status, session, router, pagination.page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/users?page=${pagination.page}&limit=${pagination.limit}${
          search ? `&search=${search}` : ''
        }`
      );
      
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await res.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const grantAccess = async () => {
    if (!selectedUser) return;
    
    try {
      const res = await fetch('/api/users/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          accessType,
          startTime: startDate ? new Date(startDate).toISOString() : undefined,
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to grant access');
      }
      
      toast.success(`Premium access granted to ${selectedUser.username}`);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      console.error('Error granting access:', error);
      toast.error(error.message || 'Failed to grant access');
    }
  };

  const revokeAccess = async (userId: string, username: string) => {
    try {
      const res = await fetch(`/api/users/access?userId=${userId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to revoke access');
      }
      
      toast.success(`Premium access revoked from ${username}`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error revoking access:', error);
      toast.error(error.message || 'Failed to revoke access');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getTimeRemaining = (expiryDate: string | null) => {
    if (!expiryDate) return 'N/A';
    
    const now = new Date();
    const expiry = new Date(expiryDate);
    
    if (now > expiry) return 'Expired';
    
    const remainingMs = expiry.getTime() - now.getTime();
    const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (remainingHours >= 24) {
      const days = Math.floor(remainingHours / 24);
      const hours = remainingHours % 24;
      return `${days} days, ${hours} hours`;
    }
    
    return `${remainingHours} hours, ${remainingMinutes} minutes`;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="dashboard-layout">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== UserRole.ADMIN) {
    return null; // Will redirect through useEffect
  }

  return (
    <div className="dashboard-layout">
      <DashboardNavigation />
      
      <main className="dashboard-content">
        <div className="container">
          <div className="page-header">
            <h1>Admin Dashboard</h1>
            <p>Manage user access and permissions</p>
          </div>
          
          <div className="admin-controls">
            <div className="search-box">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
          
          {/* User management table */}
          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Membership</th>
                  <th>Access Expires</th>
                  <th>Time Remaining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`membership-tag ${user.membershipTier.toLowerCase().replace(' ', '-')}`}>
                        {user.membershipTier}
                      </span>
                    </td>
                    <td>{formatDate(user.premiumAccessExpiry)}</td>
                    <td>{getTimeRemaining(user.premiumAccessExpiry)}</td>
                    <td className="action-buttons">
                      <button
                        className="action-button grant"
                        onClick={() => setSelectedUser(user)}
                      >
                        <i className="fas fa-key"></i> Grant Access
                      </button>
                      {(user.membershipTier === 'Premium 24h Member' || 
                        user.membershipTier === 'Premium 7d Member') && (
                        <button
                          className="action-button revoke"
                          onClick={() => revokeAccess(user._id, user.username)}
                        >
                          <i className="fas fa-times"></i> Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                className="pagination-button"
                disabled={pagination.page === 1}
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              
              <span className="pagination-info">
                Page {pagination.page} of {pagination.pages}
              </span>
              
              <button
                className="pagination-button"
                disabled={pagination.page === pagination.pages}
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
          
          {/* Grant Access Modal */}
          {selectedUser && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Grant Premium Access</h3>
                  <button 
                    className="modal-close"
                    onClick={() => setSelectedUser(null)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="modal-body">
                  <p>
                    Granting premium access to <strong>{selectedUser.username}</strong>
                  </p>
                  
                  <div className="form-group">
                    <label>Access Type</label>
                    <select
                      value={accessType}
                      onChange={(e) => setAccessType(e.target.value)}
                      className="form-select"
                    >
                      <option value="premium_24h">24 Hour Premium Access</option>
                      <option value="premium_7d">7 Day Premium Access</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Start Time (optional)</label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-input"
                    />
                    <p className="form-help">
                      If not set, access will start immediately
                    </p>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    className="cancel-button"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-button"
                    onClick={grantAccess}
                  >
                    Grant Access
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 