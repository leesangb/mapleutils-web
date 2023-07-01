import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { ChildCommentDto, CommentDto } from '@/api/dto';
import { Avatar, Typography } from '@/ds/displays';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useTranslation } from '@/i18n/client';
import { theme } from '@/ds';
import { Button } from '@/ds/inputs';
import { RiCheckFill, RiCloseFill, RiDeleteBin2Fill, RiPencilFill, RiReplyFill } from 'react-icons/ri';
import { CommentPostForm } from '@/components/comments/CommentPostForm';
import NextImage from 'next/image';
import sb from '@/assets/images/sangbin.png';
import { CommentEditForm } from '@/components/comments/CommentEditForm';
import { CommentDeleteForm } from '@/components/comments/CommentDeleteForm';
import { Reactions } from '@/components/comments/Reactions';

interface CommentListProps {
    isChild?: boolean;
}

export const CommentList = ({ isChild, children, ...props }: PropsWithChildren<CommentListProps>) => {
    return (
        <List $isChild={isChild} {...props}>
            {children}
        </List>
    );
};

const List = styled.ol<TransientProps<{ isChild?: boolean }>>`
  list-style: none;
  padding: ${({ $isChild }) => $isChild ? '0 0 0 32px' : '0'};
  margin: 0;
`;

interface CommentListItemProps {
    comment: CommentDto | ChildCommentDto;
    parentId?: string;
}

const isChildComment = (comment: CommentDto | ChildCommentDto): comment is ChildCommentDto => {
    return 'repliedTo' in comment;
};

const CommentListItem = ({ parentId, comment, children }: PropsWithChildren<CommentListItemProps>) => {
    const { locale } = useLocalizedPathname();
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const date = comment.creationDate.toLocaleString(locale);

    return (
        <ListItem>
            <CommentItem>
                <Avatar name={comment.user}>
                    {
                        comment.isAdmin
                            ? <NextImage src={sb} alt={'admin'} width={34} height={34} />
                            : comment.isDeleted && <RiCloseFill />
                    }
                </Avatar>
                <CommentContentWrapper>
                    <Typography>
                        {!comment.isDeleted && <Name>
                            {
                                comment.isAdmin
                                    ? <>상빈 <RiCheckFill /></>
                                    : comment.user
                            }
                        </Name>}
                        <Typography as={'span'} fontSize={12}
                            color={theme.text.secondary}>{date}</Typography>
                    </Typography>
                    {
                        isEditing
                            ? <>
                                <CommentEditForm comment={comment} onSucess={() => setIsEditing(false)} />
                            </>
                            : (
                                <CommentContent>
                                    {!comment.isDeleted && isChildComment(comment) && comment.repliedTo &&
                                        <ReplyTo as={'span'}>
                                            {comment.repliedTo}
                                            <RiReplyFill fontSize={12} />
                                        </ReplyTo>
                                    }
                                    <Typography style={{ marginBottom: comment.isDeleted ? '8px' : '0' }}>
                                        {comment.text || t('comment.deletedComment')}
                                    </Typography>
                                </CommentContent>
                            )
                    }
                    {
                        !comment.isDeleted && (
                            <CommentToolbar>

                                <CommentActionList>
                                    <CommentActionListItem>
                                        <Button disabled={isEditing || isDeleting} variant={'ghost'} size={'small'}
                                            onClick={() => setIsReplying(!isReplying)}>
                                            <RiReplyFill /> {isReplying ? t('cancel') : t('comment.reply')}
                                        </Button>
                                    </CommentActionListItem>
                                    <CommentActionListItem>
                                        <Button disabled={isReplying || isDeleting} variant={'ghost'} size={'small'}
                                            onClick={() => setIsEditing(!isEditing)}>
                                            <RiPencilFill /> {isEditing ? t('cancel') : t('comment.edit')}
                                        </Button>
                                    </CommentActionListItem>
                                    <CommentActionListItem>
                                        <Button disabled={isEditing || isReplying} variant={'ghost'} size={'small'}
                                            onClick={() => setIsDeleting(!isDeleting)}>
                                            <RiDeleteBin2Fill /> {isDeleting ? t('cancel') : t('comment.delete')}
                                        </Button>
                                    </CommentActionListItem>
                                </CommentActionList>
                                {comment.reactions.length > 0 && (
                                    <Reactions reactions={comment.reactions} />
                                )}

                            </CommentToolbar>
                        )
                    }
                    {
                        isReplying && (
                            <CommentPostForm onSuccess={() => setIsReplying(false)}
                                repliedTo={comment.user}
                                parentId={parentId || comment.id} />
                        )
                    }
                    {
                        isDeleting && (
                            <CommentDeleteForm onSuccess={() => setIsDeleting(false)}
                                commentId={comment.id} />
                        )
                    }
                </CommentContentWrapper>
            </CommentItem>
            {children}
        </ListItem>
    );
};

const CommentItem = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid ${theme.contour};
`;

const ListItem = styled.li`
  padding: 8px;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
  width: 100%;
`;

const Name = styled.span`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.contour};
  font-size: 14px;
  padding: 2px 6px;
  display: inline-flex;
  gap: 4px;
  align-items: center;
  margin-right: 4px;
`;

CommentList.Item = CommentListItem;

const CommentActionList = styled.ul`
  list-style: none;
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0;
`;

const CommentActionListItem = styled.li`
`;

const CommentToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ReplyTo = styled(Typography)`
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.contour};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius};
  white-space: nowrap;
`;
