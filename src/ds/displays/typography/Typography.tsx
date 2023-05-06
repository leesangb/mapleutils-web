import { styled } from '@linaria/react';
import { PropsWithChildren } from 'react';
import { theme } from '@/ds/theme';
import { css, cx } from '@linaria/core';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface TypographyProps {
    as?: Variant;
    variant?: Variant;
    color?: string;
    fontSize?: number;
}

const typographyCss = css`
  font-family: ${theme.font};
  font-size: 16px;
  padding: 0;
  margin: 0;
`;

const typographyCssMap: Partial<Record<NonNullable<TypographyProps['as']>, ReturnType<typeof css>>> = {
    p: css`
      line-height: 1.5;
    `,
    h1: css`
      font-size: 32px;
      line-height: 1.5;
    `,
    h2: css`
      font-size: 24px;
      line-height: 1.5;
    `,
    h3: css`
      font-size: 20px;
      line-height: 1.5;
    `,
    h4: css`
      font-size: 18px;
      line-height: 1.5;
    `,
    h5: css`
      font-size: 16px;
      line-height: 1.5;
    `,
    h6: css`
      font-size: 14px;
      line-height: 1.5;
    `,
};

export const Typography = ({ as = 'p', variant = as, fontSize, ...props }: PropsWithChildren<TypographyProps>) => {
    return <Text as={as} style={{ fontSize: fontSize ? `${fontSize}px` : undefined }}
        className={cx(typographyCss, typographyCssMap[variant])} {...props} />;
};

const Text = styled.p<TypographyProps>`
  color: ${({ color }) => color || theme.text.primary};
`;
