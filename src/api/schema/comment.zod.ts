import { z } from 'zod';

export const CommentBaseSchema = z.object({
    id: z.string(),
    text: z.string(),
    user: z.string(),
    creationDate: z.date(),
    modificationDate: z.date(),
    isAdmin: z.boolean(),
    isDeleted: z.boolean(),
    reactions: z.array(z.string()).nullable().optional(),
});

export const CommentPostSchema = z.object({
    text: z.string(),
    user: z.string(),
    password: z.string(),
    pageKey: z.string(),
    parentId: z.string().nullable().optional(),
    repliedTo: z.string().nullable().optional(),
});

export const CommentEditSchema = z.object({
    id: z.string(),
    pageKey: z.string(),
    text: z.string(),
    password: z.string(),
});

export const CommentDeleteSchema = z.object({
    id: z.string(),
    pageKey: z.string(),
    password: z.string(),
});

export const ChildCommentSchema = CommentBaseSchema.extend({
    repliedTo: z.string().optional(),
});

export const CommentSchema = CommentBaseSchema.extend({
    children: z.array(ChildCommentSchema).optional(),
});
