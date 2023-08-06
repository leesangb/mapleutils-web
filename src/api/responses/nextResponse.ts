import { NextResponse } from 'next/server';

export const NotFoundResponse = (name: string) => NextResponse.json({ message: `${name} not found` }, { status: 404 });
export const AuthenticationFailedResponse = () => NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
