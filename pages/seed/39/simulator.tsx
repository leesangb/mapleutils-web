import { Locales } from '@tools/locales';
import { QuestionAnswer, seed39Data, seed39DataGMS } from '@data/seed/39';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import QuestionAnswerSimulator from '@components/seed/39/QuestionAnswerSimulator';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Seo } from '@components/seo';
import { I18nTitleCard } from '@components/card';

interface Seed39SimulationPageProps {
    data: QuestionAnswer[];
}


const Seed39SimulationPage = ({ data }: Seed39SimulationPageProps) => {
    const seoProps = useI18nSeoProps('seed39simulator');
    return (
        <>
            <Seo {...seoProps} image={'/images/39.png'} />
            <I18nTitleCard ns={'seed39simulator'} />
            <QuestionAnswerSimulator data={data} />
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

export default Seed39SimulationPage;