import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Typography } from '@/ds/displays';
import { Card } from '@/ds/surfaces';
import { Button } from '@/ds/inputs';
import { RiCloseLine } from 'react-icons/ri';
import { keyframes } from '@/ds';

interface ModalProps {
    title?: string;
    onClose?: () => void;
    onAnimationEnd?: () => void;
}

export const Modal = ({ children, title, onClose, onAnimationEnd }: PropsWithChildren<ModalProps>) => {
    return (
        <Container role={'dialog'} onAnimationEnd={onAnimationEnd}>
            {onClose && <CloseButton variant={'ghost'} onClick={() => onClose()}>
                <RiCloseLine />
            </CloseButton>}
            {title && <Typography as={'h2'}>{title}</Typography>}
            {children}
        </Container>
    );
};

const ModalActions = ({ children }: PropsWithChildren) => {
    return (
        <ActionsContainer>
            {children}
        </ActionsContainer>
    );
};

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

Modal.Actions = ModalActions;
Modal.Content = styled.div`
  overflow: scroll;
  max-width: 85vw;
  max-height: 85vh;
  max-height: 85dvh;
`;

const Container = styled(Card)`
  position: fixed;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.surface.active};
  min-width: 320px;
  padding: 12px;

  animation: ${keyframes.growInSmall} 0.2s ease-in-out;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  font-size: 12px;
  z-index: 1;
`;
