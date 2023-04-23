import { useTranslation } from 'next-i18next';
import { SeoProps } from './Seo';
import { useMemo } from 'react';

/**
 * Get seo props from i18n with given namespace
 * @param ns
 * @param additionalKeywords keywords to concat
 */
function useI18nSeoProps(ns: string, additionalKeywords: string[] = []) {
    const { t } = useTranslation(ns);
    const seoProps: SeoProps = useMemo(() => ({
        title: t('seo.title', { ns }),
        keywords: t('seo.keywords', { ns }).split(', ').concat(additionalKeywords),
        description: t('seo.description', { ns }),
    }), [ns, additionalKeywords]);

    return seoProps;
}

export default useI18nSeoProps;
