import { NextRequest, NextResponse } from 'next/server';

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
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const redirectUrl = oldUrls.find(o => o.from === pathname);
    if (redirectUrl) {
        return NextResponse.redirect(redirectUrl.to);
    }
    return NextResponse.next();
}