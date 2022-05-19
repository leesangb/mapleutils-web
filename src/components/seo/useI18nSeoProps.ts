import { useTranslation } from 'next-i18next';
import { SeoProps } from '@components/seo/Seo';
import { useMemo } from 'react';

/**
 * Get seo props from i18n with given namespace
 * @param ns
 */
function useI18nSeoProps(ns: string) {
    const { t } = useTranslation(ns);
    const seoProps: SeoProps = useMemo(() => ({
        title: t('seo.title', { ns }),
        keywords: t('seo.keywords', { ns }).split(', '),
        description: t('seo.description', { ns }),
    }), [ns]);

    return seoProps;
}

export default useI18nSeoProps;