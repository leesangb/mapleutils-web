'use client';

import { QuestionAnswer } from '@/data/seed/39';
import VirtualizedTable, { VirtualizedRowProps } from '@/components/virtualized/VirtualizedTable';
import styled from 'styled-components';

interface QuestionAnswersProps {
    data: QuestionAnswer[];
}

const QuestionAnswers = ({ data }: QuestionAnswersProps) => {
    return (
        <VirtualizedTable data={data}
            height={'calc(100vh - var(--appBar_height) * 3)'}
            estimatedRowHeight={i => (14 + 24 + 12 + 8 + 1)}
            overScan={5}
            RowComponent={QuestionAnswerRow}
        />
    );
};

const QuestionAnswerRow = ({ rowData, measureRef, ...props }: VirtualizedRowProps<QuestionAnswer>) => {
    const { question, choices, answer } = rowData;
    return (
        <Row ref={measureRef} {...props}>
            <td style={{
                gridArea: 'question',
            }}>
                {question}
            </td>
            {
                choices.map((choice, i) => (
                    <Choice key={`${choice}_${i}`} style={{ gridArea: `choice${i + 1}` }}
                        $active={i === answer}>
                        {i + 1}. {choice}
                    </Choice>
                ))
            }
        </Row>
    );
};

const Row = styled.tr`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "question choice1 choice2 choice3 choice4";
  align-items: center;
  padding: 8px 0;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.contour};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "question question question question"
    "choice1  choice2  choice3  choice4 ";
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-template-areas:
    "question"
    "choice1"
    "choice2"
    "choice3"
    "choice4";
  }
`;

const Choice = styled.td<TransientProps<{ active: boolean }>>`
  padding: 12px 8px;
  border-radius: calc(${({ theme }) => theme.borderRadius} * 2);
  font-size: 14px;
  background-color: ${({ theme, $active }) => $active ? theme.primary.default : theme.background};
`;

export default QuestionAnswers;
