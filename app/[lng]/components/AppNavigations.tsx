'use client';

import styled from 'styled-components';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { DISCORD_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';
import { RiDiscordFill, RiGithubFill, RiHome4Line, RiKakaoTalkFill } from 'react-icons/ri';
import { Button } from '@/ds/inputs';
import { Languages } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
import { media } from '@/ds';
import { Popover } from '@/ds/surfaces/popover/Popover';

const locales: { locale: Languages, name: string }[] = [
    { locale: 'ko', name: '한국어 / KMS' },
    { locale: 'en', name: 'English / GMS' },
    { locale: 'zh-TW', name: '繁體中文 / TMS' },
];

export const AppNavigations = () => {
    const { pathname, locale } = useLocalizedPathname();
    const { t } = useTranslation({ ns: 'common' });

    return (
        <>
            <Nav>
                <LinkButton href={'/'} lang={locale}>
                    <RiHome4Line />
                    {t('home')}
                </LinkButton>
                {locales.filter((l) => l.locale !== locale).map((l) => (
                    <LinkButton key={l.name} href={pathname} styles={{
                        [media.max('xs')]: {
                            display: 'none',
                        },
                    }} lang={l.locale}>{l.name}</LinkButton>
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

const LinkButton = styled(Button)`
  font-size: 12px;
`;

const SideLinks = styled(Popover)`
  ${media.min('sm')} {
    display: none;
  }
`;
