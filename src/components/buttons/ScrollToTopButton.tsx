import { RiArrowUpSLine } from 'react-icons/ri';
import { Button } from '@/ds/inputs';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import useAnimationState from '@/hooks/useAnimationState';

const useIsOnTop = () => useSyncExternalStore((onChange) => {
    window.addEventListener('scroll', onChange);
    return () => window.removeEventListener('scroll', onChange);
}, () => window.scrollY < 100);

export const ScrollToTopButton = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const isOnTop = useIsOnTop();

    const { state, open, close } = useAnimationState(125);

    useEffect(() => {
        isOnTop ? close() : open();
    }, [isOnTop]);

    return (
        <Button size={'large'} data-state={state} ref={ref} onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
            <RiArrowUpSLine />
        </Button>
    );
};
