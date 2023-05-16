import { darken } from 'polished';

type InteractingColor = {
    default: string;
    hover: string;
    active: string;
}

interface ThemePalette {
    primary: InteractingColor;
    secondary: InteractingColor;

    success: string;
    danger: string;
    warning: string;
    info: string;

    surface: InteractingColor;
    background: string;
    contour: string;

    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };

    tooltip: {
        color: string;
        background: string;
    };
}

const light: ThemePalette = {
    primary: {
        default: '#a8a8ff',
        hover: darken(0.05, '#a8a8ff'),
        active: darken(0.1, '#a8a8ff'),
    },
    secondary: {
        default: '#fff691',
        hover: '#fff691',
        active: '#fff691',
    },

    success: '#4caf50',
    danger: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',

    surface: {
        default: 'rgba(255, 255, 255, 0.65)',
        hover: 'rgba(224, 224, 224, 0.5)',
        active: 'rgba(224, 224, 224, 0.85)',
    },
    background: '#eaeaea',
    contour: '#e0e0e0',

    text: {
        primary: 'rgba(0, 0, 0, 0.75)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
    },

    tooltip: {
        color: '#fafafa',
        background: 'rgba(0, 0, 0, 0.3)',
    },
};

const dark: ThemePalette = {
    primary: {
        default: '#919aff',
        hover: darken(0.05, '#919aff'),
        active: darken(0.1, '#919aff'),
    },
    secondary: {
        default: '#fff691',
        hover: '#fff691',
        active: '#fff691',
    },

    success: '#4caf50',
    danger: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',

    surface: {
        default: 'rgb(36, 36, 36, 0.8)',
        hover: 'rgba(52, 52, 52, 0.65)',
        active: 'rgba(52, 52, 52, 0.8)',
    },
    background: 'rgb(29, 29, 29)',
    contour: '#3a3a3a',

    text: {
        primary: 'rgba(249, 249, 249, 0.95)',
        secondary: 'rgba(249, 249, 249, 0.7)',
        disabled: 'rgba(249, 249, 249, 0.5)',
    },

    tooltip: {
        color: '#fafafa',
        background: 'rgba(170, 170, 170, 0.2)',
    },
};

interface CommonTheme {
    font: string;
    borderRadius: string;
    sideBar: {
        width: string;
        blur: string;
    };
    appBar: {
        height: string;
        blur: string;
    };

    zIndex: {
        appBar: number;
        sideBar: number;
        tooltip: number;
    };
}

const common: CommonTheme = {
    font: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'].join(','),
    appBar: {
        height: '64px',
        blur: '12px',
    },
    sideBar: {
        width: '63px',
        blur: '12px',
    },
    borderRadius: '8px',
    zIndex: {
        appBar: 1000,
        sideBar: 1000,
        tooltip: 1001,
    },
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

const flattenObject = (obj: object, separator = '_'): Record<string, string> => {
    const flatten: Record<string, string> = {};

    const flattenRec = (obj: object, prefix: string) => {
        Object.entries(obj).forEach(([k, v]) => {
            const key = prefix
                ? `${prefix}${separator}${k}`
                : k;
            if (typeof v === 'object') {
                flattenRec(v, key);
            }
            if (typeof v === 'string' || typeof v === 'number') {
                flatten[key] = v.toString();
            }
        });
    };

    flattenRec(obj, '');

    return flatten;
};

const toCssVar = (obj: object) => {
    return Object.entries(flattenObject(obj)).map(([k, v]) => `--${k}: ${v};`).join('\n');
};

export const darkThemeVar = toCssVar(dark);
export const lightThemeVar = toCssVar(light);
export const commonThemeVar = toCssVar(common);
