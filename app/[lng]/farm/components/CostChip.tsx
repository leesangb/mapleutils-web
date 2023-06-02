import styled from 'styled-components';
import { formatNumberComma } from '@/utils/string';

interface CostChipProps {
    cost: number;
}

const CostChip = ({ cost }: CostChipProps) => {
    return (
        <Container>
            <Image src={`/images/monster-life/${cost > 499 ? '와르' : '젬'}.png`} alt={'cost'} />
            {formatNumberComma(cost)}
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

export default CostChip;
