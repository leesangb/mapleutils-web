import { theme } from '@/ds/theme';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Languages } from '@/i18n/settings';
import Link from 'next/link';

type ButtonProps = {
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children?: ReactNode;
    active?: boolean;
    href?: string;
    lang?: Languages;
}

export const Button = ({ children, size, active, href, lang, ...props }: ButtonProps) => {
    return href && lang ?
        <StyledButton as={Link} href={href} lang={lang} $active={active}
            $size={size} {...props}>{children}</StyledButton>
        : (
            <StyledButton $active={active} $size={size} {...props}>
                {children}
            </StyledButton>
        );
};

const StyledButton = styled.button<TransientProps<Omit<ButtonProps, 'children' | 'onClick' | 'href' | 'lang'>>>`
  position: relative;
  background-color: ${theme.surface.default};
  border-radius: ${theme.borderRadius};
  border: 1px solid ${theme.contour};
  padding: 8px;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    border-radius: calc(${theme.borderRadius} - 1px);
    display: inline-block;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: -1;
    transition: all 0.125s ease-in-out;
  }

  &:hover::after {
    opacity: 0.125;
  }

  &:active::after {
    opacity: 0.375;
  }

  ${({ $active }) => $active && css`
    && {
      background-color: ${theme.primary.default};
      transition: background-color 0.125s ease-in-out;
    }

    &:hover {
      background-color: ${theme.primary.hover};
    }

    &:active {
      background-color: ${theme.primary.active};
    }

    &&:hover::after {
      opacity: 0;
    }

    &&:active::after {
      opacity: 0;
    }
  `}
`;
