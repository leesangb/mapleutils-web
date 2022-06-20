import { Box, Card, CardActionArea, CardContent, Chip, Grid, Typography } from '@mui/material';
import { Link } from '@components/link';
import { styled } from '@mui/system';
import NextImage from 'next/image';
import { MAPLE_GG_URL } from '@tools/constants';


const StyledImg = styled(NextImage)(() => ({
    transition: '0.2s',
    pointerEvents: 'none',
}));


interface CharacterCardProps {
    name: string;
    server: string;
    job: string;
}

const CharacterCard = ({ name, server, job }: CharacterCardProps) => {
    const imageSrc = `/images/characters/${name}.png`;
    const maplegg = `${MAPLE_GG_URL}/u/${name}`;
    return (
        <Card variant={'outlined'}>
            <CardActionArea component={Link} href={maplegg} target={'_blank'} rel={'noopener noreferrer'}>
                <Box sx={theme => ({
                    padding: theme.spacing(1),
                })}>
                    <Card elevation={0}
                          variant={'outlined'}
                          sx={theme => ({
                              marginBottom: theme.spacing(1),
                              backgroundColor: theme.palette.background.default,
                          })}>
                        <Grid direction={'column'} container
                              sx={theme => ({ position: 'absolute', margin: theme.spacing(0) })} spacing={1}>
                            <Grid item>
                                <Chip size={'small'} label={server} />
                            </Grid>
                            <Grid item>
                                <Chip size={'small'} label={job} />
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
                                <StyledImg src={imageSrc} width={96} height={96} alt={name} />
                            </Box>
                        </CardContent>
                    </Card>

                    <Typography fontWeight={'medium'} align={'center'}>{name}</Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default CharacterCard;