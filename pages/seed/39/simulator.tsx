import { Locales } from '@tools/locales';
import { QuestionAnswer, seed39Data, seed39DataGMS } from '@data/seed/39';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import QuestionAnswerSimulator from '@components/seed/39/QuestionAnswerSimulator';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';
import { Box } from '@mui/material';

interface Seed39SimulatorPageProps {
    data: QuestionAnswer[];
}


const Seed39SimulatorPage = ({ data }: Seed39SimulatorPageProps) => {
    const seoProps = useI18nSeoProps('seed39simulator');
    return (
        <>
            <Seo {...seoProps} image={'/images/39.png'} />
            <I18nTitleCard ns={'seed39simulator'} />
            <Box display={'flex'} justifyContent={'center'}>
                <QuestionAnswerSimulator data={data} />
            </Box>
            {/*<Comments pageKey={'seed39simulator'} />*/}
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            data: locale === Locales.Korean
                ? seed39Data.sort((a, b) => a.question.localeCompare(b.question))
                : seed39DataGMS.sort((a, b) => (`${a.question}${a.choices[0]}`).localeCompare(`${b.question}${b.choices[0]}`)),
            ...(await serverSideTranslations(locale, ['common', 'seed39simulator'])),
        },
    };
};

export default Seed39SimulatorPage;