import { useStore } from '@stores/StoreContext';
import { createTheme, PaletteOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode, Theme, ThemeOptions } from '@mui/material';
import { useEffect, useState } from 'react';
import { createBreakpoints } from '@mui/system';

const breakpoints = createBreakpoints({});

const darkPaletteOptions: PaletteOptions = {
    text: {
        primary: '#fff',
        secondary: 'rgba(255,255,255,0.7)',
        disabled: 'rgba(255,255,255,0.5)',
    },
    background: {
        default: '#1d1d1d',
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

const borderRadius = '16px';

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
        },
        h3: {
            fontSize: 24,
        },
        h4: {
            fontSize: 22,
        },
        h5: {
            fontSize: 18,
        },
        h6: {
            fontSize: 14,
        },
    },
    palette: buildPaletteOptions(mode),
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius,
                },
            },
        },
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
                button: {
                    borderRadius,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius,
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
        MuiCardActionArea: {
            styleOverrides: {
                root: {
                    borderRadius,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius,
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

export const defaultTheme = createTheme(buildThemeOptions('light'));

export const useDarkMode = () => {
    const { app } = useStore();

    const [themeOptions, setThemeOptions] = useState<ThemeOptions>(buildThemeOptions(app.preference.theme));
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        setTheme(createTheme(themeOptions));
    }, [themeOptions]);

    const toggleDarkMode = () => {
        const mode = themeOptions?.palette?.mode === 'light' ? 'dark' : 'light';
        const newTheme = buildThemeOptions(mode);
        app.changeTheme(mode);
        setThemeOptions(newTheme);
    };

    return {
        theme,
        toggleDarkMode,
    };
};
