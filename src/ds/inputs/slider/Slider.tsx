import styled from 'styled-components';

export const Slider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  color: ${({ theme }) => theme.primary.default};
  --thumb-size: 16px;
  --track-height: 2px;
  --track-color: ${({ theme }) => theme.contour};
  --clip-edges: 2px;
  position: relative;
  overflow: hidden;

  &:active {
    cursor: grabbing;
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: not-allowed;
  }

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    transition: all ease 100ms;
    width: var(--thumb-size);
    height: var(--thumb-size);
    position: relative;
  }

  &::-webkit-slider-thumb {
    --clip-top: calc((var(--thumb-size) - var(--track-height)) * 0.5 - 0.5px);
    --clip-bottom: calc(var(--thumb-size) - var(--clip-top));
    --clip-further: calc(100% + 1px);
    --box-fill: calc(-100vmax - var(--thumb-size)) 0 0 100vmax currentColor;

    background: currentColor linear-gradient(currentColor 0 0) no-repeat scroll left;
    box-shadow: var(--box-fill);
    border-radius: 50%;

    filter: brightness(100%);
    clip-path: polygon(100% -1px, var(--clip-edges) -1px, 0 var(--clip-top),
    -100vmax var(--clip-top), -100vmax var(--clip-bottom), 0 var(--clip-bottom), var(--clip-edges) 100%,
    var(--clip-further) var(--clip-further));
  }

  &:hover::-webkit-slider-thumb {
    color: ${({ theme }) => theme.primary.hover};
    cursor: grab;
  }

  &:active::-webkit-slider-thumb {
    color: ${({ theme }) => theme.primary.active};
  }

  &::-webkit-slider-runnable-track {
    background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100% calc(var(--track-height) + 1px);
  }

  &:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }
`;
