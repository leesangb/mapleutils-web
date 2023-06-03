'use client';

import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import styled from 'styled-components';
import { Typography } from '@/ds/displays';
import { useTranslation } from '@/i18n/client';
import { SideBar } from '@/ds/surfaces';

export const SideNavigations = () => {
    const { pathname, locale } = useLocalizedPathname();
    const { t } = useTranslation();

    return (
        <>
            <Typography>{t('drawer.seed.shortName')}</Typography>
            <Nav>
                <Ul>
                    {
                        [22, 23, 24, 36, 39, 42, 47, 48, 49]
                            .map((f) => (
                                <Li key={f}>
                                    <SideBar.Link href={`/seed/${f}`}
                                        lang={locale}
                                        active={pathname === `/seed/${f}`}
                                        title={f.toString()}
                                        subtitle={t(`drawer.seed.${f}.shortDescription`) || ''} />
                                </Li>
                            ))
                    }
                </Ul>
            </Nav>
            {
                locale === 'ko' && (<>
                    <Hr />
                    <Typography>{t('drawer.farm.shortName')}</Typography>
                    <Nav>
                        <Ul>
                            {
                                ['combine', 'info', 'bookmark']
                                    .map((f) => (
                                        <Li key={f}>
                                            <SideBar.Link href={`/farm/${f}`}
                                                lang={locale}
                                                active={pathname === `/farm/${f}`}
                                                title={t(`drawer.farm.${f}.shortName`)}
                                                subtitle={t(`drawer.farm.${f}.longName`) || ''} />
                                        </Li>
                                    ))
                            }
                        </Ul>
                    </Nav>
                </>)
            }

            <Hr />
            <Typography>{t('drawer.seedSimulator.shortName')}</Typography>
            <Nav>
                <Ul>
                    {
                        [24, 39, 49]
                            .map((f) => (
                                <Li key={f}>
                                    <SideBar.Link href={`/seed/${f}/simulator`}
                                        lang={locale}
                                        active={pathname === `/seed/${f}/simulator`}
                                        title={f.toString()}
                                        subtitle={t(`drawer.seedSimulator.${f}.shortDescription`) || ''} />
                                </Li>
                            ))
                    }
                </Ul>
            </Nav>
        </>
    );
};

const Nav = styled.nav`
  width: 100%;
`;

const Hr = styled.hr`
  width: calc(100% - 16px);
  margin: 8px 0;
`;

const Ul = styled.ul`
  display: flex;
  gap: 0;
  box-sizing: border-box;
  white-space: nowrap;
  width: 100%;
  flex-direction: column;
  list-style: none;
  padding: 0 8px;
  margin: 0;
`;

const Li = styled.li`
  padding: 0;
  margin: 0;
  overflow: hidden;
`;
