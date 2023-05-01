interface CommonTheme {
    font: string;
}

interface ThemePalette {
    primary: string;
    secondary: string;

    success: string;
    danger: string;
    warning: string;
    info: string;

    surface: string;
    background: string;
    contour: string;

    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
}

export const light: ThemePalette = {
    primary: '#919aff',
    secondary: '#fff691',

    success: '#4caf50',
    danger: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',

    surface: '#fbfbfb',
    background: '#efefef',
    contour: '#e0e0e0',

    text: {
        primary: 'rgba(0,0,0,0.87)',
        secondary: 'rgba(0,0,0,0.54)',
        disabled: 'rgba(0,0,0,0.38)',
    },
};

export const dark: ThemePalette = {
    primary: '#919aff',
    secondary: '#fff691',

    success: '#4caf50',
    danger: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',

    surface: '#262626',
    background: '#1d1d1d',
    contour: '#2a2a2a',

    text: {
        primary: 'rgba(255,255,255,0.95)',
        secondary: 'rgba(255,255,255,0.7)',
        disabled: 'rgba(255,255,255,0.5)',
    },
};

const common: CommonTheme = {
    font: ['Spoqa Han Sans Neo', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
};

export type Theme = ThemePalette & CommonTheme;

export const theme: Theme = (<T extends object>({
    obj,
    separator = '_',
    transformer = (v) => v.toString(),
}: { obj: T, separator?: string, transformer?: (value: string | number) => string }): T => {
    const finalObj = JSON.parse(JSON.stringify(obj)) as T;

    const assignFlatten = (obj: object, prefix: string) => {
        Object.entries(obj).forEach(([k, v]) => {
            const key = prefix
                ? `${prefix}${separator}${k}`
                : k;
            if (typeof v === 'object') {
                assignFlatten(v, key);
            } else if (typeof v === 'string' || typeof v === 'number') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                obj[k] = transformer(key);
            }
        });
    };

    assignFlatten(finalObj, '');
    return finalObj;
})({ obj: { ...common, ...light }, transformer: (k) => `var(--${k})` });
