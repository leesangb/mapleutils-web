import { theme } from '@/ds/theme';
import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Languages } from '@/i18n/settings';
import { Interpolation } from 'styled-components/dist/types';
import { Link } from '@/ds/displays';

type ButtonProps = {
    size?: 'small' | 'medium' | 'large';
    onClick?: MouseEventHandler;
    children?: ReactNode;
    active?: boolean;
    href?: string;
    lang?: Languages;
    styles?: Interpolation<CSSProperties>;
    variant?: 'outlined' | 'ghost';
}

export const Button = ({ children, size, active, href, lang, styles, variant = 'outlined', ...props }: ButtonProps) => {
    return href
        ? lang
            ? (
                <StyledButton as={Link} href={href} lang={lang}
                    $variant={variant} $size={size}
                    $active={active}
                    $styles={styles} {...props}>
                    {children}
                </StyledButton>
            ) : (
                <StyledButton as={'a'} href={href}
                    $variant={variant} $size={size}
                    $active={active}
                    $styles={styles} {...props}>
                    {children}
                </StyledButton>
            )
        : (
            <StyledButton $active={active}
                $variant={variant} $size={size}
                $styles={styles} {...props}>
                {children}
            </StyledButton>
        );
};

const variantMap = {
    outlined: css`
      border: 1px solid ${theme.contour};
    `,
    ghost: css`
      background-color: transparent;
      border: none;
      padding: 9px;
    `,
};

const StyledButton = styled.button<TransientProps<Omit<ButtonProps, 'children' | 'onClick' | 'href' | 'lang'>>>`
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${theme.surface.default};
  border: 1px solid ${theme.contour};
  height: fit-content;
  padding: 8px;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  display: flex;
  gap: 8px;
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
  ${({ $variant }) => $variant && variantMap[$variant]}
`;
