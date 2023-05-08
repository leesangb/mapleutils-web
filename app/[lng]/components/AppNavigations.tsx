'use client';

import { Link } from '@/ds/displays';
import styled from 'styled-components';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { DISCORD_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';
import { RiDiscordFill, RiGithubFill, RiKakaoTalkFill } from 'react-icons/ri';
import { Button } from '@/ds/inputs';

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
                <Button styles={{ fontSize: '12px' }} href={pathname} lang={'ko'}> 한국어 /
                    KMS</Button>
                <Button styles={{ fontSize: '12px' }} href={pathname} lang={'en'}> English /
                    GMS</Button>
                <Button styles={{ fontSize: '12px' }} href={pathname} lang={'zh-TW'}> 繁體中文 / TMS</Button>
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
