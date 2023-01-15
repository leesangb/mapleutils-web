import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { Box, Card, CardContent, Slider, styled } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Comments } from '@components/comments';
import { useState } from 'react';

interface Seed42Props {
}

const Image = styled('img')`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const Seed42 = ({}: Seed42Props) => {
    const { t, i18n } = useTranslation();
    const seoProps = useI18nSeoProps('seed42');
    const [opacity, setOpacity] = useState<number>(50);
    return (
        <>
            <Seo {...seoProps} />
            <I18nTitleCard ns={'seed42'} />

            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>
                    <img src={'/images/seed/42/help.png'} alt={'help'} />
                    <Box sx={{
                        position: 'relative',
                    }}>
                        <Image sx={{ position: 'relative', top: 0, left: 0 }}
                               src={'/images/seed/42/background.png'}
                               draggable={false} />
                        <Image src={'/images/seed/42/route.png'} draggable={false} />
                        <Image src={'/images/seed/42/trap.png'} sx={{ opacity: opacity / 100 }} draggable={false} />
                    </Box>
                    <Slider value={opacity}
                            onChange={(e, v) => setOpacity(v as number)}
                            min={0}
                            max={100} />

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
