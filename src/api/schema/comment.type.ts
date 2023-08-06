import { z } from 'zod';
import {
    ChildCommentSchema,
    CommentBaseSchema,
    CommentDeleteSchema,
    CommentEditSchema,
    CommentPostSchema,
    CommentSchema,
} from '@/api/schema/comment.zod';

export type CommentBaseDto = z.infer<typeof CommentBaseSchema>;

export type CommentPostDto = z.infer<typeof CommentPostSchema>;

export type CommentEditDto = z.infer<typeof CommentEditSchema>;

export type CommentDeleteDto = z.infer<typeof CommentDeleteSchema>;

export type ChildCommentDto = z.infer<typeof ChildCommentSchema>;

export type CommentDto = z.infer<typeof CommentSchema>;
