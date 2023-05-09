import { theme } from '@/ds/theme';
import { CSSProperties, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Languages } from '@/i18n/settings';
import { Interpolation } from 'styled-components/dist/types';
import { Link } from '@/ds/displays';

type ButtonProps = {
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children?: ReactNode;
    active?: boolean;
    href?: string;
    lang?: Languages;
    styles?: Interpolation<CSSProperties>;
}

export const Button = ({ children, size, active, href, lang, styles, ...props }: ButtonProps) => {
    return href
        ? lang
            ? (
                <StyledButton as={Link} href={href} lang={lang}
                    $active={active} $styles={styles} $size={size} {...props}>
                    {children}
                </StyledButton>
            ) : (
                <StyledButton as={'a'} href={href}
                    $active={active} $styles={styles} $size={size} {...props}>
                    {children}
                </StyledButton>
            )
        : (
            <StyledButton $active={active} $size={size} $styles={styles} {...props}>
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
  transition: background-color 0.125s ease-in-out;

  &:hover {
    background-color: ${theme.surface.hover};
  }

  &:active {
    background-color: ${theme.surface.active};
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
  `}
  ${({ $styles }) => $styles && $styles}
`;
