import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Get pathname
  const { pathname } = req.nextUrl;
  
  // Define protected premium routes
  const premiumRoutes = [
    '/livestreams',
    '/content/premium'
  ];
  
  // Check if path starts with any of the premium routes
  const isPremiumRoute = premiumRoutes.some(route => pathname.startsWith(route));
  
  // If it's a premium route, check for premium access
  if (isPremiumRoute) {
    // If not logged in, redirect to login
    if (!token) {
      const url = new URL('/auth/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
    
    // If user doesn't have premium access (24h or 7d), redirect to upgrade page
    const isPremium = 
      token.membershipTier === 'Premium 24h Member' || 
      token.membershipTier === 'Premium 7d Member' ||
      token.membershipTier === 'Platinum Member' ||
      token.membershipTier === 'Elite Member';
    
    if (!isPremium) {
      return NextResponse.redirect(new URL('/upgrade', req.url));
    }
    
    // Check if premium access has expired
    if (
      (token.membershipTier === 'Premium 24h Member' || token.membershipTier === 'Premium 7d Member') && 
      token.premiumAccessExpiry
    ) {
      const now = new Date();
      const expiry = new Date(String(token.premiumAccessExpiry));
      
      if (now > expiry) {
        return NextResponse.redirect(new URL('/upgrade', req.url));
      }
    }
  }
  
  // If it's the admin route, check for admin role
  if (pathname.startsWith('/admin')) {
    // If not logged in, redirect to login
    if (!token) {
      const url = new URL('/auth/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
    
    // If user is not an admin, redirect to dashboard
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/livestreams/:path*',
    '/content/:path*',
    '/profile/:path*',
  ],
}; 