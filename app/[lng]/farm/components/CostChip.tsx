import styled from 'styled-components';
import { formatNumberComma } from '@/utils/string';
import { Tooltip } from '@/ds/displays';

interface CostChipProps {
    cost: number;
}

const CostChip = ({ cost }: CostChipProps) => {
    const imageSrc = `/images/monster-life/${cost > 499 ? '와르' : '젬'}.png`;
    return (
        <Container>
            <picture>
                <source srcSet={imageSrc.replace('.png', '.webp')} type={'image/webp'} />
                <Image src={imageSrc} alt={'cost'} />
            </picture>
            <ImageTooltip title={cost > 499 ? '와르' : '젬'} size={'small'} placement={'right'}>
                {formatNumberComma(cost)}
            </ImageTooltip>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Image = styled.img`
  width: 12px;
  height: auto;
`;

const ImageTooltip = styled(Tooltip)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default CostChip;
