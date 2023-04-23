import { useEffect, useMemo, useState } from 'react';
import { loadImage } from '../../tools/imageHelper';

const useVideoCaptureImages = () => {
    const [platformImage, setPlatformImage] = useState<HTMLImageElement | null>(null);
    const [jumpImage, setJumpImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        (async () => {
            setPlatformImage(await loadImage('/images/seed/48/platform.png'));
            setJumpImage(await loadImage('/images/seed/48/jump.png'));
        })();
    }, []);

    return useMemo(() => platformImage && jumpImage ? ({
        platform: platformImage,
        jump: jumpImage,
    }) : null, [platformImage, jumpImage]);
};

export default useVideoCaptureImages;
