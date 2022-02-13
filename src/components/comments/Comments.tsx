import {
    Card,
    CardContent,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { useComment } from '@components/comments/useComment';
import { Fragment, useState } from 'react';
import { CommentRounded, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import CommentItem from '@components/comments/CommentItem';
import CommentPostField from '@components/comments/CommentPostField';

interface CommentsProps {
    title?: string;
    pageKey: string;
}

const Comments = ({ title = '댓글', pageKey }: CommentsProps) => {
    const [comments, count, actions] = useComment(pageKey);
    const [openComments, setOpenComments] = useState<boolean>(false);

    const toggleOpen = () => setOpenComments(!openComments);

    return (
        <Card variant={'outlined'} sx={theme => ({ marginTop: theme.spacing(1) })}>
            <CardContent>
                <ListItem component='div' button onClick={toggleOpen}>
                    <ListItemIcon>
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
                    <CommentPostField pageKey={pageKey} onPostComment={actions.post} />
                    <Divider />
                    <List disablePadding>
                        {comments.map((c) => (
                            <Fragment key={c.id}>
                                <CommentItem pageKey={pageKey} comment={c} actions={actions} />
                            </Fragment>
                        ))}
                    </List>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default Comments;


