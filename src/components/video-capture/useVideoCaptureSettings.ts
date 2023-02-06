import { useMemo, useState } from 'react';

const DEFAULT_X = 2;
const DEFAULT_Y = 25;
const DEFAULT_RATIO = 100;

const useVideoCaptureSettings = () => {
    const [x, setX] = useState<number>(DEFAULT_X);
    const [y, setY] = useState<number>(DEFAULT_Y);
    const [ratio, setRatio] = useState<number>(DEFAULT_RATIO);
    const [showJump, setShowJump] = useState<boolean>(true);

    const reset = () => {
        setX(DEFAULT_X);
        setY(DEFAULT_Y);
        setRatio(DEFAULT_RATIO);
        setShowJump(true);
    };

    const toggleJump = () => setShowJump(jump => !jump);

    return useMemo(() => ({
        x, setX,
        y, setY,
        ratio, setRatio,
        showJump, toggleJump,
        reset,
    }), [x, y, ratio, showJump]);
};

export default useVideoCaptureSettings;
