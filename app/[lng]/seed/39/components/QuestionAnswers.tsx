'use client';

import { QuestionAnswer } from '@/data/seed/39';
import VirtualizedTable, { VirtualizedRowProps } from '@/components/virtualized/VirtualizedTable';
import styled from 'styled-components';
import { useState } from 'react';
import { englishToHangul, isHangulMatching, isMatching } from '@/utils/string';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { Button, SearchField } from '@/ds/inputs';
import { useTranslation } from '@/i18n/client';
import { Tooltip, Typography } from '@/ds/displays';
import { media, theme } from '@/ds';
import { RiCheckboxBlankLine, RiCheckboxFill, RiCheckboxMultipleFill, RiSettings2Fill } from 'react-icons/ri';
import { Collapse } from '@/ds/surfaces';
import { useSeed39Store } from '@/store/useSeed39Store';
import { rotateGrowOut } from '@/ds/css';

interface QuestionAnswersProps {
    data: QuestionAnswer[];
}

const estimatedRowHeight = () => {
    return ROW_PADDING * 2 + ROW_BORDER_BOTTOM_WIDTH
        + CHOICE_PADDING * 2 + CHOICE_FONT_SIZE;
};

const QuestionAnswers = ({ data }: QuestionAnswersProps) => {
    const { locale } = useLocalizedPathname();
    const { t } = useTranslation({ ns: 'seed39' });
    const [input, setInput] = useState<string>('');
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const { filter, setFilter } = useSeed39Store();

    const rows = data.filter(({ question, choices }) => {
        const keywords = [question, ...choices].filter((_, i) => filter[i]);
        return locale === 'ko'
            ? isHangulMatching(input, ...keywords)
            : isMatching(input, ...keywords);
    });

    return (
        <>
            <SearchBarContainer>
                <Tooltip style={{ width: '100%' }} title={locale === 'ko' ? englishToHangul(input) : ''}
                    placement={'top'}>
                    <SearchField fullWidth
                        placeholder={t('searchPlaceholder')}
                        value={input}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </Tooltip>
                <Tooltip title={t('settings')}>
                    <Button styles={rotateGrowOut} onClick={() => setSettingsOpen(!settingsOpen)}>
                        <RiSettings2Fill />
                    </Button>
                </Tooltip>
            </SearchBarContainer>
            <ButtonContainer open={settingsOpen}>
                <Button onClick={() => setFilter(!filter.every(v => v), 0, 1, 2, 3, 4)}>
                    <RiCheckboxMultipleFill />
                    {t('all')}
                </Button>
                {filter.map((value, index) =>
                    <Button key={index} onClick={() => setFilter(!value, index as 0 | 1 | 2 | 3 | 4)}>
                        {value
                            ? <RiCheckboxFill color={theme.primary.default} />
                            : <RiCheckboxBlankLine />}
                        {index === 0 ? t('question') : `${index}`}
                    </Button>,
                )}
            </ButtonContainer>
            <VirtualizedTable data={rows}
                height={'calc(100vh - var(--appBar_height) * 3.5)'}
                estimatedRowHeight={estimatedRowHeight}
                overScan={5}
                RowComponent={QuestionAnswerRow}
                EmptyComponent={EmptyComponent}
            />
        </>
    );
};

const EmptyComponent = () => {
    const { t } = useTranslation();
    return (
        <Typography variant={'h3'}
            style={{
                color: theme.text.disabled,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {t('noResultsFound')}
        </Typography>
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const ROW_PADDING = 8;
const ROW_BORDER_BOTTOM_WIDTH = 1;

const Row = styled.tr`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "question choice1 choice2 choice3 choice4";
  align-items: center;
  padding: ${ROW_PADDING}px 0;
  gap: 8px;
  border-bottom: ${ROW_BORDER_BOTTOM_WIDTH}px solid ${({ theme }) => theme.contour};

  ${media.max('md')} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "question question question question"
    "choice1  choice2  choice3  choice4 ";
  }

  ${media.max('sm')} {
    grid-template-columns: 1fr;
    grid-template-areas:
    "question"
    "choice1"
    "choice2"
    "choice3"
    "choice4";
  }
`;

const CHOICE_PADDING = 12;
const CHOICE_FONT_SIZE = 14;

const Choice = styled.td<TransientProps<{ active: boolean }>>`
  padding: ${CHOICE_PADDING}px 8px;
  border-radius: calc(${({ theme }) => theme.borderRadius} * 2);
  font-size: ${CHOICE_FONT_SIZE}px;
  background-color: ${({ theme, $active }) => $active ? theme.primary.default : theme.background};
`;

const ButtonContainer = styled(Collapse)`
  display: flex;
  gap: 8px;
`;

export default QuestionAnswers;
