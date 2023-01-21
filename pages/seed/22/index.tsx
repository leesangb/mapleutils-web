import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps,
    Box,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    styled,
    Typography,
} from '@mui/material';
import NextImage from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Comments } from '@components/comments';
import { useState } from 'react';
import { ArrowForwardIosSharp } from '@mui/icons-material';

const LayerImage = styled('img')`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    borderRadius: '16px',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const Seed22 = () => {
    const { t } = useTranslation('seed22');
    const seoProps = useI18nSeoProps('seed22');
    const [route, setRoute] = useState<string>('none');

    return (
        <>
            <Seo {...seoProps} image={'/images/22.png'} />
            <I18nTitleCard ns={'seed22'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h3'} gutterBottom>{t('map1')}</Typography>
                    <NextImage src={'/images/seed/22/1.png'} width={1455} height={695} alt={'seed 22 1'} />

                    <Accordion elevation={0} variant={'outlined'}>
                        <AccordionSummary>
                            <Typography>{t('gifTip')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display={'flex'}>
                                <NextImage src={'/images/seed/22/tip1.gif'} width={752} height={534}
                                           alt={'seed 22 tip1'} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Typography variant={'h3'} gutterBottom sx={theme => ({ marginTop: theme.spacing(2) })}>
                        {t('map2')}
                    </Typography>
                    <NextImage src={'/images/seed/22/2.png'} width={1611} height={702} alt={'seed 22 2'} />
                    <Accordion elevation={0} variant={'outlined'}>
                        <AccordionSummary>
                            <Typography>{t('gifTip')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <NextImage src={'/images/seed/22/tip2.gif'}
                                               width={606} height={433}
                                               alt={'seed 22 tip2'} />
                                </Grid>
                                <Grid item xs>
                                    <NextImage src={'/images/seed/22/tip3.gif'}
                                               width={606} height={433}
                                               alt={'seed 22 tip3'} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Typography variant={'h3'} gutterBottom sx={theme => ({ marginTop: theme.spacing(2) })}>
                        {t('map3')}
                    </Typography>
                    <Box sx={{
                        position: 'relative',
                        width: 'min(2000px, 100%)',
                    }}>
                        <NextImage style={{ position: 'relative', top: 0, left: 0 }}
                                   src={'/images/seed/22/cloud.png'}
                                   draggable={false}
                                   width={2000} height={700} alt={'seed 22 cloud'} />
                        {route === 'beginner' && <LayerImage src={'/images/seed/22/beginner.png'} draggable={false} />}
                        {route === 'expert' && <LayerImage src={'/images/seed/22/expert.png'} draggable={false} />}
                        <LayerImage src={'/images/seed/22/platform.png'} draggable={false} />
                    </Box>
                    <Grid container spacing={1} alignItems={'center'} justifyContent={'center'}>
                        <Grid item xs={12} textAlign={'center'}>
                            <FormControl>
                                <FormLabel id='route-radio'>{t('path')}</FormLabel>
                                <RadioGroup row aria-labelledby='route-radio' name='route-radio-group'
                                            value={route}
                                            onChange={e => setRoute((e.target as HTMLInputElement).value)}>
                                    <FormControlLabel value='none' control={<Radio />} label={t('none')} />
                                    <FormControlLabel value='beginner' control={<Radio />} label={t('beginner')} />
                                    <FormControlLabel value='expert' control={<Radio />} label={t('expert')} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Accordion elevation={0} variant={'outlined'}>
                                <AccordionSummary>
                                    <Typography>{t('gifTip')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <video style={{ maxWidth: '100%' }} src={'/images/seed/22/tip4.mp4'} controls
                                           loop />
                                    <NextImage src={'/images/seed/22/tip4.1.gif'} width={702} height={424}
                                               alt={'seed 22 tip4'} />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Comments pageKey={'seed22'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed22'])),
        },
    };
};

export default Seed22;
