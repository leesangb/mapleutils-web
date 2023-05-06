'use client';

import { Link } from '@/ds/displays';
import styled from 'styled-components';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';

export const AppNavigations = () => {
    const { pathname, locale } = useLocalizedPathname();
    return (
        <Nav>
            <Link href={'/'} lang={locale}>
                home
            </Link>
            <Link href={'/seed'} lang={locale}>
                seed
            </Link>
            <Link href={pathname} lang={'ko'}>ko</Link>
            <Link href={pathname} lang={'en'}>en</Link>
            <Link href={pathname} lang={'zh-TW'}>zh</Link>
        </Nav>
    );
};

const Nav = styled.nav`
  display: flex;
  gap: 8px;
`;
