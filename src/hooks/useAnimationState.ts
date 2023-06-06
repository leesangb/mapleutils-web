import { useCallback, useState } from 'react';

type AnimationState = 'opening' | 'opened' | 'closing' | 'closed';

const useAnimationState = (closeDelay: number, openDelay = 0) => {
    const [state, setState] = useState<AnimationState>('closed');

    const open = useCallback(() => {
        setState(state => {
            if (state === 'opening' || state === 'opened') return state;
            setTimeout(() => {
                setState('opened');
            }, openDelay);
            return 'opening';
        });
    }, [openDelay]);

    const close = useCallback(() => {
        setState(state => {
            if (state === 'closed' || state === 'closing') return state;
            setTimeout(() => {
                setState('closed');
            }, closeDelay);
            return 'closing';
        });
    }, [closeDelay]);

    return {
        state,
        open,
        close,
    };
};

export default useAnimationState;
