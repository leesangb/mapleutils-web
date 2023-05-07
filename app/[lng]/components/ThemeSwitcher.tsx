'use client';

import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Button } from '@/ds/inputs';
import { useEffect } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useTranslation } from '@/i18n/client';
import { keyframes } from '@/ds/keyframes';
import { css } from 'styled-components';

export const ThemeSwitcher = () => {
    const { t } = useTranslation();
    const [theme, setTheme] = useLocalStorageState<'light' | 'dark'>('theme', 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        const html = document.querySelector('html');
        if (!html) return;
        html.dataset.theme = theme;
    }, [theme]);

    return (
        <Button onClick={toggleTheme} aria-label={t(`${theme}Mode`)} styles={css`
          &:active > svg {
            transform: scale(0.2) rotate(-360deg);
          }

          svg {
            transition: transform 0.325s ease-in-out;
            animation: ${keyframes.spin} 0.325s ease-in-out;
          }
        `}>
            {theme === 'dark' ? <RiMoonFill /> : <RiSunFill />}
        </Button>
    );
};
