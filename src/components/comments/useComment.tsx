import { useEffect, useMemo, useState } from 'react';
import { API_URL } from '@tools/config';
import { Comment, CommentDelete, CommentEdit, CommentPost } from '@components/comments/index';

const fixDate = (comments: Comment[]): Comment[] => {
    return comments.map((c) => ({
        ...c,
        creationDate: new Date(c.creationDate),
        modificationDate: new Date(c.modificationDate),
        children: c.children.map((ch) => ({
            ...ch,
            creationDate: new Date(ch.creationDate),
            modificationDate: new Date(ch.modificationDate),
        })),
    }));
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
            callback(fixDate(comments));
            return true;
        } catch (error) {
            return false;
        }
    }
    return false;
};

export const useComment = (page: string): [Comment[], number, CommentActions] => {
    const [comments, setComments] = useState<Comment[]>([]);
    const totalCount = useMemo(() => comments.reduce((acc, val) => acc + 1 + val.children.length, 0), [comments]);

    useEffect(() => {
        fetch(`${API_URL}/Comments/${page}`)
            .then((response) => response.json())
            .catch((err) => {
            })
            .then((c: Comment[]) => setComments(
                fixDate(c)
                    .sort((c1, c2) => c2.creationDate.getTime() - c1.creationDate.getTime())))
            .catch((err) => {
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

    const action: CommentActions = {
        post,
        delete: remove,
        edit,
    };

    return [comments, totalCount, action];
};
