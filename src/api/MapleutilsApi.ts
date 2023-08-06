import {
    CommentDeletedResponseDto,
    CommentDeleteDto,
    CommentDeleteResponseSchema,
    CommentDto,
    CommentEditDto,
    CommentPostDto,
} from './schema/comment.zod';
import { CommentSchema } from '@/api/schema/comment.zod';
import { getApiPaginatedResponseSchema } from '@/api/schema/api.zod';

export const getComments = async (pageKey: string, page: number, pageSize: number) => {
    const res = await fetch(`/api/comments/${pageKey}?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) {
        throw new Error(`Error fetching comments for ${pageKey}`);
    }

    const data = await res.json();

    return getApiPaginatedResponseSchema(CommentSchema).parse(data);
};

export const postComment = async (comment: CommentPostDto): Promise<CommentDto | null> => {
    const res = await fetch(`/api/comments/${comment.pageKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });

    if (!res.ok) {
        return null;
    }
    try {
        return CommentSchema.parse(await res.json());
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const deleteComment = async (comment: CommentDeleteDto): Promise<CommentDeletedResponseDto | null> => {
    const res = await fetch(`/api/comments/${comment.pageKey}/${comment.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${comment.id}:${comment.password}`)}`,
        },
    });
    if (!res.ok) {
        return null;
    }
    try {
        return CommentDeleteResponseSchema.parse(await res.json());
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const editComment = async (comment: CommentEditDto): Promise<CommentDto | null> => {
    const res = await fetch(`/api/comments/${comment.pageKey}/${comment.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) {
        return null;
    }
    try {
        return CommentSchema.parse(await res.json());
    } catch (e) {
        console.error(e);
        return null;
    }
};
