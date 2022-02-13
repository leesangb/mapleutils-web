import { Seo, SeoProps } from '@components/seo';
import { TitleCard } from '@components/card';
import { Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { OptionName } from '@data/farm';
import { mobsByEffect } from '@data/farm/mobsByEffect';
import { MobCard } from '@components/card/monster-life';

const seoProps: SeoProps = {
    title: '몬스터 라이프 - 몬스터 정리',
    keywords: [
        '몬스터 라이프',
        '몬라',
        '와르',
        '젬',
        '조합',
        '레시피',
        '농장',
        '농린이',
        '몬스터',
        '라이프',
        '추천',
        '검색',
        'SS급',
        '스페셜',
    ],
    description: '옵션별로 몬스터를 찾아보세요!',
    image: '/images/information.png',
};

const FarmInfo = () => {
    const [selected, setSelected] = useState<OptionName>('농장');
    const information = mobsByEffect.find(m => m.name === selected)!;

    return (
        <>
            <Seo {...seoProps} />
            <TitleCard title={'몬스터 라이프 몬스터 정리'} />
            <Card variant={'outlined'}>
                <CardContent>
                    {mobsByEffect.map(m => <Chip key={m.name}
                                                 sx={theme => ({ margin: theme.spacing(0.5) })}
                                                 color={'primary'}
                                                 clickable
                                                 onClick={() => setSelected(m.name)}
                                                 variant={selected === m.name ? 'filled' : 'outlined'}
                                                 label={m.name} />)}
                    <Divider sx={theme => ({ margin: theme.spacing(1) })} />


                    <Typography gutterBottom variant='h2'>
                        {information.name}
                    </Typography>
                    <Typography gutterBottom variant='h3'>
                        스페셜 몬스터
                    </Typography>
                    <Grid container spacing={2}>
                        {information.mobs.map((m) => (
                            <Grid item xs={12} sm={6} md={4} key={m.name}>
                                <MobCard mob={m} />
                            </Grid>
                        ))}
                    </Grid>

                    {information.normals.length > 0 && (
                        <>
                            <Divider sx={theme => ({ margin: theme.spacing(1) })} />
                            <Typography gutterBottom variant='h3'>
                                일반 몬스터
                            </Typography>
                            <Grid container spacing={2}>
                                {information.normals.map((m) => (
                                    <Grid item xs={12} sm={6} md={4} key={m.name}>
                                        <MobCard mob={m} />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default FarmInfo;