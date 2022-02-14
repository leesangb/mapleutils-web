import { MonsterLifeMob } from '@data/farm/mobs';
import { monsterLifeFamilyMapping } from '@data/farm/recipes';
import { Box, Card, CardActionArea, CardActions, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import GradeChip from '@components/card/monster-life/GradeChip';
import { getExtendCost } from '@data/farm/monsterLifeCost';
import CostChip from '@components/card/monster-life/CostChip';
import NextImage from 'next/image';
import MobBoxModal from '@components/card/monster-life/MobBoxModal';
import MobTreeModal from '@components/card/monster-life/MobTreeModal';
import { useState } from 'react';
import FarmListDialog from '@components/card/monster-life/FarmListDialog';

interface MobCardProps {
    mob: MonsterLifeMob;
    small?: boolean;
    hideRecipe?: boolean;
    selected?: boolean;
}

const StyledImg = styled(NextImage)(({ theme }) => ({
    transition: '0.2s',
    pointerEvents: 'none',
    objectFit: 'scale-down',
}));

const MobCard = (props: MobCardProps) => {
    const { mob, small, hideRecipe, selected } = props;

    const [openFarmList, setOpenFarmList] = useState<boolean>(false);

    const family = monsterLifeFamilyMapping[mob.name];
    const isBox = mob.other === '상자' || mob.name === '쁘띠 루미너스(빛)';
    const extendCost = getExtendCost(mob);

    return (
        <Card variant={'outlined'} sx={{
            width: '100%',
            position: 'relative',
        }}>
            <CardActionArea onClick={() => setOpenFarmList(true)}>
                <Box sx={(theme) => ({
                    paddingTop: theme.spacing(1),
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                })}>
                    <Grid container>
                        <Grid item xs={small ? undefined : 12}>
                            <Card elevation={0}
                                  variant={'outlined'}
                                  sx={theme => ({
                                      marginBottom: theme.spacing(1),
                                      backgroundColor: selected
                                          ? theme.palette.primary[theme.palette.mode]
                                          : theme.palette.background.default,
                                  })}>
                                <Grid direction={'column'} container
                                      sx={theme => ({ position: 'absolute', margin: theme.spacing(0) })}
                                      spacing={1}>
                                    <Grid item>
                                        <GradeChip grade={mob.grade} category={mob.category} />
                                    </Grid>
                                    {
                                        !small && extendCost > 0 && (
                                            <Grid item>
                                                <CostChip cost={extendCost} />
                                            </Grid>
                                        )
                                    }
                                </Grid>
                                <Box sx={(theme) => ({
                                    height: small ? theme.spacing(6) : theme.spacing(12),
                                    width: small ? theme.spacing(18) : '100%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    margin: theme.spacing(2),
                                    [theme.breakpoints.down('xs')]: {
                                        height: '50px',
                                    },
                                })}>
                                    <StyledImg layout={'fill'}
                                               src={mob.img}
                                               alt={mob.name} />
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={small ? true : 12}>
                            <Box sx={theme => ({ paddingLeft: theme.spacing(1) })}>
                                <Typography fontWeight={'bold'}>
                                    {mob.name}
                                </Typography>
                                <Typography variant={'body2'}
                                            paragraph
                                            noWrap
                                            sx={(theme) => ({
                                                color: theme.palette.text.secondary,
                                                height: theme.spacing(5),
                                            })}>
                                    {mob.effect}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardActionArea>
            <CardActions sx={(theme) => ({
                position: 'absolute',
                bottom: theme.spacing(0),
                right: theme.spacing(0),
            })}>
                {!hideRecipe && family && (<MobTreeModal mob={mob} />)}
                {isBox && (<MobBoxModal mob={mob} />)}
            </CardActions>
            <FarmListDialog name={mob.name} open={openFarmList} onClose={() => setOpenFarmList(false)} />
        </Card>
    );
};

export default MobCard;