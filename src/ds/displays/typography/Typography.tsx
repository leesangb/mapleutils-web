import { styled } from '@linaria/react';
import { PropsWithChildren } from 'react';
import { theme } from '@/ds/theme';
import { css, cx } from '@linaria/core';

interface TypographyProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    color?: string;
}

const typographyCss = css`
  font-family: ${theme.font};
  font-size: 16px;
`;

const typographyCssMap: Record<NonNullable<TypographyProps['as']>, ReturnType<typeof css>> = {
    p: css`
      font-size: 16px;
    `,
    h1: css`
      font-size: 32px;
    `,
    h2: css`
      font-size: 24px;
    `,
    h3: css`
      font-size: 20px;
    `,
    h4: css`
      font-size: 18px;
    `,
    h5: css`
      font-size: 16px;
    `,
    h6: css`
      font-size: 14px;
    `,
    div: css`
    `,
    span: css`
    `,
};

export const Typography = ({ as = 'p', ...props }: PropsWithChildren<TypographyProps>) => {
    return <Text as={as} className={cx(typographyCss, typographyCssMap[as])} {...props} />;
};

const Text = styled.p<TypographyProps>`
  color: ${({ color }) => color || theme.text.primary};
`;
