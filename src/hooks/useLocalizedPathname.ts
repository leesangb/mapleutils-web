import { usePathname } from 'next/navigation';
import { Languages } from '@/i18n/settings';

export const useLocalizedPathname = () => {
    const pathname = usePathname();
    const [root, locale, ...rest] = pathname.split('/') as [string, Languages, ...string[]];

    return {
        pathname: [root, ...rest].join('/'),
        locale,
        localizedPathname: pathname,
    };
};
