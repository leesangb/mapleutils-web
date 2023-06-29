'use client';

import { Languages } from '@/i18n/settings';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, editComment, getComments, postComment } from '@/api/MapleutilsApi';
import { CommentDeleteDto, CommentEditDto, CommentPostDto } from './dto';

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
        queryFn: async () => await getComments(pageKey),
        initialData: [],
    });
};

export const usePostComment = () => {
    const { pathname, locale } = useLocalizedPathname();
    const pageKey = getCommentPageKey(pathname, locale);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (comment: Omit<CommentPostDto, 'pageKey'>) => await postComment({ ...comment, pageKey }),
        onSuccess: (data) => {
            queryClient.setQueryData(['comments', pageKey], data);
        },
    });
};

export const useDeleteComment = () => {
    const { pathname, locale } = useLocalizedPathname();
    const pageKey = getCommentPageKey(pathname, locale);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (comment: CommentDeleteDto) => await deleteComment(comment),
        onSuccess: (data) => {
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
        onSuccess: (data) => {
            queryClient.setQueryData(['comments', pageKey], data);
        },
    });
};
