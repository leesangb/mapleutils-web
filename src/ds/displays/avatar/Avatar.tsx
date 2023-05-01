import { styled } from '@linaria/react';
import { theme } from '@/ds/theme';

interface AvatarProps {
    name: string;
    color?: string;
    backgroundColor?: string;
}

export const Avatar = ({ name, backgroundColor, color }: AvatarProps) => {
    return (
        <Container backgroundColor={backgroundColor} color={color}>{name.slice(0, 2)}</Container>
    );
};

const Container = styled.div<Omit<AvatarProps, 'name'>>`
  width: 40px;
  height: 40px;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
  color: ${({ color }) => color || theme.text.secondary};
  background-color: ${({ backgroundColor }) => backgroundColor || theme.surface};
`;
