import { MonsterLifeMob } from '@data/farm/mobs';
import { monsterLifeFamilyMapping } from '@data/farm/recipes';
import { Box, Card, CardActionArea, CardActions, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import GradeChip from './GradeChip';
import { getExtendCost } from '@data/farm/monsterLifeCost';
import CostChip from './CostChip';
import NextImage from 'next/image';
import MobBoxModal from './MobBoxModal';
import MobTreeModal from './MobTreeModal';
import { useState } from 'react';
import FarmListDialog from './FarmListDialog';
import { LocalStorageKey } from '../../../tools/localStorageHelper';
import FavoriteButton from '../../buttons/FavoriteButton';

interface MobCardProps {
    mob: MonsterLifeMob;
    variant?: 'small' | 'default' | 'compact';
    hideRecipe?: boolean;
    selected?: boolean;
    compact?: boolean;
}

const StyledImg = styled(NextImage)(({ theme }) => ({
    transition: '0.2s',
    pointerEvents: 'none',
    objectFit: 'scale-down',
}));

const MobCard = (props: MobCardProps) => {
    const { mob, variant, hideRecipe, selected } = props;
    const small = variant === 'small';
    const compact = variant === 'compact';

    const [openFarmList, setOpenFarmList] = useState<boolean>(false);

    const family = monsterLifeFamilyMapping[mob.name];
    const isBox = mob.other === '상자' || mob.name === '쁘띠 루미너스(빛)';
    const extendCost = getExtendCost(mob);

    return (
        <Card variant={'outlined'} sx={{
            width: '100%',
            position: 'relative',
        }}>
            <CardActions sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
                <FavoriteButton bookmarkKey={LocalStorageKey.BOOKMARKS} compact={compact} name={mob.name} />
            </CardActions>
            <CardActionArea sx={(theme) => ({
                paddingTop: theme.spacing(1),
                paddingLeft: theme.spacing(1),
                paddingRight: theme.spacing(1),
            })} onClick={() => setOpenFarmList(true)}>
                <Grid container>
                    <Grid item xs={small || compact ? undefined : 12}>
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
                                    !small && !compact && extendCost > 0 && (
                                        <Grid item>
                                            <CostChip cost={extendCost} />
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <Box sx={(theme) => ({
                                height: small ? theme.spacing(6) : compact ? theme.spacing(6) : theme.spacing(12),
                                width: small ? theme.spacing(18) : compact ? theme.spacing(9) : '100%',
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
                    <Grid item xs={small || compact ? true : 12}>
                        <Box sx={theme => ({ paddingLeft: theme.spacing(1) })}>
                            <Typography fontSize={compact ? '22px' : undefined}
                                        fontWeight={'bold'}>
                                {mob.name}
                            </Typography>
                            <Typography variant={'body2'}
                                        paragraph
                                        noWrap={!compact}
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                            height: theme.spacing(5),
                                        })}>
                                {mob.effect}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardActionArea>
            <CardActions sx={(theme) => ({
                position: 'absolute',
                bottom: theme.spacing(0),
                right: theme.spacing(0),
            })}>
                {!hideRecipe && family && (<MobTreeModal mob={mob} compact={compact} />)}
                {isBox && (<MobBoxModal mob={mob} compact={compact} />)}
            </CardActions>
            <FarmListDialog name={mob.name} open={openFarmList} onClose={() => setOpenFarmList(false)} />
        </Card>
    );
};

MobCard.defaultProps = {
    variant: 'default',
};

export default MobCard;
