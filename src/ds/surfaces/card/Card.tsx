import styled from 'styled-components';
import { theme } from '@/ds/theme';

export const Card = styled.div`
  box-sizing: border-box;
  background-color: ${theme.surface.default};
  border-radius: 8px;
  border: 1px solid ${theme.contour};
  padding: 16px;
`;
