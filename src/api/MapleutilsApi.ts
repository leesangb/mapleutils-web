import { CommentDeleteDto, CommentDto, CommentEditDto, CommentPostDto } from './dto';
import { API_URL } from '@/utils/constants';

const fixComments = (comments: CommentDto[]) => comments.filter(comment => !comment.isDeleted || comment.children.length)
    .map(({
        reactions,
        ...comment
    }) => ({
        ...comment,
        reactions: decodeURI(reactions.toString()).split(',').filter(Boolean),
        creationDate: new Date(comment.creationDate),
        modificationDate: new Date(comment.modificationDate),
        children: comment.children.map(({ reactions: chReactions, ...ch }) => ({
            ...ch,
            reactions: decodeURI(chReactions.toString()).split(',').filter(Boolean),
            creationDate: new Date(ch.creationDate),
            modificationDate: new Date(ch.modificationDate),
        })),
    })).sort((c1, c2) => c2.creationDate.getTime() - c1.creationDate.getTime());

export const getComments = async (pageKey: string): Promise<CommentDto[]> => {
    const res = await fetch(`${API_URL}/Comments/${pageKey}`);
    if (!res.ok) {
        throw new Error(`Error fetching comments for ${pageKey}`);
    }
    const comments = await res.json() as CommentDto[];
    return fixComments(comments);
};
export const postComment = async (comment: CommentPostDto): Promise<CommentDto[]> => {
    const res = await fetch(`${API_URL}/Comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) {
        throw new Error(`Error posting comment for ${comment.pageKey}`);
    }
    const comments = await res.json() as CommentDto[];
    return fixComments(comments);
};

export const deleteComment = async (comment: CommentDeleteDto): Promise<CommentDto[]> => {
    const res = await fetch(`${API_URL}/Comments`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) {
        throw new Error(`Error deleting comment for ${comment.id}`);
    }
    const comments = await res.json() as CommentDto[];
    return fixComments(comments);
};

export const editComment = async (comment: CommentEditDto): Promise<CommentDto[]> => {
    const res = await fetch(`${API_URL}/Comments`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) {
        throw new Error(`Error editing comment for ${comment.id}`);
    }
    const comments = await res.json() as CommentDto[];
    return fixComments(comments);
};
