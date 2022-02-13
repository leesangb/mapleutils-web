import { Typography } from '@mui/material';

interface CommentBodyProps {
    repliedTo?: string;
    text: string;
}

const CommentBody = (props: CommentBodyProps) => {
    const { repliedTo, text } = props;

    return (
        <>
            <Typography component='div' color='textPrimary'>
                {repliedTo && (
                    <Typography component='span' variant={'subtitle2'} color={'textSecondary'}>
                        {`${repliedTo} - `}
                    </Typography>
                )}
                {text}
            </Typography>
        </>
    );
};

export default CommentBody;
