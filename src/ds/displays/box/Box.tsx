import { ComponentType, CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Interpolation } from 'styled-components/dist/types';

interface BoxProps {
    styles?: Interpolation<CSSProperties>;
    as?: ComponentType;
}

export const Box = ({ as, styles, children }: PropsWithChildren<BoxProps>) => {
    return <Div as={as} $styles={styles}>{children}</Div>;
};

const Div = styled.div<TransientProps<BoxProps>>`
  ${({ $styles }) => $styles}
`;
