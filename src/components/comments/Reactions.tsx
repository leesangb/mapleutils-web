import { Typography } from '@/ds/displays';
import styled from 'styled-components';
import NextImage from 'next/image';
import sangbin from '@/assets/images/sangbin.png';

interface ReactionsProps {
    reactions: string[];
}

export const Reactions = ({ reactions }: ReactionsProps) => {
    return (
        <Container as={'span'}>
            <NextImage draggable={false} src={sangbin} alt={''} width={20} height={20} />
            {reactions.join('')}
        </Container>
    );
};

const Container = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.contour};
  padding: 2px 4px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
