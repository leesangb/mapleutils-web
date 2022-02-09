import { MonsterLifeMob } from '@data/farm/mobs';
import { monsterLifeFamilyMapping } from '@data/farm/recipes';
import { Button, Card, CardActionArea, CardActions, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { CardGiftcardRounded, SearchRounded } from '@mui/icons-material';
import GradeChip from '@components/card/monster-life/GradeChip';
import { getExtendCost } from '@data/farm/monsterLifeCost';
import CostChip from '@components/card/monster-life/CostChip';
import NextImage from 'next/image';

interface MobCardProps {
    mob: MonsterLifeMob;
}

const StyledImg = styled(NextImage)(({ theme }) => ({
    transition: '0.2s',
    pointerEvents: 'none',
    objectFit: 'scale-down',
}));

const MobCard = (props: MobCardProps) => {
    const { mob } = props;

    const family = monsterLifeFamilyMapping[mob.name];
    const isBox = mob.other === '상자' || mob.name === '쁘띠 루미너스(빛)';
    const extendCost = getExtendCost(mob);

    return (
        <Card variant={'outlined'} sx={{
            width: '100%',
            position: 'relative',
        }}>
            <CardActionArea>
                <Box sx={(theme) => ({ padding: theme.spacing(1) })}>
                    <Card elevation={0}
                          variant={'outlined'}
                          sx={theme => ({
                              marginBottom: theme.spacing(1),
                              backgroundColor: theme.palette.background.default,
                          })}>
                        <Grid direction={'column'} container
                              sx={theme => ({ position: 'absolute', margin: theme.spacing(0) })}
                              spacing={1}>
                            {
                                extendCost > 0 && (
                                    <Grid item>
                                        <CostChip cost={extendCost} />
                                    </Grid>
                                )
                            }
                            <Grid item>
                                <GradeChip grade={mob.grade} category={mob.category} />
                            </Grid>
                        </Grid>
                        <Box sx={(theme) => ({
                            height: '100px',
                            width: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            margin: theme.spacing(2),
                            [theme.breakpoints.down('xs')]: {
                                height: '50px',
                            },
                        })}>
                            <StyledImg layout={'fill'}
                                       src={`/images/monster-life/${mob.name}.png`}
                                       alt={mob.name} />
                        </Box>
                    </Card>
                    <Box sx={theme => ({ paddingLeft: theme.spacing(1) })}>
                        <Typography fontWeight={'bold'}>
                            {mob.name}
                        </Typography>
                        <Typography variant={'body2'}
                                    paragraph
                                    sx={(theme) => ({
                                        color: theme.palette.text.secondary,
                                        height: theme.spacing(7),
                                        whiteSpace: mob.effect.includes('\n') ? 'pre' : 'none',
                                    })}>
                            {mob.effect}
                        </Typography>
                    </Box>

                </Box>
            </CardActionArea>
            <CardActions sx={(theme) => ({
                position: 'absolute',
                bottom: theme.spacing(0),
                right: theme.spacing(0),
            })}>
                {
                    family && (
                        <Button sx={theme => ({ color: theme.palette.text.primary })}
                                startIcon={<SearchRounded />}>
                            전체 조합식
                        </Button>
                    )
                }
                {
                    isBox && (
                        <Button sx={theme => ({ color: theme.palette.text.primary })}
                                startIcon={<CardGiftcardRounded />}>
                            상자
                        </Button>
                    )
                }

            </CardActions>
        </Card>
    );
};

export default MobCard;