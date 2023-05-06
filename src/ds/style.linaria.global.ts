import { css } from '@linaria/core';
import { commonThemeVar, darkThemeVar, lightThemeVar, theme } from '@/ds/theme';
import { pretendardCss } from '@/ds/fonts';

export const globals = css`
  :global() {
    :root {
      ${commonThemeVar};
    }

    html {
      background-color: ${theme.background};
      color: ${theme.text.primary};
      font-family: ${theme.font};
    }

    body {
      margin: 0;
      padding: 0;
    }

    * {
      background-color: transparent;
      color: inherit;
      font-family: inherit;
    }

    img {
      border-radius: ${theme.borderRadius};
    }

    hr {
      border: none;
      border-top: 1px solid ${theme.contour};
    }

    ${pretendardCss}
    [data-theme='dark'] {
      ${darkThemeVar};
    }

    [data-theme='light'] {
      ${lightThemeVar};
    }
  }
`;
