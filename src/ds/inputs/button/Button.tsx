import { styled } from '@linaria/react';
import { theme } from '@/ds/theme';

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    backgroundColor?: string;
}

export const Button = styled.button<ButtonProps>`
  font-size: ${({ size }) => size === 'large' ? '1.25rem' : '1rem'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border-radius: 8px;
  border: 1px solid ${theme.contour};
  padding: 8px;
`;
