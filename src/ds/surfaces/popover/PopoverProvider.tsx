import { createContext, PropsWithChildren, useEffect, useId, useState } from 'react';

type PopoverState = 'opened' | 'closing' | 'closed';

export const PopoverContext = createContext<{
    state: PopoverState;
    id: string;
    fadeMs: number;
    setState: (open: PopoverState) => void;
        }>({
            state: 'closed',
            id: '',
            fadeMs: 0,
            setState: (state: PopoverState) => {
            },
        });

export const PopoverProvider = ({ children, fadeMs }: PropsWithChildren<{ fadeMs: number }>) => {
    const [state, setState] = useState<'opened' | 'closing' | 'closed'>('closed');
    const id = useId();

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (state === 'opened') {
            const clickAway = (e: MouseEvent) => {
                if (!(e.target as HTMLElement).closest(`[data-popover="${id}"]`)) {
                    setState('closing');
                }
            };
            window.addEventListener('click', clickAway);
            return () => {
                window.removeEventListener('click', clickAway);
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        } else if (state === 'closing') {
            timeoutId = setTimeout(() => {
                setState('closed');
            }, fadeMs);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [state, id]);

    return (
        <PopoverContext.Provider value={{ state, setState, id, fadeMs }}>
            {children}
        </PopoverContext.Provider>
    );
};
