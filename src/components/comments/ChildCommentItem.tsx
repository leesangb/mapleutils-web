import { useState } from 'react';
import { ChildComment, CommentEdit, CommentPost } from '.';
import CommentActionButtons from './CommentActionButtons';
import CommentDeleteField from './CommentDeleteField';
import CommentEditField from './CommentEditField';
import CommentPostField from './CommentPostField';
import { CommentActions } from '@components/comments/useComment';
import CommentHeader from '@components/comments/CommentHeader';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import CommentBody from '@components/comments/CommentBody';
import { Box } from '@mui/system';
import { ClearOutlined } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface ChildCommentItemProps {
    comment: ChildComment;
    parentId: string;
    actions: CommentActions;
    pageKey: string;
}

const ChildCommentItem = (props: ChildCommentItemProps) => {
    const { t } = useTranslation();
    const { comment, pageKey, actions, parentId } = props;

    const [openReply, setOpenReply] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const onReply = async (comment: CommentPost) => {
        const posted = await actions.post(comment);
        setOpenReply(!posted);
    };

    const onEdit = async (comment: CommentEdit) => {
        const edited = await actions.edit(comment);
        setOpenEdit(!edited);
        return edited;
    };

    return (
        <>
            {comment.isDeleted ? (
                <ListItem sx={theme => ({ paddingLeft: theme.spacing(6), paddingBottom: 1 })}
                          alignItems={'center'} disableGutters>
                    <ListItemAvatar>
                        <Avatar>
                            <ClearOutlined />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        {t('comment.deletedComment')}
                    </ListItemText>
                </ListItem>
            ) : (
                <>
                    <ListItem sx={theme => ({ paddingLeft: theme.spacing(6), paddingBottom: 0 })}
                              alignItems='flex-start'
                              disableGutters>
                        <ListItemAvatar>
                            {
                                comment.isAdmin
                                    ? <Avatar src={'/images/sangbin.png'} />
                                    : <Avatar>{comment.user.substring(0, 2)}</Avatar>
                            }
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <CommentHeader
                                    user={comment.user}
                                    date={comment.creationDate}
                                    isAdmin={comment.isAdmin}
                                    isModified={comment.creationDate.getTime() !== comment.modificationDate.getTime()}
                                />
                            }
                            secondaryTypographyProps={{ component: 'div' }}
                            secondary={
                                <>
                                    {openEdit ? (
                                        <CommentEditField comment={comment} onEditComment={onEdit} />
                                    ) : (
                                        <CommentBody repliedTo={comment.repliedTo} text={comment.text} />
                                    )}
                                    <CommentActionButtons
                                        reply={openReply}
                                        setReply={setOpenReply}
                                        delete={openDelete}
                                        setDelete={setOpenDelete}
                                        edit={openEdit}
                                        setEdit={setOpenEdit}
                                        reactions={comment.reactions}
                                    />
                                </>
                            }
                        />
                    </ListItem>
                    {openReply && (
                        <Box marginLeft={theme => theme.spacing(6)}>
                            <CommentPostField
                                pageKey={pageKey}
                                parentId={parentId}
                                repliedTo={comment.user}
                                onPostComment={onReply}
                            />
                        </Box>
                    )}
                    {openDelete && <CommentDeleteField nested id={comment.id} onDeleteComment={actions.delete} />}

                </>
            )}
            <Divider sx={theme => ({ marginLeft: theme.spacing(6) })} />
        </>
    );
};

export default ChildCommentItem;
