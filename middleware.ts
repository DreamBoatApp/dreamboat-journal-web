import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const SUPPORTED_LOCALES = ['en', 'tr'];

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

    // Root path: serve /en content without redirect (fixes Search Console redirect warning)
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/en';
        return NextResponse.rewrite(url);
    }

    // Block unsupported locale prefixes (de, es, pt, fr…) → 404
    // Prevents [locale] dynamic segment from matching invalid locales
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    if (localeMatch && !SUPPORTED_LOCALES.includes(localeMatch[1])) {
        return new NextResponse(null, { status: 404 });
    }

    const response = intlMiddleware(request);

    // Strip NEXT_LOCALE cookie to allow Vercel CDN caching.
    // The locale is already in the URL path (/en/..., /tr/...),
    // so the cookie is redundant and prevents CDN edge caching.
    response.headers.delete('set-cookie');

    return response;
}

export const config = {
    // Match all paths except static assets and internals
    matcher: ['/', '/((?!_next|api|images|favicon\\.ico|robots\\.txt|sitemap|apple-icon|icon\\.png|og-image).*)']
};
