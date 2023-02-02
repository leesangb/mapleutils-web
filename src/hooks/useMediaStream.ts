import { useState } from 'react';
import { getMaxFrameRate } from '@tools/videoHelper';

const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [fps, setFps] = useState<number>(0);

    const stopStream = () => {
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
    };

    const captureStream = async () => {
        const fps = Math.max(await getMaxFrameRate(), 60);
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                frameRate: fps,
                aspectRatio: 1,
            },
            audio: false,
        });
        stream.addEventListener('inactive', stopStream);
        setStream(stream);
        setFps(fps);
    };

    return {
        stream,
        captureStream,
        stopStream,
        fps,
    };
};

export default useMediaStream;
