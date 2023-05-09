'use client';

import { Link } from '@/ds/displays';
import styled from 'styled-components';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { DISCORD_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';
import { RiDiscordFill, RiGithubFill, RiKakaoTalkFill } from 'react-icons/ri';
import { Button } from '@/ds/inputs';
import { Languages } from '@/i18n/settings';

const locales: { locale: Languages, name: string }[] = [
    { locale: 'ko', name: '한국어 / KMS' },
    { locale: 'en', name: 'English / GMS' },
    { locale: 'zh-TW', name: '繁體中文 / TMS' },
];

export const AppNavigations = () => {
    const { pathname, locale } = useLocalizedPathname();
    return (
        <>
            <Nav>
                <Link href={'/'} lang={locale}>
                    home
                </Link>
                <Link href={'/seed'} lang={locale}>
                    seed
                </Link>
                {locales.filter((l) => l.locale !== locale).map((l) => (
                    <Button key={l.name} styles={{ fontSize: '12px' }} href={pathname} lang={l.locale}>{l.name}</Button>
                ))}
            </Nav>
            <Nav style={{ flexGrow: 0, marginRight: '8px' }}>
                <Button href={KAKAOTALK_URL}><RiKakaoTalkFill fontSize={'16px'} /></Button>
                <Button href={GITHUB_URL}><RiGithubFill fontSize={'16px'} /></Button>
                <Button href={DISCORD_URL}><RiDiscordFill fontSize={'16px'} /></Button>
            </Nav>
        </>
    );
};

const Nav = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-grow: 1;
`;
