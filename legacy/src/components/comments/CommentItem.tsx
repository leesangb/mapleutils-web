import { useState } from 'react';
import CommentDeleteField from './CommentDeleteField';
import CommentEditField from './CommentEditField';
import CommentPostField from './CommentPostField';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { CommentActions } from './useComment';
import { Comment, CommentEdit, CommentPost } from './index';
import CommentHeader from './CommentHeader';
import CommentActionButtons from './CommentActionButtons';
import ChildCommentItem from './ChildCommentItem';
import CommentBody from './CommentBody';
import { Box } from '@mui/system';
import { useTranslation } from 'next-i18next';
import { ClearOutlined } from '@mui/icons-material';

interface CommentItemProps {
    comment: Comment;
    actions: CommentActions;
    pageKey: string;
}

const CommentItem = (props: CommentItemProps) => {
    const { t } = useTranslation();
    const { comment, actions, pageKey } = props;

    const [openReply, setOpenReply] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const onReply = async (comment: CommentPost) => {
        await actions.post(comment);
        setOpenReply(false);
    };

    const onEdit = async (comment: CommentEdit) => {
        const edited = await actions.edit(comment);
        setOpenEdit(!edited);
        return edited;
    };

    return (
        <>
            {comment.isDeleted ? (
                <ListItem alignItems={'center'} disableGutters>
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
                    <ListItem sx={{ paddingBottom: 0 }} alignItems='flex-start' disableGutters>
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
                                        <CommentBody text={comment.text} />
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
                                parentId={comment.id}
                                repliedTo={comment.user}
                                onPostComment={onReply}
                            />
                        </Box>
                    )}
                    {openDelete && <CommentDeleteField id={comment.id} onDeleteComment={actions.delete} />}
                </>
            )}
            <Divider />
            {comment.children && (
                <List disablePadding>
                    {comment.children.map((cc) => (
                        <ChildCommentItem
                            parentId={comment.id}
                            actions={actions}
                            pageKey={pageKey}
                            key={cc.id}
                            comment={cc}
                        />
                    ))}
                </List>
            )}
        </>
    );
};

export default CommentItem;
