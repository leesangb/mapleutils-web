import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { theme } from '@/ds/theme';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface TypographyProps {
    as?: Variant;
    variant?: Variant;
    color?: string;
    fontSize?: number;
}

const typographyCssMap: Partial<Record<NonNullable<TypographyProps['as']>, string>> = {
    p: `
        lineHeight: 1.5;
    `,
    h1: `
      font-size: 32px;
      line-height: 1.5;
    `,
    h2: `
      font-size: 24px;
      line-height: 1.5;
    `,
    h3: `
      font-size: 20px;
      line-height: 1.5;
    `,
    h4: `
      font-size: 18px;
      line-height: 1.5;
    `,
    h5: `
      font-size: 16px;
      line-height: 1.5;
    `,
    h6: `
      font-size: 14px;
      line-height: 1.5;
    `,
};

export const Typography = ({ as = 'p', variant = as, fontSize, ...props }: PropsWithChildren<TypographyProps>) => {
    return <Text as={as} $fontSize={fontSize} $variant={variant} {...props} />;
};

type TransientTypographyProps = TransientProps<Omit<TypographyProps, 'as'>>;

const Text = styled.p<TransientTypographyProps>`
  color: ${({ $color }) => $color || theme.text.primary};
  font-family: ${theme.font};
  padding: 0;
  margin: 0;
  font-size: 16px;
  ${({ $variant }) => $variant && typographyCssMap[$variant]};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}px`};
`;
