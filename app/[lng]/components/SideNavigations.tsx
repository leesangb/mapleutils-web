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
            <SideBar.Nav>
                {
                    [22, 24, 36, 39, 42, 47, 48, 49]
                        .map((f) => (
                            <SideBar.Link href={`/seed/${f}`}
                                lang={locale}
                                active={pathname === `/seed/${f}`}
                                key={f}
                                title={f.toString()}
                                subtitle={t(`drawer.seed.${f}.shortDescription`) || ''} />))
                }
            </SideBar.Nav>
            {
                locale === 'ko' && (<>
                    <Hr />
                    <Typography>{t('drawer.farm.shortName')}</Typography>
                    <SideBar.Nav>
                        {
                            ['combine', 'info', 'bookmarks']
                                .map((f) => (
                                    <SideBar.Link href={`/farm/${f}`}
                                        lang={locale}
                                        active={pathname === `/farm/${f}`}
                                        key={f} title={t(`drawer.farm.${f}.shortName`)}
                                        subtitle={t(`drawer.farm.${f}.longName`) || ''} />))
                        }
                    </SideBar.Nav>
                </>)
            }

            <Hr />
            <Typography>{t('drawer.seedSimulator.shortName')}</Typography>
            <SideBar.Nav>
                {
                    [24, 39, 49]
                        .map((f) => (
                            <SideBar.Link href={`/seed/${f}/simulator`}
                                lang={locale}
                                active={pathname === `/seed/${f}/simulator`}
                                key={f} title={f.toString()}
                                subtitle={t(`drawer.seedSimulator.${f}.shortDescription`) || ''} />))
                }
            </SideBar.Nav>
            <Hr />
        </>
    );
};

const Hr = styled.hr`
  width: calc(100% - 16px);
`;
