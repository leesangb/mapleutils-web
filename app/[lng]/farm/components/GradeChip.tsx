import { theme } from '@/ds';
import styled from 'styled-components';
import { CSSProperties } from 'react';
import { MonsterLifeGrade } from '@/data/farm/monsterLifeGrade';

interface GradeChipProps {
    grade: MonsterLifeGrade;
    category?: string;
    className?: string;
    style?: CSSProperties;
}

const GradeChip = ({ grade, category, ...props }: GradeChipProps) => {
    return (
        <div {...props}>
            <Grade $grade={grade}>{grade}</Grade> {category}
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

const Grade = styled.span<TransientProps<Pick<GradeChipProps, 'grade'>>>`
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
