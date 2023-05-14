import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

interface TooltipProps {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    title: string;
    as?: keyof JSX.IntrinsicElements;
}

export const Tooltip = ({ as = 'div', placement = 'bottom', title, children }: PropsWithChildren<TooltipProps>) => {
    return (
        <Container as={as}>
            {children}
            <Content $placement={placement}>{title}</Content>
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

const Content = styled.span<Required<TransientProps<Pick<TooltipProps, 'placement'>>>>`
  position: absolute;
  visibility: hidden;
  background-color: ${({ theme }) => theme.tooltip.background};
  color: ${({ theme }) => theme.tooltip.color};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px;
  font-size: 14px;
  backdrop-filter: blur(10px);
  transition: opacity 0.125s ease-in-out;
  opacity: 0;
  z-index: 1;
  min-width: 70%;

  &::after {
    content: "";
    position: absolute;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.tooltip.background} transparent transparent transparent;
  }

  ${({ $placement }) => placementMap[$placement]};
`;

const Container = styled.div`
  position: relative;

  &:hover > ${Content},
  &:active > ${Content} {
    visibility: visible;
    display: block;
    opacity: 1;
  }
`;
