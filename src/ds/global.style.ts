import { createGlobalStyle } from 'styled-components';
import { commonThemeVar, darkThemeVar, lightThemeVar, theme } from '@/ds/theme';
import { pretendardCss } from '@/ds/fonts';

const GlobalStyle = createGlobalStyle`
  :root {
    ${commonThemeVar};
  }

  html {
    background-color: ${theme.background};
    color: ${theme.text.primary};
    font-family: ${theme.font};
  }

  body {
    margin: ${theme.appBar.height} 0 0 ${theme.sideBar.width};
    padding: 0;
  }

  * {
    background-color: transparent;
    color: inherit;
    font-family: inherit;
  }

  img, video {
    border-radius: ${theme.borderRadius};
  }

  kbd {
    background-color: ${theme.surface.default};
    border-radius: 3px;
    border: 1px solid ${theme.contour};
    color: ${theme.text.secondary};
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    padding: 2px 4px;
    white-space: nowrap;
    margin: 0 2px;
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.contour};
    margin: 16px 0;
  }

  ${pretendardCss}
  [data-theme='dark'] {
    ${darkThemeVar};
  }

  [data-theme='light'] {
    ${lightThemeVar};
  }

  ::-moz-selection { /* Code for Firefox */
    background: ${theme.primary.default};
  }

  ::selection {
    background: ${theme.primary.default};
  }
`;

export default GlobalStyle;
