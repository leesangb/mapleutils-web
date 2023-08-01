import styled from 'styled-components';

export const PlayerButton = styled.button`
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  width: 48px;
  height: 48px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    transform: scale(0.9);
    background-color: ${({ theme }) => theme.surface.active};
  }

  &:disabled {
    background-color: transparent;
    cursor: not-allowed;
    transform: scale(0.7);
    color: ${({ theme }) => theme.text.disabled};
  }
`;
