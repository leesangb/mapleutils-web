import { css } from 'styled-components';
import { keyframes } from '@/ds/keyframes';

export const rotateGrowOutLeft = css`
  &:active > svg {
    transform: scale(0.2) rotate(-360deg);
  }

  svg {
    transition: transform 0.325s ease-in-out;
    animation: ${keyframes.spin} 0.325s ease-in-out;
  }
`;

export const rotateGrowOutRight = css`
  &:active > svg {
    transform: scale(0.2) rotate(360deg);
  }

  svg {
    transition: transform 0.325s ease-in-out;
    animation: ${keyframes.spin} 0.325s ease-in-out;
  }
`;
