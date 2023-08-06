import { z } from 'zod';

export const CommentBaseSchema = z.object({
    id: z.string(),
    text: z.string(),
    user: z.string(),
    creationDate: z.coerce.date(),
    modificationDate: z.coerce.date(),
    isAdmin: z.boolean(),
    isDeleted: z.boolean(),
    reactions: z.string().nullable().optional(),
    parentId: z.string().nullable().optional(),
    repliedTo: z.string().nullable().optional(),
});

export type CommentDto = z.infer<typeof CommentBaseSchema> & {
    children?: CommentDto[];
};

export const CommentSchema: z.ZodType<CommentDto> = CommentBaseSchema.extend({
    children: z.lazy(() => z.array(CommentSchema).optional()),
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

export const CommentDeleteResponseSchema = z.object({
    id: z.string(),
    parentId: z.string().nullable().optional(),
});

export type CommentDeletedResponseDto = z.infer<typeof CommentDeleteResponseSchema>;

export type CommentPostDto = z.infer<typeof CommentPostSchema>;

export type CommentEditDto = z.infer<typeof CommentEditSchema>;

export type CommentDeleteDto = z.infer<typeof CommentDeleteSchema>;
