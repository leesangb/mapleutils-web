import { Languages } from '@/i18n/settings';

/**
 * Legacy comments are stored in a separate database.
 */
const legacyCommentsMap: Record<string, string> = {
    ['']: 'feedbacks',
    ['/seed/22']: 'seed22',
    ['/seed/23']: 'seed23',
    ['/seed/24']: 'seed24',
    ['/seed/36']: 'seed36',
    ['/seed/39']: 'seed39',
    ['/seed/42']: 'seed42',
    ['/seed/47']: 'seed47',
    ['/seed/48']: 'seed48',
    ['/seed/49']: 'seed49',
    ['/seed/24/simulator']: 'seed24simulator',
    ['/seed/39/simulator']: 'seed39simulator',
    ['/seed/49/simulator']: 'seed49simulator',
    ['/farm/combine']: 'monster-life_combine',
    ['/farm/info']: 'monster-life_information',
    ['/farm/bookmark']: 'monster-life_bookmark',
};

export const getCommentPageKey = (pathname: string, locale: Languages) => {
    const key = (legacyCommentsMap[pathname] || pathname).replace(/\//g, '_');
    return locale !== 'ko' ? `${locale}_${key}` : key;
};

export const getCommentsQueryKey = (pageKey: string) => ['comments', pageKey] as const;
