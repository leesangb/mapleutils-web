'use client';

import { TrackInfo } from '@/data/seed/24';
import { useLocalizedPathname } from '@/hooks/useLocalizedPathname';
import { useTranslation } from '@/i18n/client';
import { useState } from 'react';
import { englishToHangul, isHangulMatching, isMatching } from '@/utils/string';
import { SearchInput } from '@/ds/inputs';
import VirtualizedTable, { VirtualizedRowProps } from '@/components/virtualized/VirtualizedTable';
import { Tooltip, Typography } from '@/ds/displays';
import styled from 'styled-components';
import { media, theme } from '@/ds';
import { copy } from '@/utils/clipboard';
import { toast } from 'react-toastify';

interface HintContentProps {
    data: TrackInfo[];
}

export const HintContent = ({ data }: HintContentProps) => {
    const { locale } = useLocalizedPathname();
    const { t } = useTranslation({ ns: 'seed24' });
    const [input, setInput] = useState<string>('');

    const rows = data.filter(({ name, hint }) => locale === 'ko'
        ? isHangulMatching(input, name, hint)
        : isMatching(input, name, hint));

    return (
        <>
            <Tooltip title={locale === 'ko' ? englishToHangul(input) : ''} placement={'top'}>
                <SearchInput fullWidth
                    placeholder={t('searchPlaceholder')}
                    value={input}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Tooltip>
            <VirtualizedTable data={rows}
                height={'calc(100vh - var(--appBar_height) * 3.5)'}
                estimatedRowHeight={() => 40}
                overScan={5}
                RowComponent={HintRow}
                EmptyComponent={EmptyComponent}
            />
        </>
    );
};

const HintRow = ({ rowData, measureRef, ...props }: VirtualizedRowProps<TrackInfo>) => {
    const { name, hint, coverImg } = rowData;
    const { t } = useTranslation();
    return (
        <Row onClick={() => {
            copy(name).then(() => toast.success(t('copyMessage', { text: name })));
        }} ref={measureRef} {...props}>
            <GridIconCell>
                <Image src={coverImg} alt={name} />
            </GridIconCell>
            <GridNameCell>
                {name}
            </GridNameCell>
            <GridHintCell>
                {hint}
            </GridHintCell>
        </Row>
    );
};

const Image = styled.img`
  border-radius: 0;
`;

const ROW_PADDING = 8;
const ROW_BORDER_BOTTOM_WIDTH = 1;

const GridIconCell = styled.td`
  grid-area: icon;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridNameCell = styled.td`
  grid-area: name;
`;

const GridHintCell = styled.td`
  grid-area: hint;
`;

const Row = styled.tr`
  width: 100%;
  display: grid;
  grid-template-columns: 60px 150px auto;
  grid-template-areas: "icon name hint";
  align-items: center;
  padding: ${ROW_PADDING}px 0;
  gap: 8px;
  border-bottom: ${ROW_BORDER_BOTTOM_WIDTH}px solid ${({ theme }) => theme.contour};


  ${media.max('sm')} {
    grid-template-columns: 60px 1fr;
    grid-template-areas:
    "icon name"
    "hint hint";
  }
  
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.background};
      cursor: pointer;
    }
  }
`;

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
