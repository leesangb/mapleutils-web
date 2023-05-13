import styled from 'styled-components';
import { theme } from '@/ds/theme';

interface AvatarProps {
    name: string;
    color?: string;
    backgroundColor?: string;
}

export const Avatar = ({ name, backgroundColor, color }: AvatarProps) => {
    return (
        <Container $backgroundColor={backgroundColor} $color={color}>{name.slice(0, 2)}</Container>
    );
};

const size = 32;

const Container = styled.div<TransientProps<Omit<AvatarProps, 'name'>>>`
  height: ${size}px;
  min-height: ${size}px;
  max-height: ${size}px;
  width: ${size}px;
  min-width: ${size}px;
  max-width: ${size}px;
  font-size: 16px;
  border-radius: 50%;
  border: 1px solid ${theme.contour};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
  color: ${({ $color }) => $color || theme.text.secondary};
  background-color: ${({ $backgroundColor }) => $backgroundColor || theme.background};
  transition: background-color 0.2s ease-in-out;
`;
