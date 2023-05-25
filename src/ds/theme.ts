import { darken, lighten, transparentize } from 'polished';

type InteractingColor = {
    default: string;
    hover: string;
    active: string;
}

type SurfaceColor = {
    default: string;
    background: string;
}

interface ThemePalette {
    primary: InteractingColor & SurfaceColor;

    success: SurfaceColor;
    danger: SurfaceColor;
    warning: SurfaceColor;
    info: SurfaceColor;

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

const primaryLight = '#a8a8ff';
const success = '#4bef54';
const danger = '#f85d51';
const warning = '#ffdf71';
const info = '#69b2ec';

const light: ThemePalette = {
    primary: {
        default: primaryLight,
        hover: darken(0.05, primaryLight),
        active: darken(0.1, primaryLight),
        background: transparentize(0.8, lighten(0.1, primaryLight)),
    },

    success: {
        default: darken(0.2, success),
        background: transparentize(0.8, success),
    },
    danger: {
        default: danger,
        background: transparentize(0.8, danger),
    },
    warning: {
        default: darken(0.25, warning),
        background: transparentize(0.8, warning),
    },
    info: {
        default: info,
        background: transparentize(0.8, info),
    },

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

const primaryDark = '#919aff';
const dark: ThemePalette = {
    primary: {
        default: primaryDark,
        hover: darken(0.05, primaryDark),
        active: darken(0.1, primaryDark),
        background: transparentize(0.8, primaryDark),
    },

    success: {
        default: success,
        background: transparentize(0.8, success),
    },
    danger: {
        default: danger,
        background: transparentize(0.8, danger),
    },
    warning: {
        default: warning,
        background: transparentize(0.8, warning),
    },
    info: {
        default: info,
        background: transparentize(0.8, info),
    },

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
