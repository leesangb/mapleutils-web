import { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DeleteRounded, EditRounded, ReplyRounded } from '@mui/icons-material';

interface CommentActionButtonsProps {
    reply: boolean;
    setReply: Dispatch<SetStateAction<boolean>>;
    delete: boolean;
    setDelete: Dispatch<SetStateAction<boolean>>;
    edit: boolean;
    setEdit: Dispatch<SetStateAction<boolean>>;
}

const CommentActionButtons = (props: CommentActionButtonsProps) => {
    const { reply, setReply, setDelete, edit, setEdit } = props;

    const toggleReply = () => {
        setReply((o) => !o);
    };
    const toggleDelete = () => {
        setDelete((d) => !d);
    };
    const toggleEdit = () => {
        setEdit((e) => !e);
    };

    return (
        <Box>
            <Button size={'small'}
                    startIcon={<ReplyRounded fontSize={'small'} />}
                    sx={theme => ({ color: theme.palette.text.secondary })}
                    disabled={props.delete || edit}
                    onClick={props.delete || edit ? undefined : toggleReply}>
                {reply ? '취소' : '답글'}
            </Button>
            <Button size={'small'}
                    startIcon={<EditRounded fontSize={'small'} />}
                    sx={theme => ({ color: theme.palette.text.secondary })}
                    disabled={props.delete || reply}
                    onClick={props.delete || reply ? undefined : toggleEdit}>
                {edit ? '취소' : '수정'}
            </Button>
            <Button size={'small'}
                    startIcon={<DeleteRounded fontSize={'small'} />}
                    sx={theme => ({ color: theme.palette.text.secondary })}
                    disabled={props.reply || edit}
                    onClick={reply || edit ? undefined : toggleDelete}>
                {props.delete ? '취소' : '삭제'}
            </Button>
        </Box>
    );
};

export default CommentActionButtons;
