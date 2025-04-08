# CapitalBulls Client Access Hub

A modern web application designed to streamline the client experience and centralize access to CapitalBulls' exclusive offerings—all in one browser-based hub.

## Features

- **User Authentication**: Secure login and registration with membership tiers
- **Live Stream Access**: View embedded live streams directly in the web app
- **Browser Notifications**: Get alerts when streams go live or new content is available
- **Exclusive Content**: Access premium content exclusive to web app members
- **Membership Tiers**: Users assigned to different tiers with varying access levels
- **Integrated Navigation**: Direct links to Discord, official website, broker connections, and payment portals

## Tech Stack

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Notifications**: Web Push API
- **Hosting**: Render

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/capitalbulls.git
   cd capitalbulls
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following environment variables:
   ```
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Push Notifications
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
   VAPID_PRIVATE_KEY=your_vapid_private_key
   CONTACT_EMAIL=your_email@example.com
   ```

4. Generate VAPID keys for push notifications (you only need to do this once):
   ```bash
   npx web-push generate-vapid-keys
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/app`: App routes and pages
- `/src/components`: Reusable components
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions
- `/src/models`: MongoDB schemas
- `/public`: Static assets

## Deployment

This application is configured to be deployed on Render. Connect your GitHub repository to Render and set the environment variables.
