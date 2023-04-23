import { useEffect, useMemo, useState } from 'react';
import { API_URL } from '../../tools/config';
import { Comment, CommentDelete, CommentEdit, CommentPost } from './index';

const fixDateAndSort = (comments: Comment[]): Comment[] => {
    return comments
        .map(({ reactions, ...c }) => ({
            ...c,
            reactions: decodeURI(reactions.toString()).split(',').filter(Boolean),
            creationDate: new Date(c.creationDate),
            modificationDate: new Date(c.modificationDate),
            children: c.children.map(({ reactions: chReactions, ...ch }) => ({
                ...ch,
                reactions: decodeURI(chReactions.toString()).split(',').filter(Boolean),
                creationDate: new Date(ch.creationDate),
                modificationDate: new Date(ch.modificationDate),
            })),
        }))
        .sort((c1, c2) => c2.creationDate.getTime() - c1.creationDate.getTime());
};

export interface CommentActions {
    post: (comment: CommentPost) => Promise<boolean>;
    delete: (comment: CommentDelete) => Promise<boolean>;
    edit: (comment: CommentEdit) => Promise<boolean>;
}

const tryFixAndReturn = async (response: Response, callback: (comments: Comment[]) => void): Promise<boolean> => {
    if (response.ok) {
        const comments: Comment[] = await response.json();
        try {
            callback(fixDateAndSort(comments));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return false;
};

export const useComment = (page: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const totalCount = useMemo(() => comments.reduce((acc, val) => acc + 1 + val.children.length, 0), [comments]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/Comments/${page}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch((err) => {
                setHasError(true);
                console.error(err);
            })
            .then((c: Comment[]) => setComments(fixDateAndSort(c).filter(c => !c.isDeleted || c.children.length)))
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    const post = async (comment: CommentPost): Promise<boolean> => {
        const response = await fetch(`${API_URL}/Comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        return await tryFixAndReturn(response, setComments);
    };

    const remove = async (comment: CommentDelete): Promise<boolean> => {
        const response = await fetch(`${API_URL}/Comments`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        return await tryFixAndReturn(response, setComments);
    };

    const edit = async (comment: CommentEdit): Promise<boolean> => {
        const response = await fetch(`${API_URL}/Comments`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        return await tryFixAndReturn(response, setComments);
    };

    const actions: CommentActions = {
        post,
        delete: remove,
        edit,
    };

    return { comments, count: totalCount, actions, isLoading, hasError };
};
