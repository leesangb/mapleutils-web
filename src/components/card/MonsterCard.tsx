import { ForwardedRef, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import { Box, Card, CardActionArea, CardContent, Chip, Grid, Typography } from '@mui/material';

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

            <Typography align={'center'}>{props.name}</Typography>
        </Box>
    );
};

const MonsterCard = (props: PropsWithChildren<MonsterCardProps>, ref: ForwardedRef<HTMLDivElement>) => {
    const { onMouseEnter, onMouseLeave, onClick, name, tags, children, ...otherProps } = props;

    return (
        <Card ref={ref}
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
        </Card>
    );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<MonsterCardProps>>(MonsterCard);