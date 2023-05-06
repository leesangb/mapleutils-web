import { styled } from '@linaria/react';
import { theme } from '@/ds/theme';

export const Card = styled.div`
  background-color: ${theme.surface.default};
  border-radius: 8px;
  border: 1px solid ${theme.contour};
  padding: 16px;
`;
