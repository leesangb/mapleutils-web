import { ChangeEvent, useState } from 'react';
import { CommentDelete } from '.';
import { IconButton, InputAdornment, Snackbar, TextField, Tooltip } from '@mui/material';
import { DeleteRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Alert } from '@mui/lab';

interface CommentDeleteFieldProps {
    id: string;
    onDeleteComment: (comment: CommentDelete) => Promise<boolean>;
    nested: boolean;
}

const CommentDeleteField = (props: CommentDeleteFieldProps) => {
    const { id, onDeleteComment, nested } = props;
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);

    const handleDelete = async () => {
        const deleted = await onDeleteComment({ id, password });
        setPassword('');
        if (!deleted) {
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

    const passwordError = password.length > 0 && password.length < 6;
    const canDelete = password.length >= 6;

    return (
        <>
            <TextField
                sx={theme => ({ marginLeft: theme.spacing(nested ? 12 : 6), marginBottom: theme.spacing(2) })}
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={handleChangePassword}
                size='small'
                variant='outlined'
                label='댓글 비밀번호'
                required
                error={passwordError}
                inputProps={{
                    maxLength: 16,
                }}
                placeholder='6 - 16글자'
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
                            <Tooltip title='댓글 삭제'>
                                <span>
                                    <IconButton
                                        disabled={!canDelete}
                                        size='small'
                                        aria-label='delete comment'
                                        onClick={handleDelete}
                                    >
                                        <DeleteRounded />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
            />
            <Snackbar open={openError} autoHideDuration={5000000} onClose={handleCloseError}>
                <Alert variant='filled' onClose={handleCloseError} severity='error'>
                    비밀번호가 일치하지 않습니다.
                </Alert>
            </Snackbar>
        </>
    );
};

CommentDeleteField.defaultProps = {
    nested: false,
};

export default CommentDeleteField;
