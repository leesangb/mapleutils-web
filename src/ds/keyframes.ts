import { keyframes as css } from 'styled-components';

export const keyframes = {
    spin: css`
      0% {
        transform: scale(0.2) rotate(0deg);
      }

      100% {
        transform: scale(1) rotate(360deg);
      }
    `,
    fadeIn: css`
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    `,
    fadeOut: css`
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    `,
} as const;
