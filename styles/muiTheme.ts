import { createTheme, PaletteOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

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

const theme = createTheme({
    palette: buildPaletteOptions('light'),
});

export default theme;
