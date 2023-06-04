// import 'server-only';
import { Metadata } from 'next';
import { useTranslation } from '@/i18n/server';
import { Languages } from '@/i18n/settings';

export const generateI18nSeoMetadata = async ({
    url,
    lang,
    i18nNs,
    images = [],
}: {
    url: string,
    lang: Languages,
    i18nNs: string,
    images?: { url: string, width?: number, height?: number, alt?: string }[],
}): Promise<Metadata> => {
    const { t } = await useTranslation(lang, i18nNs);
    return {
        title: t('seo.title'),
        description: t('seo.description'),
        keywords: t('seo.keywords'),
        openGraph: {
            title: t('seo.title'),
            description: t('seo.description'),
            url,
            images: [
                ...images,
            ],
        },
        alternates: {
            canonical: url,
            languages: {
                'ko': `/ko${url}`,
                'en': `/en${url}`,
                'zh-TW': `/zh-TW${url}`,
            },
        },
    };
};
