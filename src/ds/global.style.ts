import { createGlobalStyle } from 'styled-components';
import { commonThemeVar, darkThemeVar, lightThemeVar, theme } from '@/ds/theme';
import { pretendardCss } from '@/ds/fonts';
import { media } from '@/ds/media';

const GlobalStyle = createGlobalStyle`
  :root {
    ${commonThemeVar};
    --toastify-color-light: ${theme.surface.default};
    --toastify-color-dark: ${theme.surface.default};
    --toastify-color-info: ${theme.info.default};
    --toastify-color-success: ${theme.success.default};
    --toastify-color-warning: ${theme.warning.default};
    --toastify-color-error: ${theme.danger.default};
    --toastify-color-transparent: rgba(255, 255, 255, 0.9);
    --toastify-icon-color-info: var(--toastify-color-info);
    --toastify-icon-color-success: var(--toastify-color-success);
    --toastify-icon-color-warning: var(--toastify-color-warning);
    --toastify-icon-color-error: var(--toastify-color-error);
    --toastify-toast-background: ${theme.background};
    --toastify-text-color-light: ${theme.text.primary};
    --toastify-text-color-dark: ${theme.text.primary};
    --toastify-text-color-info: ${theme.info.default};
    --toastify-text-color-success: ${theme.success.default};
    --toastify-text-color-warning: ${theme.warning.default};
    --toastify-text-color-error: ${theme.danger.default};
    --toastify-spinner-color: ${theme.contour};
    --toastify-spinner-color-empty-area: ${theme.contour};
    --toastify-color-progress-light: ${theme.primary.default};
    --toastify-color-progress-dark: ${theme.primary.default};
    --toastify-color-progress-info: var(--toastify-color-info);
    --toastify-color-progress-success: var(--toastify-color-success);
    --toastify-color-progress-warning: var(--toastify-color-warning);
    --toastify-color-progress-error: var(--toastify-color-error);
    --toastify-toast-width: 320px;
  }

  html {
    background-color: ${theme.background};
    color: ${theme.text.primary};
    font-family: ${theme.font};
    scroll-behavior: smooth;
  }

  body {
    margin: ${theme.appBar.height} 0 0 0;
    padding: 16px;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 8px;
    grid-template-columns: minmax(160px, auto) minmax(auto, 1200px) minmax(160px, auto);
    grid-template-areas:
        'adl adt adr'
        'adl main adr'
        'adl comments adr'
        'adl footer adr';

    &:has(> div[data-mobile-animation="opened"]) {
      overflow: hidden;
    }

    @media (width <= 1528px) {
      grid-template-columns: minmax(auto, 1200px) minmax(160px, auto);
      grid-template-areas:
        'adt adr'
        'main adr'
        'comments adr'
        'footer adr';
    }

    ${media.max('sm')} {
      margin: ${theme.appBar.height} 0 0 0;
      grid-template-columns: 1fr;
      grid-template-areas:
          'adt'
          'main'
          'comments'
          'footer';
      padding: 8px;
    }
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

  .Toastify__toast {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.contour};
  }

  .Toastify__toast-container {
    font-size: 14px;
  }

  .Toastify__close-button > svg {
    fill: ${theme.text.primary};
  }
`;

export default GlobalStyle;
