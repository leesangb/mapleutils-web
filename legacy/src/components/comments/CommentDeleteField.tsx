import { ChangeEvent, useState } from 'react';
import { CommentDelete } from './index';
import { IconButton, InputAdornment, Snackbar, TextField, Tooltip } from '@mui/material';
import { DeleteRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Alert } from '@mui/lab';
import { useTranslation } from 'next-i18next';

interface CommentDeleteFieldProps {
    id: string;
    onDeleteComment: (comment: CommentDelete) => Promise<boolean>;
    nested: boolean;
}

const CommentDeleteField = (props: CommentDeleteFieldProps) => {
    const { t } = useTranslation();
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
                label={`${t('comment.comment')} ${t('comment.password')}`}
                required
                error={passwordError}
                inputProps={{
                    maxLength: 16,
                }}
                placeholder={`6 - 16${t('comment.letters')}`}
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
                            <Tooltip title={t('comment.deleteComment')}>
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
                    {t('comment.passwordIncorrect')}
                </Alert>
            </Snackbar>
        </>
    );
};

CommentDeleteField.defaultProps = {
    nested: false,
};

export default CommentDeleteField;
