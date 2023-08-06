import { PrismaClient } from '@prisma/client';
import { CommentDeleteDto, CommentDto, CommentEditDto, CommentPostDto } from '@/api';
import { hashPassword, verifyPassword } from '@/utils/password';
import { ChildCommentSchema, CommentSchema } from '@/api/schema/comment.zod';
import { ApiPaginatedResponse } from '@/api/schema/api.zod';
import { NotFoundError, PasswordNotMatchError } from '@/api/responses/error';

const client = new PrismaClient();

const fixReactions = (reactions: string | null) => reactions?.split(',').filter(Boolean);

export const getComments = async (pageKey: string, page: number, pageSize: number): Promise<ApiPaginatedResponse<CommentDto>> => {
    try {
        const [parentCount, totalCount, parentComments] = await Promise.all([
            client.comments.count({
                where: {
                    pageKey,
                    parentId: null,
                    isDeleted: false,
                },
            }),
            client.comments.count({
                where: {
                    pageKey,
                    isDeleted: false,
                },
            }),
            client.comments.findMany({
                where: {
                    pageKey,
                    parentId: null,
                    isDeleted: false,
                },
                orderBy: {
                    creationDate: 'desc',
                },
                select: {
                    id: true,
                    text: true,
                    user: true,
                    creationDate: true,
                    modificationDate: true,
                    isAdmin: true,
                    isDeleted: true,
                    reactions: true,

                    password: false,
                    salt: false,
                },
                take: pageSize === 0 ? undefined : pageSize,
                skip: pageSize === 0 ? undefined : page * pageSize,
            }),
        ]);

        const parsedComments = parentComments.map(comment => CommentSchema.parse(({
            ...comment,
            reactions: fixReactions(comment.reactions),
        })));

        const childComments = await client.comments.findMany({
            where: {
                pageKey,
                OR: parsedComments.map(comment => ({
                    parentId: comment.id,
                })),
            },
        });

        parsedComments.forEach(comment => {
            comment.children = childComments.filter(cc => cc.parentId === comment.id)
                .map(cc => ChildCommentSchema.parse(({ ...cc, reactions: fixReactions(cc.reactions) })))
                .sort((a, b) => a.creationDate.getDate() - b.creationDate.getDate());
        });

        return {
            data: parsedComments,
            totalCount,
            pageCount: pageSize === 0 ? 0 : Math.floor(parentCount / pageSize),
        };

    } catch (e) {
        console.error(e);
        return {
            data: [],
            totalCount: 0,
            pageCount: 0,
        };
    }
};

export const postComment = async (comment: CommentPostDto) => {
    try {
        const now = new Date();
        const { hashed: password, salt } = hashPassword(comment.password);
        const created = await client.comments.create({
            data: {
                text: comment.text,
                pageKey: comment.pageKey,
                user: comment.user,
                parentId: comment.parentId || null,
                repliedTo: comment.repliedTo || null,
                password: password,
                salt: salt,
                creationDate: now,
                modificationDate: now,
                reactions: '',
                isAdmin: false,
                isDeleted: false,
            },
        });
        return Boolean(created);
    } catch (e) {
        console.error(e);
        return false;
    }

};

export const updateComment = async ({ id, password, text }: CommentEditDto) => {
    const comment = await client.comments.findUnique({
        where: {
            id,
        },
    });

    if (!comment) {
        throw new NotFoundError(`Comment id ${id}`);
    }
    if (!verifyPassword(password, comment.password, comment.salt)) {
        throw new PasswordNotMatchError();
    }

    const updated = await client.comments.update({
        data: {
            text,
            modificationDate: new Date(),
        },
        where: {
            id,
        },
    });

    return Boolean(updated);
};

export const deleteComment = async ({ id, password }: CommentDeleteDto) => {
    const comment = await client.comments.findUnique({
        where: {
            id,
        },
    });

    if (!comment) {
        throw new NotFoundError(`Comment id ${id}`);
    }

    if (!verifyPassword(password, comment.password, comment.salt)) {
        throw new PasswordNotMatchError();
    }

    const deleted = await client.comments.update({
        data: {
            isDeleted: true,
        },
        where: {
            id,
        },
    });

    return Boolean(deleted);
};