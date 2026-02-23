import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // URL case normalization: redirect uppercase paths to lowercase
    // Only normalize content paths, not static assets or API
    if (
        pathname !== pathname.toLowerCase() &&
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/api') &&
        !pathname.includes('.')
    ) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.toLowerCase();
        return NextResponse.redirect(url, 308);
    }

    const response = intlMiddleware(request);

    // Strip NEXT_LOCALE cookie to allow Vercel CDN caching.
    // The locale is already in the URL path (/en/..., /tr/...),
    // so the cookie is redundant and prevents CDN edge caching.
    response.headers.delete('set-cookie');

    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|tr)/:path*']
};
