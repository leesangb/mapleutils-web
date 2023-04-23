import { DoneRounded } from '@mui/icons-material';
import { Chip, Typography } from '@mui/material';


interface CommentHeaderProps {
    user: string;
    date: Date;
    isAdmin: boolean;
    isModified: boolean;
}

const CommentHeader = (props: CommentHeaderProps) => {
    const { user, date, isAdmin, isModified } = props;

    return (
        <>
            {isAdmin ? (
                <Chip size='small' label='상빈' icon={<DoneRounded color={'action'} />} />
            ) : (
                <Typography display='inline' fontWeight={'medium'}>
                    {user}
                </Typography>
            )}
            <Typography sx={theme => ({ marginLeft: theme.spacing(1) })} variant='caption' color='textSecondary'
                        display='inline'>
                {date.toLocaleString('ko-KR')}
                {isModified && ' (수정됨)'}
            </Typography>
        </>
    );
};

export default CommentHeader;
