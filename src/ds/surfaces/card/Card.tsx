import { styled } from '@linaria/react';
import { theme } from '@/ds/theme';

export const Card = styled.div`
  background-color: ${theme.surface};
  border-radius: 8px;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.15);
  padding: 16px;
`;
