'use client';

import { Languages } from '@/i18n/settings';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, editComment, getComments, postComment } from '@/api/MapleutilsApi';
import { getApiPaginatedResponseSchema } from '@/api/schema/api.zod';
import { CommentDeleteDto, CommentEditDto, CommentPostDto, CommentSchema } from '@/api/schema/comment.zod';

/**
 * Legacy comments are stored in a separate database.
 */
const legacyCommentsMap: Record<string, string> = {
    ['']: 'feedbacks',
    ['/seed/22']: 'seed22',
    ['/seed/23']: 'seed23',
    ['/seed/24']: 'seed24',
    ['/seed/36']: 'seed36',
    ['/seed/39']: 'seed39',
    ['/seed/42']: 'seed42',
    ['/seed/47']: 'seed47',
    ['/seed/48']: 'seed48',
    ['/seed/49']: 'seed49',
    ['/seed/24/simulator']: 'seed24simulator',
    ['/seed/39/simulator']: 'seed39simulator',
    ['/seed/49/simulator']: 'seed49simulator',
    ['/farm/combine']: 'monster-life_combine',
    ['/farm/info']: 'monster-life_information',
    ['/farm/bookmark']: 'monster-life_bookmark',
};

export const getCommentPageKey = (pathname: string, locale: Languages) => {
    const key = (legacyCommentsMap[pathname] || pathname).replace(/\//g, '_');
    return locale !== 'ko' ? `${locale}_${key}` : key;
};

export const useGetComments = () => {
    const { pathname, locale } = useLocalizedPathname();
    const pageKey = getCommentPageKey(pathname, locale);
    return useQuery({
        queryKey: ['comments', pageKey],
        queryFn: async () => await getComments(pageKey, 0, 0),
        initialData: ({
            data: [],
            totalCount: 0,
            pageCount: 0,
        }),
    });
};

export const usePostComment = () => {
    const { pathname, locale } = useLocalizedPathname();
    const pageKey = getCommentPageKey(pathname, locale);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (comment: Omit<CommentPostDto, 'pageKey'>) => await postComment({ ...comment, pageKey }),
        onSuccess: (comment) => {
            if (!comment) {
                return;
            }
            const pageData = getApiPaginatedResponseSchema(CommentSchema).parse(queryClient.getQueryData(['comments', pageKey]));

            if (!pageData) {
                return;
            }
            if (comment.parentId) {
                const parent = pageData.data.find(c => c.id === comment.parentId);
                if (parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(comment);
                }
            } else {
                pageData.data.unshift(comment);
            }
            pageData.totalCount++;
            // FIXME: update page count when pagination is implemented
            // pageData.pageCount =
            queryClient.setQueryData(['comments', pageKey], pageData);
        },
    });
};

export const useDeleteComment = () => {
    const { pathname, locale } = useLocalizedPathname();
    const pageKey = getCommentPageKey(pathname, locale);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (comment: Omit<CommentDeleteDto, 'pageKey'>) => await deleteComment({ ...comment, pageKey }),
        onSuccess: (deleted) => {
            if (!deleted) {
                return;
            }
            const data = getApiPaginatedResponseSchema(CommentSchema).parse(queryClient.getQueryData(['comments', pageKey]));
            if (!data) {
                return;
            }

            if (deleted.parentId) {
                const parent = data.data.find(c => c.id === deleted.parentId);
                if (parent) {
                    const childIndex = parent.children?.findIndex(c => c.id === deleted.id);
                    if (childIndex !== undefined && childIndex >= 0) {
                        parent.children?.splice(childIndex, 1);
                    }
                }
            } else {
                const commentIndex = data.data.findIndex(c => c.id === deleted.id);
                if (commentIndex >= 0) {
                    data.data.splice(commentIndex, 1);
                }
            }
            data.totalCount--;
            queryClient.setQueryData(['comments', pageKey], data);
        },
    });
};

export const useEditComment = () => {
    const { pathname, locale } = useLocalizedPathname();
    const pageKey = getCommentPageKey(pathname, locale);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (comment: CommentEditDto) => await editComment(comment),
        onSuccess: (comment) => {
            if (!comment) {
                return;
            }
            const pageData = getApiPaginatedResponseSchema(CommentSchema).parse(queryClient.getQueryData(['comments', pageKey]));
            if (!pageData) {
                return;
            }
            if (comment.parentId) {
                const parent = pageData.data.find(c => c.id === comment.parentId);
                if (parent) {
                    const childIndex = parent.children?.findIndex(c => c.id === comment.id);
                    if (childIndex !== undefined && childIndex >= 0) {
                        parent.children?.splice(childIndex, 1, comment);
                    }
                }
            } else {
                const commentIndex = pageData.data.findIndex(c => c.id === comment.id);
                if (commentIndex !== undefined && commentIndex >= 0) {
                    pageData.data.splice(commentIndex, 1, comment);
                }
            }
            queryClient.setQueryData(['comments', pageKey], pageData);
        },
    });
};
