import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// In-memory rate limiter (per-IP, resets on server restart)
// For production with multiple instances, use Redis-based solution
// ============================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // max requests per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// Clean up old entries periodically (prevent memory leak)
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Cleanup every 5 minutes
let lastCleanup = Date.now();

// ============================================================
// Allowed origins for CORS/CSRF
// ============================================================
function getAllowedOrigins(): string[] {
  const origins = ['https://skaile.de', 'https://www.skaile.de', 'https://skaile.ai', 'https://www.skaile.ai'];
  // Allow localhost in development
  if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:3000', 'http://localhost:3001');
  }
  return origins;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply security middleware to API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // ---- Rate Limiting ----
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';

  // Periodic cleanup
  if (Date.now() - lastCleanup > 5 * 60 * 1000) {
    cleanupRateLimitMap();
    lastCleanup = Date.now();
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuche es in einer Minute erneut.' },
      { status: 429 }
    );
  }

  // ---- CSRF Protection (Origin check for mutation requests) ----
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    if (origin) {
      const allowedOrigins = getAllowedOrigins();
      const originHost = new URL(origin).host;

      // Allow if origin matches host (same-origin) or is in allowed list
      if (originHost !== host && !allowedOrigins.some(allowed => new URL(allowed).host === originHost)) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    // If no origin header, the request is same-origin (browser doesn't send origin for same-origin)
  }

  // ---- CORS Headers ----
  const response = NextResponse.next();
  const origin = request.headers.get('origin');

  if (origin) {
    const allowedOrigins = getAllowedOrigins();
    if (allowedOrigins.some(allowed => new URL(allowed).host === new URL(origin).host)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
  }

  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Max-Age', '86400');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
