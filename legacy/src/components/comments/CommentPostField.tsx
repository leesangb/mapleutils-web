import { ChangeEvent, useReducer, useState } from 'react';
import { CommentPost } from './index';
import {
    Avatar,
    Grid,
    Hidden,
    IconButton,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { HelpRounded, SendRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

const defaultCommentPost = (pageKey: string, parentId?: string, repliedTo?: string): CommentPost => ({
    text: '',
    user: '',
    password: '',
    pageKey,
    parentId,
    repliedTo,
});

interface CommentPostAction {
    key: keyof CommentPost | 'reset';
    value?: string;
}

const commentPostReducer = (state: CommentPost, action: CommentPostAction): CommentPost => {
    if (action.key === 'reset') return defaultCommentPost(state.pageKey);
    return {
        ...state,
        [action.key]: action.value,
    };
};

interface CommentPostFieldProps {
    pageKey: string;
    onPostComment: (comment: CommentPost) => void;
    parentId?: string;
    repliedTo?: string;
}

const CommentPostField = (props: CommentPostFieldProps) => {
    const { t } = useTranslation();
    const { pageKey, onPostComment, parentId, repliedTo } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [comment, dispatchComment] = useReducer(commentPostReducer, defaultCommentPost(pageKey, parentId, repliedTo));
    const { user, password, text } = comment;

    const handleChangeComment = (key: keyof CommentPost) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatchComment({ key, value: e.target.value });
    };

    const handleClickShowPassword = () => setShowPassword((s) => !s);

    const userError = user.length > 0 && user.length < 2;
    const passwordError = password.length > 0 && password.length < 6;
    const canSend = user.length >= 2 && password.length >= 6 && text.length > 0;

    const handleSendComment = () => {
        if (!canSend) {
            return;
        }
        onPostComment(comment);
        dispatchComment({ key: 'reset' });
    };

    const openHelp = () => {
        window.open('/help/password');
    };

    return (
        <ListItem disableGutters>
            <ListItemAvatar>
                <Avatar>{user}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primaryTypographyProps={{
                    component: 'div',
                }}
                primary={
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item xs={6} sm='auto'>
                            <TextField
                                required
                                variant='outlined'
                                size='small'
                                label={t('comment.nickname')}
                                placeholder={`2 - 10${t('comment.letters')}`}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                value={user}
                                error={userError}
                                onChange={handleChangeComment('user')}
                            />
                        </Grid>
                        <Grid item xs={6} sm='auto'>
                            <TextField
                                required
                                inputProps={{
                                    maxLength: 16,
                                }}
                                variant='outlined'
                                placeholder={`6 - 16${t('comment.letters')}`}
                                type={showPassword ? 'text' : 'password'}
                                size='small'
                                label={t('comment.password')}
                                value={password}
                                error={passwordError}
                                onChange={handleChangeComment('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                size='small'
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? (
                                                    <VisibilityRounded />
                                                ) : (
                                                    <VisibilityOffRounded />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Hidden xsDown>
                            <Grid item>
                                <Tooltip title={t('comment.passwordHelp')}>
                                    <IconButton size='small' onClick={openHelp}>
                                        <HelpRounded fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Hidden>
                    </Grid>
                }
                secondaryTypographyProps={{
                    component: 'div',
                }}
                secondary={
                    <TextField
                        sx={theme => ({ marginTop: theme.spacing(1) })}
                        required
                        label={repliedTo ? t('comment.repliedTo', { name: repliedTo }) : t('comment.comment')}
                        placeholder={t('comment.commentPlaceholder')}
                        variant='outlined'
                        value={text}
                        fullWidth
                        size='small'
                        multiline
                        minRows={2}
                        maxRows={5}
                        inputProps={{
                            maxLength: 200,
                        }}
                        onChange={handleChangeComment('text')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        disabled={!canSend}
                                        size='small'
                                        aria-label='send'
                                        onClick={handleSendComment}
                                    >
                                        <SendRounded />
                                    </IconButton>
                                    <Typography component='span' variant='caption' color='textSecondary'>
                                        {text.length}/200
                                    </Typography>
                                </InputAdornment>
                            ),
                        }}
                    />
                }
            />
        </ListItem>
    );
};

export default CommentPostField;
