import { Card, CardContent, Typography } from '@mui/material';
import { useMemo } from 'react';

interface TitleCardProps {
    title: string;
}

const TitleCard = (props: TitleCardProps) => {
    return useMemo(() => (
        <Card elevation={0}
              variant={'outlined'}
              sx={(theme) => ({
                  marginBottom: theme.spacing(1),
              })}>
            <CardContent>
                <Typography variant={'h1'}>
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    ), [props]);
};

export default TitleCard;