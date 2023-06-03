import { theme } from '@/ds';
import styled from 'styled-components';
import { CSSProperties } from 'react';

interface GradeChipProps {
    grade: string;
    category?: string;
    className?: string;
    style?: CSSProperties;
}

const GradeChip = ({ grade, category, ...props }: GradeChipProps) => {
    return (
        <div {...props}>
            <Grade $grade={grade as unknown as any}>{grade}</Grade> {category}
        </div>
    );
};

const GradeColors = {
    SS: theme.warning.default,
    S: theme.primary.default,
    ['A+']: theme.danger.default,
    A: theme.info.default,
    ['B+']: theme.success.default,
    B: 'orange',
    C: theme.contour,
};

const Grade = styled.span<TransientProps<{ grade: 'C' | 'B' | 'B+' | 'A' | 'A+' | 'S' | 'SS' }>>`
  display: inline-flex;
  background-color: ${({ theme }) => theme.primary.default};
  width: 12px;
  height: 12px;
  font-size: 8px;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;

  background-color: ${({ $grade }) => GradeColors[$grade]}
}
`;

export default GradeChip;
