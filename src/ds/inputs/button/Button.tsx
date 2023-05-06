import { theme } from '@/ds/theme';
import { css, cx } from '@linaria/core';
import { Link } from '@/ds/displays';
import { Languages } from '@/i18n/settings';
import { CSSProperties, ReactNode } from 'react';

type ButtonProps = {
    style?: CSSProperties;
    size?: 'small' | 'medium' | 'large';
    href?: string;
    lang?: Languages;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    active?: boolean;
}

export const Button = ({
    size,
    href,
    lang,
    active,
    className,
    ...props
}: ButtonProps) => {
    return href && lang
        ? <Link className={cx(active && activeCss, buttonCss, className)} href={href} lang={lang} {...props} />
        : <button className={cx(active && activeCss, buttonCss, className)} {...props} />;
};

const activeCss = css`
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
`;

const buttonCss = css`
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
`;

Button.buttonCss = buttonCss;
