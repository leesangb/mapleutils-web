'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { defaultNS, getOptions } from './settings';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';

//
i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
    });

export const useTranslation = ({ ns = defaultNS, options }: {
    ns?: string, options?: UseTranslationOptions,
} = {}) => {
    const { locale } = useLocalizedPathname();
    if (i18next.resolvedLanguage !== locale) {
        i18next.changeLanguage(locale);
    }
    return useTranslationOrg(ns, options);
};
