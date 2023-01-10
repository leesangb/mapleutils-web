import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { Card, CardContent } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Comments } from '@components/comments';

interface Seed42Props {
}

const Seed42 = ({}: Seed42Props) => {
    const { t, i18n } = useTranslation();
    const seoProps = useI18nSeoProps('seed42');
    return (
        <>
            <Seo {...seoProps} />
            <I18nTitleCard ns={'seed42'} />

            <Card elevation={0} variant={'outlined'} component={'section'}>
                <CardContent>

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
