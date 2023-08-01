'use client';

import { AppBar } from '@/ds/surfaces';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useTranslation } from '@/i18n/client';
import { RiHome4Line, RiTranslate } from 'react-icons/ri';
import { media } from '@/ds';
import { Button } from '@/ds/inputs';
import styled from 'styled-components';
import { Languages } from '@/i18n/settings';
import { useEffect } from 'react';
import { isProduction } from '../../../legacy/src/tools/helper';
import { pageview } from '@/components/adsense/lib/gtag';
import { Popover } from '@/ds/surfaces/popover/Popover';

const locales: { locale: Languages, name: string }[] = [
    { locale: 'ko', name: '한국어 / KMS' },
    { locale: 'en', name: 'English / GMS' },
    { locale: 'zh-TW', name: '繁體中文 / TMS' },
];
const Navigations = () => {
    const { pathname, locale, localizedPathname } = useLocalizedPathname();
    const { t } = useTranslation({ ns: 'common' });

    useEffect(() => {
        try {
            if (isProduction && localizedPathname) {
                pageview(localizedPathname);
            } else {
                console.log('pageview', localizedPathname);
            }
        } catch (error) {
            console.error(error);
        }
    }, [localizedPathname]);

    return (
        <>
            <AppBar>
                <App.Nav>
                    <App.Link href={'/'} lang={locale}>
                        <RiHome4Line />
                        {t('home')}
                    </App.Link>
                    {locale === 'ko' && (
                        <>
                            <Popover>
                                <Popover.Trigger>
                                    {({ toggle, open, close }) =>
                                        <div onMouseEnter={() => open()} onMouseLeave={() => close()}>
                                            <Button onClick={() => toggle()}>
                                                {t('drawer.farm.longName')}
                                            </Button>
                                            <Popover.Content alignment={'bottom-left'}>
                                                <App.Nav $direction={'column'}>
                                                    {['combine', 'info', 'bookmark'].map((f) => (
                                                        <App.Link key={f} href={`/farm/${f}`} lang={locale}
                                                            onClick={() => close()}
                                                            styles={{ width: '100%' }}
                                                            active={pathname === `/farm/${f}`}>
                                                            {t(`drawer.farm.${f}.longName`)}
                                                        </App.Link>
                                                    ))}
                                                </App.Nav>
                                            </Popover.Content>
                                        </div>
                                    }
                                </Popover.Trigger>
                            </Popover>
                        </>
                    )}

                    <Popover>
                        <Popover.Trigger>
                            {({ toggle, open, close }) =>
                                <div onMouseEnter={() => open()} onMouseLeave={() => close()}>
                                    <Button onClick={() => toggle()}>
                                        {t('drawer.seed.longName')}
                                    </Button>
                                    <Popover.Content alignment={'bottom-left'}>
                                        <App.Nav $direction={'column'} style={{ width: 'max-content' }}>
                                            {
                                                [22, 23, 24, 36, 39, 42, 47, 48, 49].map((f) => (
                                                    <App.Link key={f} href={`/seed/${f}`} lang={locale}
                                                        style={{ width: '100%' }}
                                                        onClick={() => close()}
                                                        active={pathname === `/seed/${f}`}>
                                                        <b>{t(`drawer.seed.${f}.title`)}</b>: {t(`drawer.seed.${f}.shortDescription`)}
                                                    </App.Link>
                                                ))
                                            }
                                        </App.Nav>
                                    </Popover.Content>
                                </div>
                            }
                        </Popover.Trigger>
                    </Popover>
                </App.Nav>

                <RightSection>
                    <Popover>
                        <Popover.Trigger>
                            {({ toggle, open, close }) =>
                                <div onMouseEnter={() => open()} onMouseLeave={() => close()}>
                                    <Button onClick={() => toggle()}>
                                        <RiTranslate fontSize={'16px'} />
                                    </Button>
                                    <Popover.Content>
                                        <App.Nav $direction={'column'}>
                                            {locales.filter((l) => l.locale !== locale).map((l) => (
                                                <App.Link key={l.name} href={pathname || '/'}
                                                    onClick={() => close()} styles={{
                                                        width: '100%',
                                                    }} lang={l.locale}>
                                                    {l.name}
                                                </App.Link>
                                            ))}
                                        </App.Nav>
                                    </Popover.Content>
                                </div>
                            }
                        </Popover.Trigger>
                    </Popover>
                    <ThemeSwitcher />
                </RightSection>
            </AppBar>
        </>
    );
};

const App = {
    Nav: styled.nav<TransientProps<{ direction?: 'row' | 'column' }>>`
      display: flex;
      flex-direction: ${({ $direction }) => $direction || 'row'};
      gap: 8px;
      align-items: center;
      flex-grow: 1;
    `,
    Link: styled(Button)`
      font-size: 12px;
      box-sizing: border-box;
    `,
    SideBarButton: styled(Button)`
      ${media.min('sm')} {
        display: none;
      }
    `,
};

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default Navigations;
