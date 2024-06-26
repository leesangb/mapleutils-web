import { PrismaClient } from '@prisma/client';
import { hashPassword, verifyPassword } from '@/utils/password';
import { CommentDeleteDto, CommentDto, CommentEditDto, CommentPostDto, CommentSchema } from '@/api/schema/comment.zod';
import { ApiPaginatedResponse } from '@/api/schema/api.zod';
import { NotFoundError, PasswordNotMatchError } from '@/api/responses/error';

const client = new PrismaClient();

export const getComments = async (pageKey: string, page: number, pageSize: number): Promise<ApiPaginatedResponse<CommentDto>> => {
    try {
        const [parentCount, parentComments] = await Promise.all([
            client.comments.count({
                where: {
                    pageKey,
                    parentId: null,
                },
            }),
            client.comments.findMany({
                where: {
                    pageKey,
                    parentId: null,
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

        const parsedComments = parentComments.map(comment => {
            const parsed = CommentSchema.parse(comment);
            if (parsed.isDeleted) {
                parsed.text = '';
            }
            return parsed;
        });

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
                .map(cc => {
                    const child = CommentSchema.parse(cc);
                    if (child.isDeleted) {
                        child.text = '';
                    }
                    return child;
                })
                .sort((a, b) => a.creationDate.getDate() - b.creationDate.getDate());
        });

        const comments = parsedComments.filter(c => !c.isDeleted || c.isDeleted && c.children?.length);

        return {
            data: comments,
            totalCount: comments.reduce((acc, c) => acc + 1 + (c.children?.length || 0), 0),
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
        return await client.comments.create({
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
    } catch (e) {
        console.error(e);
        return null;
    }

};

export const editComment = async ({ id, password, text }: CommentEditDto) => {
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

    try {
        return await client.comments.update({
            data: {
                text,
                modificationDate: new Date(),
            },
            where: {
                id,
            },
        });
    } catch (e) {
        console.error(e);
        return null;
    }
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

    try {
        const deleted = await client.comments.update({
            data: {
                isDeleted: true,
            },
            where: {
                id,
            },
        });

        return {
            id: deleted.id,
            parentId: deleted.parentId,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
};
