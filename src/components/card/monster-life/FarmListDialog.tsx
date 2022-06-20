import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { Link } from '@components/link';
import WachanFarmList from '@components/card/monster-life/WachanFarmList';
import { SearchRounded } from '@mui/icons-material';
import { MESO_KR_URL } from '@tools/constants';

interface FarmListDialogProps {
    name: string;
    open: boolean;
    onClose: () => void;
}

const FarmListDialog = (props: FarmListDialogProps) => {
    const { name, open, onClose } = props;
    const mesokr = name.replace(/[ ]/g, '+');
    return (
        <Dialog open={open} onClose={onClose} scroll='paper' fullWidth maxWidth='lg'>
            <DialogTitle>
                <Typography variant={'h3'} component={'div'}>
                    {name} - 소유 농장
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Button startIcon={<SearchRounded />}
                        size={'large'}
                        variant={'outlined'}
                        noLinkStyle
                        component={Link}
                        rel='noopener noreferrer'
                        target='_blank'
                        href={`${MESO_KR_URL}?n=${mesokr}`}>
                    meso.kr에서 보기
                </Button>
                <Divider sx={theme => ({ margin: theme.spacing(1) })} />
                <WachanFarmList name={name} />
            </DialogContent>
            <DialogActions>
                <Button sx={theme => ({ color: theme.palette.text.primary })} onClick={onClose}>
                    닫기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FarmListDialog;