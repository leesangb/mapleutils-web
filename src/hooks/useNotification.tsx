import { Alert, AlertProps, Paper, Snackbar } from '@mui/material';
import { useCallback, useState } from 'react';

const useNotification = () => {
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertProps['severity']>('info');

    const notify = (message: string, severity: AlertProps['severity'] = 'info') => {
        setMessage(message);
        setSeverity(severity);
    }

    const close = () => {
        setTimeout(() => {
            setMessage('');
            setSeverity('info');
        },500);
    }

    const onClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        close();
    }

    const NotificationSnackbar = useCallback(() => (
        <Snackbar open={Boolean(message)}
                  autoHideDuration={3000}
                  onClose={onClose}>
            <Paper elevation={8}>
                <Alert variant={'outlined'} severity={severity}>
                    {message}
                </Alert>
            </Paper>
        </Snackbar>
    ), [message, severity])

    return {
        notify,
        closeNotification: close,
        NotificationSnackbar,
    }
}

export default useNotification;
