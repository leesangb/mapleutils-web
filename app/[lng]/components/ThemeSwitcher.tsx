'use client';

import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Button } from '@/ds/inputs';
import { useEffect } from 'react';

export const ThemeSwitcher = () => {
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

    return <Button onClick={toggleTheme}>theme</Button>;
};
