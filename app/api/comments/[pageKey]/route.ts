import { NextResponse } from 'next/server';
import { getComments, postComment } from '@/api/db/mongoclient';
import { CommentPostSchema } from '@/api/schema/comment.zod';

export const GET = async (req: Request, { params }: { params: { pageKey: string } }) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get('page')) || 0;
        const pageSize = Number(searchParams.get('pageSize')) || 0;

        const commentPage = await getComments(params.pageKey, page, pageSize);
        return NextResponse.json(commentPage);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.error();
    }
};

export const POST = async (req: Request, { params }: { params: { pageKey: string } }) => {
    try {
        const body = await req.json() as Record<string, unknown>;
        const commentPostDto = CommentPostSchema.parse({
            ...body,
            pageKey: params.pageKey,
        });

        const comment = await postComment(commentPostDto);
        if (!comment) {
            return NextResponse.error();
        }
        return NextResponse.json(comment);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.error();
    }
};
