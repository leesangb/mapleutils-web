import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Slider,
    styled,
    Typography,
} from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Comments } from '@components/comments';
import NextImage from 'next/image';
import { useSeed42Store } from '@store/useSeed42Store';

interface Seed42Props {
}

const LayerImage = styled('img')`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const Seed42 = ({}: Seed42Props) => {
    const { t } = useTranslation('seed42');
    const seoProps = useI18nSeoProps('seed42');
    const { route, setRoute, opacity, setOpacity } = useSeed42Store(state => state);
    return (
        <>
            <Seo {...seoProps} image={'/images/42.png'} />
            <I18nTitleCard ns={'seed42'} />

            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <Typography variant={'h3'} gutterBottom>
                        {t('fakePlatforms')}
                    </Typography>
                    <Box sx={{
                        position: 'relative',
                        width: 'min(1704px, 100%)',
                    }}>
                        <NextImage style={{ position: 'relative', top: 0, left: 0 }} draggable={false}
                                   src={'/images/seed/42/background.png'} width={1704} height={1000} />
                        <LayerImage src={'/images/seed/42/route.png'} draggable={false} />
                        <LayerImage src={'/images/seed/42/trap.png'} sx={{ opacity: opacity / 100 }}
                                    draggable={false} />
                        {route === 'route1' && <LayerImage src={'/images/seed/42/path1.png'} draggable={false} />}
                        {route === 'route2' && <LayerImage src={'/images/seed/42/path2.png'} draggable={false} />}
                    </Box>
                    <Grid container spacing={1} alignItems={'center'}
                          justifyContent={'center'}>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                            <img style={{ maxWidth: 200 }} src={'/images/seed/42/help.png'} alt={'help'}
                                 draggable={false} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography align={'center'}>
                                {t('fakePlatformsOpacity')}
                            </Typography>
                            <Slider value={opacity}
                                    onChange={(e, v) => setOpacity(v as number)}
                                    min={0}
                                    max={100} />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                            <FormControl>
                                <FormLabel id='route-radio'>{t('path')}</FormLabel>
                                <RadioGroup row aria-labelledby='route-radio' name='route-radio-group'
                                            value={route}
                                            onChange={e => setRoute((e.target as HTMLInputElement).value as typeof route)}>
                                    <FormControlLabel value='none' control={<Radio />} label={t('none')} />
                                    <FormControlLabel value='route1' control={<Radio />} label={t('path1')} />
                                    <FormControlLabel value='route2' control={<Radio />} label={t('path2')} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Typography variant={'h3'} gutterBottom>
                        {t('lastPart')}
                    </Typography>

                    <NextImage src={'/images/seed/42/end.png'} alt={''} width={852} height={370} />

                </CardContent>
            </Card>

            <Comments pageKey={'seed42'} />
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed42'])),
        },
    };
};

export default Seed42;
