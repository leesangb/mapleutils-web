import { ForwardedRef, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import { Box, Card, CardActionArea, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material';
import FavoriteButton from '../buttons/FavoriteButton';
import { LocalStorageKey } from '../../tools/localStorageHelper';
import { useTranslation } from 'next-i18next';

interface MonsterCardContentProps {
    tags: string[];
    name: string;
}

interface MonsterCardProps extends MonsterCardContentProps {
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Content = (props: PropsWithChildren<MonsterCardContentProps>) => {
    return (
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
                    {
                        props.tags.map(tag => <Grid item key={tag}>
                            <Chip size={'small'}
                                  label={tag}
                            />
                        </Grid>)
                    }
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
                        {props.children}
                    </Box>
                </CardContent>
            </Card>

            <Typography fontWeight={'medium'} align={'center'}>{props.name}</Typography>
        </Box>
    );
};

const MonsterCard = (props: PropsWithChildren<MonsterCardProps>, ref: ForwardedRef<HTMLDivElement>) => {
    const { onMouseEnter, onMouseLeave, onClick, name: nameKey, tags, children, ...otherProps } = props;
    const { t } = useTranslation('seed49');
    const name = t(nameKey);

    return (
        <Card ref={ref}
              sx={{ position: 'relative' }}
              {...otherProps}
              variant={'outlined'}
              onMouseLeave={onMouseLeave}
              onMouseEnter={onMouseEnter}>
            {
                onClick
                    ? (
                        <CardActionArea onClick={onClick}>
                            <Content tags={tags} name={name}>{children}</Content>
                        </CardActionArea>
                    ) : <Content tags={tags} name={name}>{children}</Content>
            }
            <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
                <FavoriteButton bookmarkKey={LocalStorageKey.SEED_49_BOOKMARKS} name={props.name} />
            </CardActions>
        </Card>
    );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<MonsterCardProps>>(MonsterCard);
