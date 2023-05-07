'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { defaultNS, getOptions, Languages } from './settings';

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

export const useTranslation = ({ lang, ns = defaultNS, options }: {
    lang?: Languages, ns?: string, options?: UseTranslationOptions,
} = {}) => {
    if (i18next.resolvedLanguage !== lang) {
        i18next.changeLanguage(lang);
    }
    return useTranslationOrg(ns, options);
};
