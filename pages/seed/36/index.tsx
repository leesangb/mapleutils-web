import { Seo } from '@components/seo';
import { Card, CardContent } from '@mui/material';
import { I18nTitleCard } from '@components/card';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seed36Steps } from '@components/seed/36';


const Seed36 = () => {
    const seoProps = useI18nSeoProps('seed36');

    return (
        <>
            <Seo {...seoProps} image={'/images/36.png'} />
            <I18nTitleCard ns={'seed36'} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Seed36Steps />
                </CardContent>
            </Card>
            {/*<Comments pageKey={'seed36'} />*/}
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed36'])),
        },
    };
};

export default Seed36;