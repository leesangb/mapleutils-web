import NextLink from 'next/link';
import { ComponentProps } from 'react';
import { Languages } from '@/i18n/settings';

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'locale' | 'hrefLang' | 'lang'> & { lang: Languages };
export const Link = ({ href, lang, ...props }: LinkProps) => {
    const hrefWithLocale = lang
        ? `/${lang}${href}`
        : href;
    return <NextLink href={hrefWithLocale} {...props} />;
};
