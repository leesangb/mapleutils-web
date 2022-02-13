import { useCallback, useState } from 'react';
import { Alert, Paper, Snackbar } from '@mui/material';

const useCopy = (formatter: (text: string) => string = (text) => `<${text}>를(을) 복사했습니다!`) => {
    const [message, setMessage] = useState<string | null>(null);

    const copy = useCallback((text: string) => {
        setMessage(null);
        navigator.clipboard.writeText(text)
            .then(() => {
                setMessage(formatter(text));
            });
    }, []);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage(null);
    };

    const CopySnackbar = useCallback(() => (
        <Snackbar
            open={!!message}
            autoHideDuration={3000}
            onClose={handleClose}>
            <Paper elevation={8}>
                <Alert variant={'outlined'} severity={'success'}>{message}</Alert>
            </Paper>
        </Snackbar>
    ), [message]);

    return {
        copy,
        CopySnackbar,
    };
};

export default useCopy;