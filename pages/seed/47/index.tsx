import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextImage from 'next/image';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { useTranslation } from 'next-i18next';
import { Box, Card, CardContent, Typography } from '@mui/material';

const Seed47 = () => {
    const { t } = useTranslation();
    const seoProps = useI18nSeoProps('seed47');
    return (
        <>
            <Seo {...seoProps} image={'/images/47.png'} />
            <I18nTitleCard ns={'seed47'} />

            <Card variant={'outlined'}>
                <CardContent>
                    <Typography gutterBottom variant={'h3'}>{t('map', { ns: 'seed47' })}</Typography>
                    <Typography gutterBottom>{t('switchDescription', { ns: 'seed47' })}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                        <NextImage src={'/images/seed/47.png'} width={576} height={849} alt={'seed 47'} />
                    </Box>
                </CardContent>
            </Card>

            {/*<Comments pageKey={'seed47'} />*/}
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed47'])),
        },
    };
};

export default Seed47;