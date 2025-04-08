# Role-Based Access with Time-Limited Subscriptions

## System Overview

We've implemented a complete role-based access control system with time-limited subscription options for the CapitalBulls platform. This system provides:

1. **User Roles**:
   - Standard users with access to basic content
   - Premium users (24h/7d) with time-limited access
   - Admin users with full access and management capabilities

2. **Time-Limited Premium Access**:
   - 24-hour premium subscription
   - 7-day premium subscription
   - Real-time expiration countdown
   - Automatic downgrade after expiration

3. **Admin Management**:
   - Admin dashboard for user management
   - Grant/revoke premium access
   - Set custom start times for subscriptions
   - View user access status and expiration

## Implementation Details

### Database Changes
- Extended User model with:
  - Role field (user/admin)
  - Premium access start/expiry timestamps
  - New membership tier options

### API Endpoints
- `/api/users` - Get all users (admin only)
- `/api/users/access` - Grant/revoke premium access (admin only)
- `/api/users/me/access` - Check current user's access status

### Auth & Security
- Updated NextAuth session to include role and access details
- Middleware to protect premium routes and admin features
- Expiration validation at multiple levels (login, API calls, middleware)

### User Interface
- Admin dashboard with user management
- Premium access countdown display
- Upgrade page for standard users
- Role-based navigation items

## Usage

### For Users
- Standard users see the upgrade page when accessing premium content
- Premium users see a countdown timer showing remaining access time
- Access automatically reverts to standard when the time expires

### For Admins
- Access the admin dashboard through the main navigation
- Search and filter users
- Grant 24h or 7d premium access with optional start times
- Revoke premium access when needed

## Security Features
- Route protection via middleware
- Server-side role verification
- Multiple expiration checks to prevent unauthorized access 