import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { CardGiftcardRounded } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { getMonsterBox, MonsterLifeBox } from '@data/farm/monsterLifeBox';
import { MonsterLifeMob } from '@data/farm/mobs';
import CostChip from './CostChip';
import { Box, styled } from '@mui/system';
import NextImage from 'next/image';

interface MobBoxModalProps {
    mob: MonsterLifeMob;
    compact?: boolean;
}

interface BoxCardProps {
    box: MonsterLifeBox;
}

const StyledImg = styled(NextImage)(({ theme }) => ({
    transition: '0.2s',
    pointerEvents: 'none',
    objectFit: 'scale-down',
}));

const BoxCard = ({ box }: BoxCardProps) => {
    return (
        <Card variant={'outlined'}>
            <Box padding={1}>
                <Card elevation={0} variant={'outlined'} sx={theme => ({
                    marginBottom: theme.spacing(1),
                    backgroundColor: theme.palette.background.default,
                    width: theme.spacing(30),
                })}>
                    <Grid direction={'column'} container
                          sx={theme => ({ position: 'absolute', margin: theme.spacing(0) })}
                          spacing={1}>
                        {
                            box.price.map((p) => (
                                <Grid item key={p}>
                                    <CostChip cost={p} />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Box sx={(theme) => ({
                        height: '100px',
                        width: '90%',
                        overflow: 'hidden',
                        position: 'relative',
                        margin: theme.spacing(2),
                        [theme.breakpoints.down('xs')]: {
                            height: '50px',
                        },
                    })}>
                        <StyledImg layout={'fill'}
                                   src={box.img}
                                   alt={box.name} />
                    </Box>
                </Card>
                <Box sx={theme => ({ paddingLeft: theme.spacing(1) })}>
                    <Typography align={'center'} noWrap fontWeight={'bold'}>
                        {box.name}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};


const MobBoxModal = ({ mob, compact }: MobBoxModalProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const boxes = useMemo(() => getMonsterBox(mob), [mob]);

    return (
        <>
            {
                compact
                    ? (
                        <Tooltip title={'상자'}>
                            <IconButton size={'small'} onClick={handleOpen}
                                        sx={theme => ({ color: theme.palette.text.primary })}>
                                <CardGiftcardRounded fontSize={'small'} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Button onClick={handleOpen} sx={theme => ({ color: theme.palette.text.primary })}
                                startIcon={<CardGiftcardRounded />}>
                            <Typography noWrap variant={'body2'} component={'p'} fontWeight={'medium'}>
                                상자
                            </Typography>
                        </Button>
                    )
            }

            <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='lg'>
                <DialogTitle>
                    <Typography variant={'h3'} component={'div'}>
                        어떤 상자에서 나오나요?
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} justifyContent='center'>
                        {boxes.map((b) => (
                            <Grid item xs key={b.name}>
                                <BoxCard box={b} />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={theme => ({ color: theme.palette.text.primary })} onClick={handleClose}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MobBoxModal;
