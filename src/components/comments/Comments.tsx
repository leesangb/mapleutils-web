import { Box, Card, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useComment } from '@components/comments/useComment';
import { Fragment, useState } from 'react';
import { CommentRounded, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import CommentItem from '@components/comments/CommentItem';
import CommentPostField from '@components/comments/CommentPostField';
import { useTranslation } from 'next-i18next';
import { Locales } from '@tools/locales';

interface CommentsProps {
    title?: string;
    pageKey: string;
    defaultOpen: boolean;
}

const Comments = ({ title = 'comment.title', pageKey: pk, defaultOpen }: CommentsProps) => {
    const { t, i18n } = useTranslation();
    const pageKey = i18n.resolvedLanguage === Locales.Korean ? pk : `en_${pk}`;
    const { comments, count, actions, isLoading, hasError } = useComment(pageKey);
    const [openComments, setOpenComments] = useState<boolean>(defaultOpen);

    const toggleOpen = () => setOpenComments(!openComments);

    return (isLoading || hasError) ? null : (
        <Card variant={'outlined'} sx={theme => ({ marginTop: theme.spacing(1) })}>
            <Box padding={theme => theme.spacing(1)}>
                <ListItem component='div' button onClick={toggleOpen}>
                    <ListItemIcon sx={theme => ({ minWidth: theme.spacing(6) })}>
                        <CommentRounded />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant='h4' component={'h2'}>
                            {t(title)} ({count})
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
