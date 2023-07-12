import { CSSProperties, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { keyframes } from '@/ds/keyframes';

export interface TooltipProps {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    title: string;
    as?: keyof JSX.IntrinsicElements;
    size?: 'small' | 'medium' | 'large';
    style?: CSSProperties;
    tooltipStyle?: CSSProperties;
}

export const Tooltip = ({
    as = 'div',
    placement = 'bottom',
    size = 'medium',
    title,
    children,
    style,
    tooltipStyle,
    ...props
}: PropsWithChildren<TooltipProps>) => {
    return (
        <Container as={as} style={style} {...props}>
            {children}
            {title && <Content $size={size} $placement={placement} style={tooltipStyle}>{title}</Content>}
        </Container>
    );
};

const placementMap = {
    bottom: css`
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(8px);

      &::after {
        bottom: 100%;
        left: 50%;
        transform: rotate(180deg);
      }
    `,
    top: css`
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);

      &::after {
        top: 100%;
        left: 50%;
      }
    `,
    left: css`
      top: 50%;
      right: 100%;
      transform: translateX(-8px) translateY(-50%);

      &::after {
        top: 50%;
        left: 100%;
        margin-left: 0;
        transform: rotate(270deg) translateX(50%);
      }
    `,
    right: css`
      top: 50%;
      left: 100%;
      transform: translateX(8px) translateY(-50%);

      &::after {
        top: 50%;
        right: 100%;
        transform: rotate(90deg) translateX(-50%);
      }
    `,
};

const sizeMap = {
    small: css`
      padding: 4px;
      font-size: 12px;
    `,
    medium: css`
      padding: 6px;
      font-size: 14px;
    `,
    large: css`
      padding: 8px;
      font-size: 16px;
    `,
};

const Content = styled.span<Required<TransientProps<Pick<TooltipProps, 'placement' | 'size'>>>>`
  position: absolute;
  display: none;
  background-color: ${({ theme }) => theme.tooltip.background};
  color: ${({ theme }) => theme.tooltip.color};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: max-content;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  max-width: 280px;
  animation: ${keyframes.fadeIn} 0.125s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.tooltip.background} transparent transparent transparent;
  }

  ${({ $size }) => sizeMap[$size]};
  ${({ $placement }) => placementMap[$placement]};
`;

const Container = styled.div`
  position: relative;

  &:hover > *:not(:disabled) + ${Content},
  &:active > ${Content} {
    display: block;
    opacity: 1;
  }
`;
