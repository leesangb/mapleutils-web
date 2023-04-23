import { Card, CardContent, Typography } from '@mui/material';
import { PropsWithChildren, useMemo } from 'react';

interface TitleCardProps {
    title: string;
}

const TitleCard = (props: PropsWithChildren<TitleCardProps>) => {
    return useMemo(() => (
        <Card elevation={0}
              variant={'outlined'}
              sx={(theme) => ({
                  marginBottom: theme.spacing(1),
              })}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant={'h1'}>
                    {props.title}
                </Typography>
                {
                    props.children
                }
            </CardContent>
        </Card>
    ), [props]);
};

export default TitleCard;