import { CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';

type Alignment = 'left' | 'right' | 'center';

interface FieldsetProps {
    align?: Alignment;
    title?: string;
    legendAlign?: Alignment;
    style?: CSSProperties;
    className?: string;
}

const marginMap: Record<Alignment, string> = {
    left: 'margin-right: auto;',
    right: 'margin-left: auto;',
    center: 'margin-left: auto; margin-right: auto;',
};

export const Fieldset = ({
    children,
    title,
    align = 'left',
    legendAlign = 'left',
    style,
    className,
}: PropsWithChildren<FieldsetProps>) => {
    return <Container style={style} className={className} $align={align}>
        <Legend $align={legendAlign}>{title}</Legend>
        {children}
    </Container>;
};

const Container = styled.fieldset<TransientProps<{ align: Alignment }>>`
  border-color: ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-style: solid;
  border-width: 1px;
  display: block;
  width: fit-content;
  ${({ $align }) => marginMap[$align]}
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Legend = styled.legend<TransientProps<{ align: Alignment }>>`
  padding: 0 8px;
  ${({ $align }) => marginMap[$align]}
`;
