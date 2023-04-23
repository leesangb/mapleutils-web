import { NextRequest, NextResponse } from 'next/server';
import { Locales } from '../src/tools/locales';

interface RedirectUrl {
    from: string;
    to: string;
}

const oldUrls: RedirectUrl[] = [
    {
        from: '/monster-life',
        to: '/farm',
    },
    {
        from: '/monster-life/information',
        to: '/farm/info',
    },
    {
        from: '/monster-life/combine',
        to: '/farm/combine',
    },
    {
        from: '/monster-life',
        to: '/farm/combine',
    },
    {
        from: '/farm',
        to: '/farm/combine',
    },
    {
        from: '/seed',
        to: '/seed/39',
    },
];

export async function middleware(req: NextRequest) {
    const { pathname, locale } = req.nextUrl;
    if (locale !== Locales.Korean && pathname.includes('farm')) {
        const url = req.nextUrl.clone();
        url.pathname = '';
        return NextResponse.redirect(url);
    }
    const redirectUrl = oldUrls.find(o => o.from === pathname);
    if (redirectUrl) {
        const url = req.nextUrl.clone();
        url.pathname = redirectUrl.to;
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}
