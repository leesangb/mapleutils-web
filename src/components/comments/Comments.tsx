'use client';

import { Card } from '@/ds/surfaces';
import { Typography } from '@/ds/displays';
import { CommentList } from '@/components/comments/CommentList';
import { Fragment, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from '@/i18n/client';
import { RiChat1Fill } from 'react-icons/ri';
import { CommentPostForm } from '@/components/comments/CommentPostForm';
import { useGetComments } from '@/api/useMapleutilsApiQuery';
import { Widget } from '@/ds/surfaces/widget/Widget';
import { Button } from '@/ds/inputs';
import useAnimationState from '@/hooks/useAnimationState';

interface CommentsProps {
}

export const Comments = ({}: CommentsProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { data: comments, isLoading, isError, isFetched } = useGetComments();
    const count = comments.length + comments.reduce((acc, { children }) => acc + children.length, 0);

    const { state, open, close } = useAnimationState(125);

    useEffect(() => {
        if (isFetched || isLoading) {
            open();
        }
    }, [isFetched, isLoading]);

    return (
        <Container ref={ref}>
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
            <Widget>
                <ScrollToComments data-state={state} onClick={() => {
                    ref.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                    <RiChat1Fill /> {count}
                </ScrollToComments>
            </Widget>
        </Container>
    );
};

const Hr = styled.hr`
  margin-bottom: 4px;
`;

const Container = styled(Card).attrs({ as: 'aside' })`
  grid-area: comments;
  width: 100%;
  scroll-margin-top: calc(${({ theme }) => theme.appBar.height} + 16px);
`;

const ScrollToComments = styled(Button)`
  backdrop-filter: blur(4px);
  transform: scale(0);
  transition: transform 0.125s ease-in-out;

  &[data-state="opened"] {
    transform: scale(1);
  }

  &[data-state="closing"] {
    transform: scale(0);
  }

  &[data-state="closed"] {
    display: none;
  }
`;
