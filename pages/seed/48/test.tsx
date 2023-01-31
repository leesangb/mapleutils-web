import { Card, CardContent, styled } from '@mui/material';
import OpenCV from '../../../src/opencv/OpenCV';
import { useEffect, useRef, useState } from 'react';
import { getMaxFrameRate } from '@tools/videoHelper';

const CANVAS_WIDTH = 260;
const CANVAS_HEIGHT = 156;


const TestPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [frameRate, setFrameRate] = useState<number>(0);

    const captureStream = async () => {
        const frameRate = await getMaxFrameRate();
        setStream(await navigator.mediaDevices.getDisplayMedia({
            video: {
                frameRate,
                aspectRatio: 1,
            },
            audio: false,
        }));
        setFrameRate(frameRate);
    };

    const matchTemplate = async () => {
        await OpenCV.dispatch({ message: 'matchTemplate', payload: 'test' });
    };

    useEffect(() => {
        if (!stream || !canvasRef.current) {
            return;
        }
        stream.addEventListener('inactive', () => setStream(null));
        const video = document.createElement('video');
        video.autoplay = true;
        video.srcObject = stream;
        let requestId: number;
        const drawInCanvas = () => {
            const context = canvasRef.current!.getContext('2d')!;
            context.drawImage(video, 0, 0);
            requestId = window.requestAnimationFrame(drawInCanvas);
        };
        drawInCanvas();
        return () => {
            video.remove();
            window.cancelAnimationFrame(requestId);
        };
    }, [stream, frameRate]);

    return (
        <Card variant={'outlined'}>
            <CardContent>
                {frameRate}
                <button disabled={Boolean(stream)} onClick={captureStream}>캡쳐</button>
                <button onClick={matchTemplate}>
                    ㄱㄱ
                </button>
                <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            </CardContent>
        </Card>
    );
};

const Canvas = styled('canvas')`
  max-width: 100%;
`;

export default TestPage;
