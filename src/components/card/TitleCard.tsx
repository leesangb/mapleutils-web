import { Card, CardContent, Typography } from '@mui/material';
import { useMemo } from 'react';
import { formatNumberComma } from '@tools/string';
import { useRouter } from 'next/router';
import useFetch from '@hooks/useFetch';
import { AnalyticsData } from '@api/analytics';

interface TitleCardProps {
    title: string;
    marginRight?: number;
    showAnalytics?: boolean;
}

const TitleCard = (props: TitleCardProps) => {
    const { pathname } = useRouter();
    const { data } = useFetch<AnalyticsData>(`/api/page-views?slug=${pathname}`);

    return useMemo(() => (
        <Card elevation={0}
              variant={'outlined'}
              sx={(theme) => ({
                  marginBottom: theme.spacing(1),
                  marginRight: props.marginRight
                      ? theme.spacing(props.marginRight)
                      : undefined,
              })}>
            <CardContent sx={{ display: 'flex' }}>
                <Typography variant={'h1'}>
                    {props.title}
                </Typography>
                {props.showAnalytics && data &&
                    <Typography alignSelf={'center'} marginLeft={'auto'} align={'right'} variant={'caption'}>
                        조회수 : {formatNumberComma(data.views)}
                        <br />
                        방문수 : {formatNumberComma(data.users)}</Typography>}
            </CardContent>
        </Card>
    ), [props, data]);
};

export default TitleCard;