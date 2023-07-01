'use client';

import { Card } from '@/ds/surfaces';
import { Typography } from '@/ds/displays';
import { CommentList } from '@/components/comments/CommentList';
import { Fragment } from 'react';
import styled from 'styled-components';
import { useTranslation } from '@/i18n/client';
import { RiChat1Fill } from 'react-icons/ri';
import { CommentPostForm } from '@/components/comments/CommentPostForm';
import { useGetComments } from '@/api/useMapleutilsApiQuery';

interface CommentsProps {
}

export const Comments = ({}: CommentsProps) => {
    const { t } = useTranslation();
    const { data: comments, isLoading, isError } = useGetComments();
    const count = comments.length + comments.reduce((acc, { children }) => acc + children.length, 0);

    return (
        <Card as={'aside'} style={{ gridArea: 'comments' }}>
            <Typography as={'h2'} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RiChat1Fill /> {t('comment.comment')} {count}
            </Typography>
            <Hr />
            <CommentPostForm />
            <CommentList>
                {comments.map((comment) => <Fragment key={comment.id}>
                    <CommentList.Item comment={comment}>
                        {comment.children.length ?
                            <CommentList isChild>
                                {comment.children.map((child) => <CommentList.Item key={child.id}
                                    parentId={comment.id}
                                    comment={child}
                                />)}
                            </CommentList>
                            : null}
                    </CommentList.Item>
                </Fragment>)}
            </CommentList>
        </Card>
    );
};

const Hr = styled.hr`
  margin-bottom: 4px;
`;
