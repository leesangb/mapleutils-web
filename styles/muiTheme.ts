import { createTheme, PaletteOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode, Theme, ThemeOptions } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { createBreakpoints } from '@mui/system';
import { LocalStorageHelper, LocalStorageKey, Preference } from '@tools/localStorageHelper';

const breakpoints = createBreakpoints({});

const darkPaletteOptions: PaletteOptions = {
    text: {
        primary: '#fff',
        secondary: 'rgba(255,255,255,0.7)',
        disabled: 'rgba(255,255,255,0.5)',
    },
    background: {
        default: '#1d1d1d !important', // FIXME, do not use !important... to investigate why it is ignored sometimes
        paper: '#262626',
    },
    action: {
        active: '#fff',
        hover: 'rgba(255,255,255,0.08)',
        selected: 'rgba(255,255,255,0.16)',
        disabled: 'rgba(255,255,255,0.3)',
        disabledBackground: 'rgba(255,255,255,0.12)',
    },
    divider: 'rgba(255,255,255,0.12)',
};

const lightPaletteOptions: PaletteOptions = {
    text: {
        primary: 'rgba(0,0,0,0.87)',
        secondary: 'rgba(0,0,0,0.54)',
        disabled: 'rgba(0,0,0,0.38)',
    },
    background: {
        default: '#efefef',
        paper: '#fbfbfb',
    },
    action: {
        active: 'rgba(0,0,0,0.54)',
        hover: 'rgba(0,0,0,0.04)',
        selected: 'rgba(0,0,0,0.08)',
        disabled: 'rgba(0,0,0,0.26)',
        disabledBackground: 'rgba(0,0,0,0.12)',
    },
    divider: 'rgba(0,0,0,0.12)',
};

const buildPaletteOptions = (mode: PaletteMode): PaletteOptions => ({
    mode,
    primary: {
        main: '#919aff',
    },
    secondary: {
        main: '#fff691',
    },
    error: {
        main: red.A400,
    },
    ...(mode === 'dark' ? darkPaletteOptions : lightPaletteOptions),
});

const borderRadius = 16;

const buildThemeOptions = (mode: PaletteMode): ThemeOptions => ({
    typography: {
        fontSize: 13,
        fontFamily: ['Spoqa Han Sans Neo', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        h2: {
            fontSize: 28,
            fontWeight: 'bold',
        },
        h3: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        h4: {
            fontSize: 22,
            fontWeight: 'bold',
        },
        h5: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        h6: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    },
    palette: buildPaletteOptions(mode),
    shape: {
        borderRadius,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor:
                        mode === 'dark'
                            ? darkPaletteOptions.background?.default
                            : lightPaletteOptions.background?.default,
                },
            },
        },
        MuiList: {
            styleOverrides: {
                padding: {
                    paddingBottom: '0px',
                    paddingTop: '0px',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                rounded: {
                    borderRadius: '4px',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '&:last-child': {
                        paddingBottom: '12px',
                    },
                    '&>p': {
                        fontSize: '16px',
                    },
                    [breakpoints.down('xs')]: {
                        padding: '12px',
                    },
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1280,
            xl: 1800,
        },
    },
});

const lightThemeOptions = buildThemeOptions('light');
const darkThemeOptions = buildThemeOptions('dark');
const THEME_OPTIONS: Record<'light' | 'dark', ThemeOptions> = {
    light: lightThemeOptions,
    dark: darkThemeOptions,
};

export const defaultTheme = createTheme(lightThemeOptions);

export const useDarkMode = () => {
    const [themeOptions, setThemeOptions] = useState<ThemeOptions>(lightThemeOptions);
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const preference = LocalStorageHelper.load<Preference>(LocalStorageKey.PREFERENCE);
        setThemeOptions(THEME_OPTIONS[preference.theme]);
    }, []);

    useEffect(() => {
        setTheme(createTheme(themeOptions));
    }, [themeOptions]);

    const toggleDarkMode = useCallback(() => {
        const mode = themeOptions.palette?.mode === 'light' ? 'dark' : 'light';
        const newTheme = THEME_OPTIONS[mode];
        setThemeOptions(newTheme);
        const preference = LocalStorageHelper.load<Preference>(LocalStorageKey.PREFERENCE);
        preference.theme = mode;
        LocalStorageHelper.save(LocalStorageKey.PREFERENCE, preference);
    }, [themeOptions]);

    return {
        theme,
        toggleDarkMode,
    };
};
