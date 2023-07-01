'use client';

import { AppBar, SideBar } from '@/ds/surfaces';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useTranslation } from '@/i18n/client';
import { RiDiscordFill, RiGithubFill, RiHome4Line, RiKakaoTalkFill, RiMenu2Fill } from 'react-icons/ri';
import { media, theme } from '@/ds';
import { Button } from '@/ds/inputs';
import { DISCORD_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';
import styled from 'styled-components';
import { Languages } from '@/i18n/settings';
import { Typography } from '@/ds/displays';
import useAnimationState from '@/hooks/useAnimationState';
import { useEffect } from 'react';

const locales: { locale: Languages, name: string }[] = [
    { locale: 'ko', name: '한국어 / KMS' },
    { locale: 'en', name: 'English / GMS' },
    { locale: 'zh-TW', name: '繁體中文 / TMS' },
];
const Navigations = () => {
    const { pathname, locale } = useLocalizedPathname();
    const { t } = useTranslation({ ns: 'common' });
    const { state, open, close } = useAnimationState(125);

    const toggleOpen = () => {
        state === 'opened' ? close() : open();
    };

    useEffect(() => {
        close();
    }, [pathname]);

    return (
        <>
            <AppBar>
                <App.Nav>
                    <App.SideBarButton
                        onClick={() => toggleOpen()}>
                        <RiMenu2Fill />
                    </App.SideBarButton>
                    <App.Link href={'/'} lang={locale}>
                        <RiHome4Line />
                        {t('home')}
                    </App.Link>
                    {locales.filter((l) => l.locale !== locale).map((l) => (
                        <App.Link key={l.name} href={pathname || '/'} styles={{
                            [media.max('xs')]: {
                                display: 'none',
                            },
                        }} lang={l.locale}>
                            {l.name}
                        </App.Link>
                    ))}
                </App.Nav>
                <App.Nav style={{ flexGrow: 0, marginRight: '8px' }}>
                    <Button href={KAKAOTALK_URL}><RiKakaoTalkFill fontSize={'16px'} /></Button>
                    <Button href={GITHUB_URL}><RiGithubFill fontSize={'16px'} /></Button>
                    <Button href={DISCORD_URL}><RiDiscordFill fontSize={'16px'} /></Button>
                </App.Nav>
                <ThemeSwitcher />
            </AppBar>
            <SideBar data-mobile-animation={state}>

                {
                    locale === 'ko' && (<>
                        <Typography>{t('drawer.farm.shortName')}</Typography>
                        <Side.Nav>
                            <Side.Ul>
                                {
                                    ['combine', 'info', 'bookmark']
                                        .map((f) => (
                                            <Side.Li key={f}>
                                                <SideBar.Link href={`/farm/${f}`}
                                                    lang={locale}
                                                    active={pathname === `/farm/${f}`}
                                                    title={t(`drawer.farm.${f}.shortName`)}
                                                    subtitle={t(`drawer.farm.${f}.longName`) || ''} />
                                            </Side.Li>
                                        ))
                                }
                            </Side.Ul>
                        </Side.Nav>
                        <Side.Hr />
                    </>)
                }
                <Typography>{t('drawer.seed.shortName')}</Typography>
                <Side.Nav>
                    <Side.Ul>
                        {
                            [22, 23, 24, 36, 39, 42, 47, 48, 49]
                                .map((f) => (
                                    <Side.Li key={f}>
                                        <SideBar.Link href={`/seed/${f}`}
                                            lang={locale}
                                            active={pathname === `/seed/${f}`}
                                            title={f.toString()}
                                            subtitle={t(`drawer.seed.${f}.shortDescription`) || ''} />
                                    </Side.Li>
                                ))
                        }
                    </Side.Ul>
                </Side.Nav>
                {/*<Side.Hr />*/}
                {/*<Typography>{t('drawer.seedSimulator.shortName')}</Typography>*/}
                {/*<Side.Nav>*/}
                {/*    <Side.Ul>*/}
                {/*        {*/}
                {/*            [24, 39, 49]*/}
                {/*                .map((f) => (*/}
                {/*                    <Side.Li key={f}>*/}
                {/*                        <SideBar.Link href={`/seed/${f}/simulator`}*/}
                {/*                            lang={locale}*/}
                {/*                            active={pathname === `/seed/${f}/simulator`}*/}
                {/*                            title={f.toString()}*/}
                {/*                            subtitle={t(`drawer.seedSimulator.${f}.shortDescription`) || ''} />*/}
                {/*                    </Side.Li>*/}
                {/*                ))*/}
                {/*        }*/}
                {/*    </Side.Ul>*/}
                {/*</Side.Nav>*/}
            </SideBar>
            {
                state === 'opened' && (
                    <Side.ClickAway onClick={() => close()} />
                )
            }
        </>
    );
};

const App = {
    Nav: styled.nav`
      display: flex;
      gap: 8px;
      align-items: center;
      flex-grow: 1;
    `,
    Link: styled(Button)`
      font-size: 12px;
    `,
    SideBarButton: styled(Button)`
      ${media.min('sm')} {
        display: none;
      }
    `,
};

const Side = {
    Nav: styled.nav`
      width: 100%;
    `,
    Hr: styled.hr`
      width: calc(100% - 16px);
      margin: 8px 16px;
    `,
    Ul: styled.ul`
      display: flex;
      box-sizing: border-box;
      white-space: nowrap;
      width: 100%;
      flex-direction: column;
      list-style: none;
      padding: 0;
      margin: 0;
    `,
    Li: styled.li`
      padding: 0;
      margin: 0;
      overflow: hidden;
    `,
    ClickAway: styled.div`
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: calc(100vh - ${theme.appBar.height});
      z-index: calc(${theme.zIndex.sideBar} - 1);

      ${media.min('sm')} {
        display: none;
        pointer-events: none;
      }
    `,
};

export default Navigations;
