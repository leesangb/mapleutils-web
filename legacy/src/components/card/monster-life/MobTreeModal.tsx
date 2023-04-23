import { MonsterLifeMob } from '@data/farm/mobs';
import { SearchRounded } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { Fragment, useMemo, useState } from 'react';
import { MonsterLifeFamily, monsterLifeFamilyMapping } from '@data/farm/recipes';
import { MobCard } from './index';

interface MobTreeModalProps {
    mob: MonsterLifeMob;
    compact?: boolean;
}

interface MobTreeProps {
    family?: MonsterLifeFamily;
    level: number;
    stop: boolean;
    from?: string;
}

const MobTree = ({ family, level, stop, from }: MobTreeProps) => {
    return family ? (
        <Grid container alignItems='center' justifyContent='flex-end' spacing={1}>
            <Grid item xs={12}>
                <MobCard selected={family.child.name === from} variant={'small'} hideRecipe mob={family.child} />
            </Grid>
            {!stop && (
                <>
                    {(family.father || family.mother) && (
                        <>
                            <Divider sx={theme => ({ marginRight: theme.spacing(8) })}
                                     orientation='vertical'
                                     flexItem />
                        </>
                    )}
                    <Grid item xs={11} sm={10}>
                        <MobTree family={family.father} level={level + 1} from={from} stop={false} />
                        <MobTree
                            from={from}
                            family={family.mother}
                            level={level + 1}
                            stop={family.father?.child.name === family.mother?.child.name}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    ) : null;
};

const MobTreeModal = ({ mob, compact }: MobTreeModalProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const families = useMemo(() => monsterLifeFamilyMapping[mob.name], [mob]);

    return families ? (
        <>
            {
                compact
                    ? (
                        <Tooltip title={'전체 조합식'}>
                            <IconButton size={'small'} onClick={handleOpen}
                                        sx={theme => ({ color: theme.palette.text.primary })}>
                                <SearchRounded fontSize={'small'} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Button onClick={handleOpen} sx={theme => ({ color: theme.palette.text.primary })}
                                startIcon={<SearchRounded />}>
                            <Typography noWrap variant={'body2'} component={'p'} fontWeight={'medium'}>
                                전체 조합식
                            </Typography>
                        </Button>
                    )
            }

            <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='md'>
                <DialogTitle>
                    <Typography variant={'h3'} component={'div'}>{mob.name} - 전체 조합식</Typography>
                </DialogTitle>
                <DialogContent>
                    {families.map((f) => (
                        <Fragment key={f.child.name}>
                            <Typography variant='h4' gutterBottom>
                                {f.child.name} 조합
                            </Typography>
                            <MobTree key={f.child.name} family={f} level={1} from={mob.name} stop={false} />
                            <Divider sx={theme => ({ marginBottom: theme.spacing(2) })} />
                        </Fragment>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button sx={theme => ({ color: theme.palette.text.primary })} onClick={handleClose}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    ) : null;
};

export default MobTreeModal;
