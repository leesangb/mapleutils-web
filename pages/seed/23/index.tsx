import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { Card, CardContent, Typography } from '@mui/material';
import NextImage from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Comments } from '@components/comments';

const Seed23 = () => {
    const { t } = useTranslation();
    const seoProps = useI18nSeoProps('seed23');

    return (
        <>
            <Seo {...seoProps} image={'/images/23.png'} />
            <I18nTitleCard ns={'seed23'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h3'}>{t('mapFull', { ns: 'seed23' })}</Typography>
                    <NextImage src={'/images/seed/23_full.png'} width={4453} height={763} alt={'seed 23 full'} />

                    <Typography variant={'h3'} sx={theme => ({ marginTop: theme.spacing(2) })}>
                        {t('map1', { ns: 'seed23' })}
                    </Typography>
                    <NextImage src={'/images/seed/23_1.png'} width={1479} height={720} alt={'seed 23 1'} />

                    <Typography variant={'h3'} sx={theme => ({ marginTop: theme.spacing(2) })}>
                        {t('map2', { ns: 'seed23' })}
                    </Typography>
                    <NextImage src={'/images/seed/23_2.png'} width={1052} height={704} alt={'seed 23 2'} />

                    <Typography variant={'h3'} sx={theme => ({ marginTop: theme.spacing(2) })}>
                        {t('map3', { ns: 'seed23' })}
                    </Typography>
                    <NextImage src={'/images/seed/23_3.png'} width={1406} height={700} alt={'seed 23 3'} />
                </CardContent>
            </Card>

            <Comments pageKey={'seed23'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed23'])),
        },
    };
};

export default Seed23;