import {
    ComponentType,
    createContext,
    MouseEvent,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalComponent<T = any> = {
    Component: ComponentType<T>;
    props: T;
}

export const ModalsDispatchContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open: <T, >(modal: ModalComponent<T>) => {
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    close: <T, >(modal: Pick<ModalComponent<T>, 'Component'>) => {
    },
});
export const ModalsStateContext = createContext<ModalComponent[]>([]);

export const ModalsProvider = ({ children }: PropsWithChildren) => {
    const [openedModals, setOpenedModals] = useState<ModalComponent[]>([]);

    const open = <T, >(modal: ModalComponent<T>) => {
        document.body.style.overflow = 'hidden';
        setOpenedModals(modals => [...modals, modal]);
    };

    const close = <T, >(modal: Pick<ModalComponent<T>, 'Component'>) => {
        document.body.style.removeProperty('overflow');
        setOpenedModals(modals => modals.filter(m => m.Component !== modal.Component));
    };

    const closeLast = useCallback(() => openedModals.length && close(openedModals.slice(-1)[0]), [openedModals]);

    const onMouseUp = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeLast();
        }
    };

    useEffect(() => {
        const closeEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLast();
            }
        };
        window.addEventListener('keyup', closeEsc);
        return () => {
            window.removeEventListener('keyup', closeEsc);
        };
    }, [closeLast]);

    const dispatch = useMemo(() => ({ open, close }), []);

    return (
        <ModalsDispatchContext.Provider value={dispatch}>
            {children}
            <ModalsStateContext.Provider value={openedModals}>
                {openedModals.map(({ Component, props }, index) => (
                    <ModalsRoot key={index} $open
                        onMouseUp={onMouseUp}>
                        <Component {...props} />
                    </ModalsRoot>
                ))}
            </ModalsStateContext.Provider>
        </ModalsDispatchContext.Provider>
    );
};

const ModalsRoot = styled.div<TransientProps<{ open: boolean }>>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 100vw;
  width: 100dvw;
  height: 100%;
  transition: background-color 0.2s ease-in-out;
  pointer-events: ${({ $open }) => $open ? 'auto' : 'none'};
  background-color: ${({ $open, theme }) => $open ? theme.tooltip.background : 'transparent'};
  backdrop-filter: ${({ $open }) => $open ? 'blur(4px)' : 'none'};
  -webkit-backdrop-filter: ${({ $open }) => $open ? 'blur(4px)' : 'none'};
  display: ${({ $open }) => $open ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`;
