import { Chip } from '@mui/material';
import { formatNumberComma } from '@tools/string';
import NextImage, { ImageProps } from 'next/image';
import 와르 from '../../../../public/images/monster-life/와르.png';
import 젬 from '../../../../public/images/monster-life/젬.png';
import { Box } from '@mui/system';

interface MonsterCostChipProps {
    cost: number;
}

const images: Record<'와르' | '젬', ImageProps> = {
    ['와르']: {
        src: 와르,
        alt: 'money-cost',
    },
    ['젬']: {
        src: 젬,
        alt: 'money-cost',
    },
};

const MonsterCostChip = ({ cost }: MonsterCostChipProps) => {
    return (
        <Chip size={'small'}
              icon={<Box sx={{
                  display: 'flex',
                  alignItems: 'center',
              }}>
                  <NextImage {...(cost > 499 ? images['와르'] : images['젬'])} />
              </Box>}
              label={formatNumberComma(cost)}
        />
    );
};

export default MonsterCostChip;