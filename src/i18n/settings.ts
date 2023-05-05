export const fallbackLng = 'ko';
export const languages = [fallbackLng, 'en', 'zh-TW'] as const;
export type Languages = typeof languages[number];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export type I18nPageProps<P = unknown> = P & {
    params: {
        lng: Languages
    };
}

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
