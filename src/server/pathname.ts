import type { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Languages } from '@/i18n/settings';

const PATHNAME_HEADER = 'x-pathname';

export const withPathname = (request: NextRequest, response: NextResponse) => {
    const url = new URL(request.url);
    response.headers.set(PATHNAME_HEADER, url.pathname);
    return response;
};

export const getPathname = () => {
    const headersList = headers();
    const pathname = headersList.get(PATHNAME_HEADER);
    if (!pathname) {
        throw new Error('No pathname header found');
    }

    const [_, locale, ...paths] = pathname.split('/');

    return {
        locale: locale as Languages,
        pathname: ['', ...paths].join('/'),
    };
};
