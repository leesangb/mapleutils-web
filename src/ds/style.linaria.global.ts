import { css } from '@linaria/core';
import { dark, light, theme } from '@/ds/theme';

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

export const globals = css`
  :global() {
    html {
      background-color: ${theme.background};
      color: ${theme.text.primary};
      font-family: ${theme.font};
    }

    html > * {
      background-color: inherit;
      color: inherit;
      font-family: inherit;
    }

    [data-theme='dark'] {
      ${Object.entries(flattenObject(dark)).map(([k, v]) => `--${k}: ${v};`).join('\n')}
    }

    [data-theme='light'] {
      ${Object.entries(flattenObject(light)).map(([k, v]) => `--${k}: ${v};`).join('\n')}
    }
  }
`;
