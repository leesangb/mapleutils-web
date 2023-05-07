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
} as const;
