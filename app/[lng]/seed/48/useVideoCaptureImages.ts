import { useEffect, useState } from 'react';
import { loadImage } from '@/utils/imageHelper';

const useVideoCaptureImages = () => {
    const [platformImage, setPlatformImage] = useState<HTMLImageElement | null>(null);
    const [jumpImage, setJumpImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        (async () => {
            setPlatformImage(await loadImage('/images/seed/48/platform.png'));
            setJumpImage(await loadImage('/images/seed/48/jump.png'));
        })();
    }, []);

    return platformImage && jumpImage ? ({
        platform: platformImage,
        jump: jumpImage,
    }) : null;
};

export default useVideoCaptureImages;
