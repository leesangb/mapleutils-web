import { theme } from '@/ds/theme';
import { CSSProperties, forwardRef, MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Languages } from '@/i18n/settings';
import { Interpolation } from 'styled-components/dist/types';
import { Link } from '@/ds/displays';

export type ButtonProps = {
    size?: 'small' | 'medium' | 'large';
    onClick?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    children?: ReactNode;
    active?: boolean;
    href?: string;
    target?: string;
    lang?: Languages;
    styles?: Interpolation<CSSProperties>;
    variant?: 'outlined' | 'ghost';
    style?: CSSProperties;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
    children,
    size,
    active,
    href,
    lang,
    styles,
    target,
    variant = 'outlined',
    disabled = false,
    type = 'button',
    ...props
}, ref) {
    return href
        ? lang
            ? (
                <StyledButton ref={ref} as={Link} href={href} lang={lang}
                    target={target}
                    $variant={variant} $size={size}
                    $active={active}
                    $styles={styles} {...props}>
                    {children}
                </StyledButton>
            ) : (
                <StyledButton ref={ref} as={'a'} href={href}
                    target={target}
                    $variant={variant} $size={size}
                    $active={active}
                    $styles={styles} {...props}>
                    {children}
                </StyledButton>
            )
        : (
            <StyledButton ref={ref} $active={active}
                $variant={variant} $size={size}
                $styles={styles} disabled={disabled} type={type} {...props}>
                {children}
            </StyledButton>
        );
});

const variantMap = {
    outlined: css`
      border: 1px solid ${theme.contour};

      &:disabled {
        color: ${theme.text.disabled};
      }
    `,
    ghost: css`
      background-color: transparent;
      border: none;
      padding: 9px;

      &:disabled {
        color: ${theme.text.disabled};
      }
    `,
};

const sizeMap = {
    small: css`
      font-size: 12px;
      padding: 6px;
    `,
    medium: css`
      font-size: 14px;
    `,
    large: css`
      font-size: 16px;
    `,
};

const StyledButton = styled.button<TransientProps<Omit<ButtonProps, 'onClick' | 'href' | 'lang' | 'disabled' | 'type'>>>`
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

  @media (hover: hover) {
    &:hover {
      background-color: ${theme.surface.hover};
    }
  }

  &:active {
    background-color: ${theme.surface.active};
  }

  ${({ $active }) => $active && css`
    && {
      background-color: ${theme.primary.default};
      transition: background-color 0.125s ease-in-out;
    }

    @media (hover: hover) {
      &:hover {
        background-color: ${theme.primary.hover};
      }
    }

    &:active {
      background-color: ${theme.primary.active};
    }
  `}
  ${({ $styles }) => $styles && $styles}
  ${({ $variant }) => $variant && variantMap[$variant]}
  ${({ $size }) => $size && sizeMap[$size]}
  &:disabled {
    pointer-events: none;
  }
`;
