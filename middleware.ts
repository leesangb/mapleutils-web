import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { cookieName, fallbackLng, languages, Languages } from '@/i18n/settings';

acceptLanguage.languages([...languages]);

const redirects: Record<string, string> = {
    ['/monster-life']: '/farm',
    ['/monster-life/information']: '/farm/info',
    ['/monster-life/combine']: '/farm/combine',
    ['/monster-life']: '/farm/combine',
    ['/farm']: '/farm/combine',
    ['/seed']: '/seed/39',
};

const getLanguageFromRequest = (request: NextRequest): Languages => {
    let lng: Languages | null = fallbackLng;
    const cookie = request.cookies.get(cookieName);
    if (cookie?.value) {
        lng = acceptLanguage.get(cookie.value) as Languages | null;
    }
    if (!lng) {
        lng = acceptLanguage.get(request.headers.get('Accept-Language')) as Languages | null;
    }
    if (!lng) {
        lng = fallbackLng;
    }
    return lng;
};

const getRedirectUrl = (request: NextRequest): string | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [empty, locale, ...paths] = request.nextUrl.pathname.split('/');
    const pathname = [empty, ...paths].join('/');
    const redirect = redirects[pathname];
    return redirect && `/${locale}${redirect}`;
};

export function middleware(request: NextRequest) {
    const lng: Languages = getLanguageFromRequest(request);
    if (!languages.some(lang => request.nextUrl.pathname.startsWith(`/${lang}`))) {
        console.log(request.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url));
    }

    const redirectUrl = getRedirectUrl(request);
    if (redirectUrl) {
        console.log(redirectUrl);
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    const referer = request.headers.get('referer');
    if (referer) {
        const refererUrl = new URL(referer);
        const lngInReferer = languages.find((lang) => refererUrl.pathname.startsWith(`/${lang}`));
        const response = NextResponse.next();
        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        }
        return response;
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!_next|fonts|images|js|locales|musics|ads.txt|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)',
    ],
};
