import { NextResponse } from 'next/server';
import { getWachanFarms } from './wachan';

// need to force dynamic because using searchParams in GET
export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');
        if (!name) {
            return NextResponse.error();
        }
        const farms = await getWachanFarms(name);
        return NextResponse.json(farms);
    } catch (e: unknown) {
        return NextResponse.error();
    }
};
