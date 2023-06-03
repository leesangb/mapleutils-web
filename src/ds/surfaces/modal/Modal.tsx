import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Typography } from '@/ds/displays';
import { Card } from '@/ds/surfaces';
import { Button } from '@/ds/inputs';
import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
    title?: string;
    onClose?: () => void;
}

export const Modal = ({ children, title, onClose }: PropsWithChildren<ModalProps>) => {
    return (
        <Container role={'dialog'}>
            {onClose && <CloseButton variant={'ghost'} onClick={() => onClose()}>
                <RiCloseLine />
            </CloseButton>}
            {title && <Typography as={'h1'}>{title}</Typography>}
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
  max-height: 85vh;
`;

const Container = styled(Card)`
  position: fixed;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.surface.active};
  min-width: 320px;
  padding: 12px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  font-size: 12px;
`;
