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
      background-color: inherit;
      color: inherit;
      font-family: inherit;
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
