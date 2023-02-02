import { useEffect, useRef, useState } from 'react';
import { Box, Chip, styled, Typography } from '@mui/material';
import cv from '@techstark/opencv-js';
import {
    AutoAwesomeRounded,
    FiberManualRecordRounded,
    PictureInPictureRounded,
    StopRounded,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import CaptureViewer from '@components/video-capture/CaptureViewer';
import { loadImage } from '@tools/imageHelper';

const CANVAS_WIDTH = 243;
const CANVAS_HEIGHT = 92;

const openCVMatchTemplate = async (canvas: HTMLCanvasElement, image: string): Promise<Record<'x1' | 'x2' | 'y1' | 'y2', number>> => {
    const src = cv.imread(canvas);
    const template = cv.imread(await loadImage(image));
    const dst = new cv.Mat();
    const mask = new cv.Mat();
    cv.matchTemplate(src, template, dst, cv.TM_CCOEFF_NORMED, mask);
    const result = cv.minMaxLoc(dst, mask);
    // @ts-ignore
    const point: { x: number, y: number } = result.maxLoc;
    // @ts-ignore
    const matchPercent: number = result.maxVal;

    if (matchPercent <= 0.8) {
        alert('미니맵에 시드아이콘 찾기 실패');
    }
    const coordinates = matchPercent > 0.8
        ? {
            x1: point.x,
            x2: point.x + template.cols,
            y1: point.y,
            y2: point.y + template.rows,
        } : defaultCoordinates;

    src.delete();
    template.delete();
    dst.delete();
    mask.delete();
    return coordinates;
}

const defaultCoordinates = {
    x1: 0,
    x2: 32,
    y1: 0,
    y2: 32,
}


const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [fps, setFps] = useState<number>(0);

    const stopStream = () => {
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
    }

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
    }
}

const CaptureHelp2 = () => {
    const {t} = useTranslation('seed48');
    return (
        <section>
            <Typography align='center' variant={'h5'} component={'h2'} gutterBottom>
                {t('helpNew.title')}
            </Typography>
            <ol>
                <li>
                    {t('helpNew.1')}
                </li>
                <li>
                    {t('helpNew.2')}
                </li>
                <li>
                    {t('helpNew.3')}
                </li>
                <li>
                    {t('helpNew.4')}
                </li>
            </ol>
        </section>
    )
}

const DEFAULT_X = 2;
const DEFAULT_Y = 25;
const DEFAULT_RATIO = 100;
const useVideoCapture2Settings = () => {
    const [x, setX] = useState<number>(DEFAULT_X);
    const [y, setY] = useState<number>(DEFAULT_Y);
    const [ratio, setRatio] = useState<number>(DEFAULT_RATIO);
    const [showJump, setShowJump] = useState<boolean>(true);

    const reset = () => {
        setX(DEFAULT_X);
        setY(DEFAULT_Y);
        setRatio(DEFAULT_RATIO);
        setShowJump(true);
    }

    const toggleJump = () => setShowJump(jump => !jump);

    return {
        x, setX,
        y, setY,
        ratio, setRatio,
        showJump, toggleJump,
        reset
    }
}

const VideoCapture2 = () => {
    const { t } = useTranslation('seed48');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [matchingCoordinates, setMatchingCoordinates] = useState<Record<'x1' | 'x2' | 'y1' | 'y2', number>>(defaultCoordinates);

    const { stream, fps, captureStream, stopStream } = useMediaStream();
    const settings = useVideoCapture2Settings();

    const matchTemplate = async () => {
        if (!stream || !stream.getVideoTracks().length) {
            return;
        }
        const videoSettings = stream.getVideoTracks()[0].getSettings();

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(videoSettings.width || 0 / 4);
        canvas.height = Math.floor(videoSettings.height || 0 / 4);

        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        const context = canvas.getContext('2d')!;
        context.drawImage(video, settings.x, settings.y, (canvas.width * settings.ratio) / 100,  (canvas.height * settings.ratio) / 100,  0, 0, canvas.width, canvas.height);
        video.srcObject = null;

        const coordinates = await openCVMatchTemplate(canvas, '/images/seed/48/icon.png');
        setMatchingCoordinates(coordinates);
    };

    useEffect(() => {
        if (stream) {
            void matchTemplate();
        } else {
            setMatchingCoordinates(defaultCoordinates);
            if (document.pictureInPictureElement) {
                void document.exitPictureInPicture();
            }
            canvasRef.current?.getContext('2d')?.fillRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
        }
    }, [stream])

    useEffect(() => {
        if (!stream) {
            return;
        }

        const video = document.createElement('video');
        video.autoplay = true;
        video.srcObject = stream;
        let intervalId: number;
        (async () => {
            const platform = await loadImage('/images/seed/48/platform.png');
            const jump = await loadImage('/images/seed/48/jump.png');
            videoRef.current!.srcObject = canvasRef.current!.captureStream();
            const drawInCanvas = () => {
                const context = canvasRef.current!.getContext('2d')!;
                context.imageSmoothingEnabled = false;
                const { x1, y2 } = matchingCoordinates;
                context.drawImage(video, settings.x + x1 - 3, settings.y + y2 + 7, CANVAS_WIDTH * settings.ratio / 100, CANVAS_HEIGHT * settings.ratio / 100, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                context.drawImage(platform,0, 0);
                context.drawImage(jump,0, 0);
            };
            drawInCanvas();
            // @ts-ignore
            intervalId = setInterval(drawInCanvas, 1000 / fps);
        })();
        return () => {
            video.srcObject = null;
            setTimeout(() => {
                clearInterval(intervalId);
            }, 1000);
        };
    }, [stream, matchingCoordinates, settings]);
    return (
        <>
            <CaptureHelp2 />
            <section>
                {
                    stream
                        ? (
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} marginBottom={1}>
                                <Chip icon={<StopRounded />}
                                      onClick={stopStream}
                                      label={t('capture.stop')}
                                      sx={{ marginRight: 1 }} />
                                <Chip icon={<PictureInPictureRounded />}
                                      label={t('capture.pip')}
                                      onClick={() => videoRef.current!.requestPictureInPicture()}
                                      sx={{ marginRight: 1 }} />
                                <Chip icon={<AutoAwesomeRounded/>}
                                      onClick={matchTemplate}
                                      label={t('capture.autoFix')}/>
                            </Box>
                        ) : <Chip icon={<FiberManualRecordRounded />} onClick={captureStream} label={t('capture.start')}/>
                }
            </section>

            <section>
                <Canvas style={{display: stream ? 'block' : 'none'}} ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
                <Video ref={videoRef} autoPlay/>
                {stream && <CaptureViewer x={settings.x}
                                          y={settings.y}
                                          ratio={settings.ratio}
                                          onChangeX={settings.setX}
                                          onChangeY={settings.setY}
                                          onChangeRatio={settings.setRatio}
                                          onReset={settings.reset}/>}
            </section>
        </>
    )
}


const Canvas = styled('canvas')`
    width: 100%;
    height: auto;
    image-rendering: pixelated;
`;

const Video = styled('video')`
    display: none;
`

export default VideoCapture2;
