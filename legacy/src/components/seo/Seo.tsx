import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL } from '../../tools/config';

export interface SeoProps {
    title: string;
    keywords: string[];
    description: string;
    image?: string;
    noIndex?: boolean;
}

const defaultKeywords = [
    'Maplestory',
    'Maple',
    'The Seed',
    'mapleutils',
    '메이플',
    '메이플스토리',
    '시드',
    '더 시드',
    '메이플 유틸',
    '몬라',
    '몬스터 라이프',
    'monster life',
];

const defaultTitle = '메이플 유틸';
const defaultDescription = '메이플 각종 유틸 사이트';

const Seo = (props: SeoProps) => {
    const router = useRouter();
    const { title, keywords, description, image, noIndex } = props;
    const finalDescription = description ? `${defaultDescription}, ${description}` : defaultDescription;
    const finalTitle = title ? `${defaultTitle} : ${title}` : defaultTitle;
    const finalKeywords = [...defaultKeywords, ...keywords];

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name='keywords' content={`${finalKeywords.join(', ')}`} />
            <meta name='description' content={finalDescription} />
            <meta property='og:title' content={finalTitle} />
            <meta property='og:url' content={`${SITE_URL}${router?.pathname}`} />
            {image && <meta property='og:image' content={`${SITE_URL}${image}`} />}
            <meta property='og:description' content={finalDescription} />
            {noIndex && (
                <>
                    <meta name='robots' content='noindex' />
                    <meta name='googlebot' content='noindex' />
                </>
            )}
        </Head>
    );
};

Seo.defaultProps = {
    title: '',
    keywords: [],
    description: '',
    noIndex: false,
};

export default Seo;
