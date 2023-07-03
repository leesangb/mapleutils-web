import { createContext, PropsWithChildren, useState } from 'react';

type WindowPopupState = {
    openPopup: (url: string) => void;
}

export const WindowPopupContext = createContext<WindowPopupState>({
    openPopup: () => {
    },
});

export const WindowPopupProvider = ({ children }: PropsWithChildren) => {
    const [popup, setPopup] = useState<Window | null>(null);

    const open = (url: string) => {
        if (popup && !popup.closed) {
            popup.location.replace(url);
            popup.focus();
            return;
        }
        popup?.close();
        const newPopup = window.open(url, '_blank', 'popup=true, width=500, height=800, top=100, left=100');
        if (newPopup) {
            newPopup?.addEventListener('beforeunload', () => {
                setPopup(null);
            });
            setPopup(newPopup);
        }
    };

    return (
        <WindowPopupContext.Provider value={{ openPopup: open }}>
            {children}
        </WindowPopupContext.Provider>
    );
};
