import { ComponentType, createContext, MouseEvent, PropsWithChildren, useMemo, useState } from 'react';
import styled from 'styled-components';

export type ModalComponent<T = any> = {
    Component: ComponentType<T>;
    props: T;
}

export const ModalsDispatchContext = createContext({
    open: <T, >(modal: ModalComponent<T>) => {
    },
    close: <T, >(modal: Pick<ModalComponent<T>, 'Component'>) => {
    },
});
export const ModalsStateContext = createContext<ModalComponent[]>([]);

export const ModalsProvider = ({ children }: PropsWithChildren) => {
    const [openedModals, setOpenedModals] = useState<ModalComponent[]>([]);

    const open = <T, >(modal: ModalComponent<T>) => {
        setOpenedModals(modals => [...modals, modal]);
    };

    const close = <T, >(modal: Pick<ModalComponent<T>, 'Component'>) => {
        setOpenedModals(modals => modals.filter(m => m.Component !== modal.Component));
    };

    const onMouseUp = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close(openedModals.slice(-1)[0]);
        }
    };

    const dispatch = useMemo(() => ({ open, close }), []);

    return (
        <ModalsStateContext.Provider value={openedModals}>
            <ModalsDispatchContext.Provider value={dispatch}>
                {children}
                <ModalsRoot $open={openedModals.length > 0}
                    onMouseUp={onMouseUp}>
                    {openedModals.map(({ Component, props }, index) => (
                        <Component key={index} {...props} />
                    ))}
                </ModalsRoot>
            </ModalsDispatchContext.Provider>
        </ModalsStateContext.Provider>
    );
};

const ModalsRoot = styled.div<TransientProps<{ open: boolean }>>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 100%;
  height: 100%;
  transition: background-color 0.2s ease-in-out, backdrop-filter 0.2s linear;
  pointer-events: ${({ $open }) => $open ? 'auto' : 'none'};
  background-color: ${({ $open, theme }) => $open ? theme.tooltip.background : 'transparent'};
  backdrop-filter: ${({ $open }) => $open ? 'blur(4px)' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
