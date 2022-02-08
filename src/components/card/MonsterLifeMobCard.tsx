import { MonsterLifeMob } from '@data/farm/mobs';
import { monsterLifeFamilyMapping } from '@data/farm/recipes';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { CardGiftcardRounded, SearchRounded } from '@mui/icons-material';

interface MonsterLifeMobCardProps {
    mob: MonsterLifeMob;
}

const StyledImg = styled('img')(({ theme }) => ({
    transition: '0.2s',
    pointerEvents: 'none',
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: theme.spacing(3),
    margin: 'auto',
}));

const MonsterLifeMobCard = (props: MonsterLifeMobCardProps) => {
    const { mob } = props;

    const family = monsterLifeFamilyMapping[mob.name];
    const isBox = mob.other === '상자' || mob.name === '쁘띠 루미너스(빛)';

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
                            <Grid item>
                                <Chip size={'small'}
                                      avatar={<Avatar>{mob.grade}</Avatar>}
                                      label={mob.category}
                                />
                            </Grid>
                        </Grid>
                        <CardContent>
                            <Box sx={theme => ({
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: theme.spacing(1),
                                marginBottom: theme.spacing(1),
                                position: 'relative',
                            })}>
                                <Box sx={(theme) => ({
                                    height: '100px',
                                    width: '100%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    [theme.breakpoints.down('xs')]: {
                                        height: '50px',
                                    },
                                })}>
                                    <StyledImg src={`/images/monster-life/${mob.name}.png`}
                                               alt={mob.name} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Box sx={theme => ({ paddingLeft: theme.spacing(1) })}>
                        <Typography fontWeight={'bold'}>
                            {mob.name}
                        </Typography>
                        <Typography variant={'body2'}
                                    paragraph
                                    sx={(theme) => ({
                                        color: theme.palette.text.secondary,
                                        height: theme.spacing(3),
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

export default MonsterLifeMobCard;