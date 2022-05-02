import { Box, Card, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useComment } from '@components/comments/useComment';
import { Fragment, useState } from 'react';
import { CommentRounded, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import CommentItem from '@components/comments/CommentItem';
import CommentPostField from '@components/comments/CommentPostField';
import { useTranslation } from 'next-i18next';

interface CommentsProps {
    title?: string;
    pageKey: string;
    defaultOpen: boolean;
}

const Comments = ({ title = '댓글', pageKey, defaultOpen }: CommentsProps) => {
    const { i18n } = useTranslation();
    const [comments, count, actions] = useComment(pageKey);
    const [openComments, setOpenComments] = useState<boolean>(defaultOpen);

    const toggleOpen = () => setOpenComments(!openComments);

    return i18n.resolvedLanguage === 'kr' && (
        <Card variant={'outlined'} sx={theme => ({ marginTop: theme.spacing(1) })}>
            <Box padding={theme => theme.spacing(1)}>
                <ListItem component='div' button onClick={toggleOpen}>
                    <ListItemIcon sx={theme => ({ minWidth: theme.spacing(6) })}>
                        <CommentRounded />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant='h4' component={'h2'}>
                            {title} ({count})
                        </Typography>
                    </ListItemText>
                    {openComments ? <ExpandLessRounded /> : <ExpandMoreRounded />}
                </ListItem>
                <Collapse in={openComments} timeout='auto' unmountOnExit>
                    <Box padding={theme => theme.spacing(1)}>
                        <CommentPostField pageKey={pageKey} onPostComment={actions.post} />
                        <Divider />
                        <List disablePadding>
                            {comments.map((c) => (
                                <Fragment key={c.id}>
                                    <CommentItem pageKey={pageKey} comment={c} actions={actions} />
                                </Fragment>
                            ))}
                        </List>
                    </Box>
                </Collapse>
            </Box>
        </Card>
    );
};

Comments.defaultProps = {
    defaultOpen: false,
};

export default Comments;


