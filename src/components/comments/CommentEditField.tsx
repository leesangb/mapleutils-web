import { ChangeEvent, useState } from 'react';
import { CommentBase, CommentEdit } from '.';
import { IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { SendRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Alert } from '@mui/lab';

interface CommentEditFieldProps {
    comment: CommentBase;
    onEditComment: (comment: CommentEdit) => Promise<boolean>;
}

const CommentEditField = (props: CommentEditFieldProps) => {
    const { comment, onEditComment } = props;

    const [password, setPassword] = useState<string>('');
    const [text, setText] = useState<string>(comment.text);
    const [openError, setOpenError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const canSend = password.length >= 6 && text.length > 0;
    const passwordError = password.length > 0 && password.length < 6;

    const handleSendComment = async () => {
        if (!canSend) {
            return;
        }
        const edited = await onEditComment({ text, password, id: comment.id });
        setPassword('');
        if (edited) {
            setText('');
        } else {
            setOpenError(true);
        }
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((s) => !s);

    return (
        <>
            <TextField
                required
                value={password}
                error={passwordError}
                inputProps={{
                    maxLength: 16,
                }}
                type={showPassword ? 'text' : 'password'}
                onChange={handleChangePassword}
                variant='outlined'
                placeholder='6 - 16글자'
                size='small'
                label='비밀번호'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                size='small'
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityRounded /> : <VisibilityOffRounded />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                required
                sx={theme => ({ marginTop: theme.spacing(1) })}
                value={text}
                onChange={handleChangeText}
                label={'댓글 수정'}
                placeholder='댓글 추가...'
                variant='outlined'
                fullWidth
                size='small'
                multiline
                rows={2}
                inputProps={{
                    maxLength: 200,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton disabled={!canSend} size='small' aria-label='send' onClick={handleSendComment}>
                                <SendRounded />
                            </IconButton>
                            <Typography variant='caption' color='textSecondary'>
                                {text.length}/200
                            </Typography>
                        </InputAdornment>
                    ),
                }}
            />
            <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert variant='filled' onClose={handleCloseError} severity='error'>
                    비밀번호가 일치하지 않습니다.
                </Alert>
            </Snackbar>
        </>
    );
};

export default CommentEditField;
