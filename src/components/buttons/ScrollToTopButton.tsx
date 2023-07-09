import { RiArrowUpSLine } from 'react-icons/ri';
import { Button } from '@/ds/inputs';
import styled from 'styled-components';
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

    return <ScrollToTop data-state={state} ref={ref} onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }}>
        <RiArrowUpSLine />
    </ScrollToTop>;
};

const ScrollToTop = styled(Button)`
  backdrop-filter: blur(4px);
  transform: scale(0);
  transition: transform 0.125s ease-in-out;

  &[data-state="opened"] {
    transform: scale(1);
  }

  &[data-state="closing"] {
    transform: scale(0);
  }

  &[data-state="closed"] {
    display: none;
  }
`;
