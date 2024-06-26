import styled from 'styled-components';
import { CSSProperties, PropsWithChildren } from 'react';
import { theme } from '@/ds/theme';

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'] as const;
const isVariant = (variant: string): variant is Variant => variants.includes(variant);
type Variant = typeof variants[number];

interface TypographyProps {
    as?: keyof JSX.IntrinsicElements;
    variant?: Variant;
    color?: string;
    fontSize?: number;
    style?: CSSProperties;
    title?: string;
}

const typographyCssMap: Partial<Record<NonNullable<TypographyProps['variant']>, string>> = {
    p: `
        line-height: 1.5;
    `,
    h1: `
      font-size: 32px;
      line-height: 1.5;
      text-wrap: balance;
    `,
    h2: `
      font-size: 24px;
      line-height: 1.5;
      text-wrap: balance;
    `,
    h3: `
      font-size: 20px;
      line-height: 1.5;
      text-wrap: balance;
    `,
    h4: `
      font-size: 18px;
      line-height: 1.5;
      text-wrap: balance;
    `,
    h5: `
      font-size: 16px;
      line-height: 1.5;
      text-wrap: balance;
    `,
    h6: `
      font-size: 14px;
      line-height: 1.5;
      text-wrap: balance;
    `,
};

export const Typography = ({
    as = 'p',
    variant = isVariant(as) ? as : 'p',
    fontSize,
    ...props
}: PropsWithChildren<TypographyProps>) => {
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
