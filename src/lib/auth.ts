import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from './db';
import User, { MembershipTier } from '../models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          await connectToDatabase();
          
          const user = await User.findOne({ 
            $or: [
              { username: credentials.username },
              { email: credentials.username }
            ]
          });
          
          if (!user) {
            return null;
          }
          
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordValid) {
            return null;
          }
          
          // Check if premium access has expired
          if (user.premiumAccessExpiry && new Date() > new Date(user.premiumAccessExpiry)) {
            // Revert to standard membership if premium expired
            user.membershipTier = MembershipTier.STANDARD;
            user.premiumAccessStart = null;
            user.premiumAccessExpiry = null;
            await user.save();
          }
          
          // Update last login
          user.lastLogin = new Date();
          await user.save();
          
          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            membershipTier: user.membershipTier,
            role: user.role,
            premiumAccessStart: user.premiumAccessStart,
            premiumAccessExpiry: user.premiumAccessExpiry,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.membershipTier = user.membershipTier;
        token.role = user.role;
        token.premiumAccessStart = user.premiumAccessStart;
        token.premiumAccessExpiry = user.premiumAccessExpiry;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.membershipTier = token.membershipTier as string;
        session.user.role = token.role as string;
        session.user.premiumAccessStart = token.premiumAccessStart as Date | null;
        session.user.premiumAccessExpiry = token.premiumAccessExpiry as Date | null;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module 'next-auth' {
  interface User {
    id: string;
    membershipTier: string;
    role: string;
    premiumAccessStart: Date | null;
    premiumAccessExpiry: Date | null;
  }
  
  interface Session {
    user: {
      id: string;
      membershipTier: string;
      role: string;
      premiumAccessStart: Date | null;
      premiumAccessExpiry: Date | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    membershipTier: string;
    role: string;
    premiumAccessStart: Date | null;
    premiumAccessExpiry: Date | null;
  }
} 