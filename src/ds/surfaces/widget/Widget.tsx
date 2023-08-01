import { useIsMounted } from '@/hooks/useIsMounted';
import { createPortal } from 'react-dom';
import { PropsWithChildren } from 'react';

export const Widget = ({ children }: PropsWithChildren) => {
    const isMounted = useIsMounted();
    if (!isMounted) return null;

    return createPortal(
        children, document.getElementById('widgets') as HTMLElement,
    );
};
