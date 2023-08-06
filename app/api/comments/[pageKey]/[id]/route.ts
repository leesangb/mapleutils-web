import { NextResponse } from 'next/server';
import { deleteComment, editComment } from '@/api/db/mongoclient';
import { CommentEditSchema } from '@/api/schema/comment.zod';
import { NotFoundError, PasswordNotMatchError } from '@/api/responses/error';
import { AuthenticationFailedResponse, NotFoundResponse } from '@/api/responses/nextResponse';

export const PATCH = async (req: Request, { params }: { params: { pageKey: string, id: string } }) => {
    try {
        const body = await req.json() as Record<string, unknown>;
        const commentEditDto = CommentEditSchema.parse({
            ...body,
            id: params.id,
            pageKey: params.pageKey,
        });
        const comment = await editComment(commentEditDto);
        return NextResponse.json(comment);
    } catch (e: unknown) {
        console.error(e);
        if (e instanceof PasswordNotMatchError) {
            return AuthenticationFailedResponse();
        }
        if (e instanceof NotFoundError) {
            return NotFoundResponse(`Comment with id ${params.id}`);
        }
        return NextResponse.error();
    }
};

export const DELETE = async (req: Request, { params }: { params: { pageKey: string, id: string } }) => {
    try {
        const authorization = req.headers.get('Authorization') || '';
        const [method, token] = authorization.split(' ');
        if (!authorization || method !== 'Basic') {
            return AuthenticationFailedResponse();
        }
        const [id, password] = atob(token).split(':');
        if (id !== params.pageKey) {
            const deleted = await deleteComment({
                pageKey: params.pageKey,
                id,
                password,
            });
            return deleted
                ? NextResponse.json(deleted)
                : NextResponse.error();
        }
    } catch (e: unknown) {
        console.error(e);
        if (e instanceof PasswordNotMatchError) {
            return AuthenticationFailedResponse();
        }
        if (e instanceof NotFoundError) {
            return NotFoundResponse(`Comment with id ${params.id}`);
        }
        return NextResponse.error();
    }
};
