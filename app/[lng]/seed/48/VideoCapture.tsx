'use client';

import { useEffect, useRef, useState } from 'react';
import useVideoCaptureImages from './useVideoCaptureImages';
import useMediaStream from './useMediaStream';
import OpenCV from './OpenCV';
import { useSeed48Store } from '@/store/useSeed48Store';
import styled from 'styled-components';
import { Button, Input, Slider } from '@/ds/inputs';
import { useTranslation } from '@/i18n/client';
import {
    RiCameraFill,
    RiCameraOffFill,
    RiCheckboxBlankLine,
    RiCheckboxFill,
    RiMagicFill,
    RiPictureInPictureFill,
    RiRestartLine,
} from 'react-icons/ri';
import { Fieldset, Typography } from '@/ds/displays';
import { rotateGrowOutRight } from '@/ds/css';
import { toast } from 'react-toastify';

const defaultCoordinates = {
    x1: 0,
    x2: 32,
    y1: 0,
    y2: 32,
};

const CANVAS_WIDTH = 243;
const CANVAS_HEIGHT = 92;

const MINIMAP_ICON_TOP_LEFT_X_OFFSET = -3;
const MINIMAP_ICON_TOP_LEFT_Y_OFFSET = 7;

const VideoCapture = () => {
    const { t } = useTranslation({ ns: 'seed48' });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [matchingCoordinates, setMatchingCoordinates] = useState<Record<'x1' | 'x2' | 'y1' | 'y2', number>>(defaultCoordinates);
    const { stream, fps, captureStream, stopStream } = useMediaStream();
    const images = useVideoCaptureImages();
    const settings = useSeed48Store();

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
        context.drawImage(video, settings.x, settings.y, (canvas.width * settings.ratio) / 100, (canvas.height * settings.ratio) / 100, 0, 0, canvas.width, canvas.height);
        video.srcObject = null;

        const { x1, x2, y1, y2, matchPercent } = await OpenCV.matchTemplate(canvas, '/images/seed/48/icon.png');
        if (matchPercent < 0.8) {
            toast.error(t('capture.autoFixNotFound'));
        } else {
            toast.success(t('capture.autoFixFound'));
            setMatchingCoordinates({ x1, x2, y1, y2 });
        }
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
    }, [stream]);

    useEffect(() => {
        if (!stream || !images || !videoRef.current || !canvasRef.current) {
            return;
        }

        const video = document.createElement('video');
        video.autoplay = true;
        video.srcObject = stream;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        videoRef.current.srcObject = canvasRef.current.captureStream();
        const drawInCanvas = () => {
            if (!canvasRef.current) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                return;
            }
            const context = canvasRef.current.getContext('2d')!;
            context.imageSmoothingEnabled = false;
            const { x1, y2 } = matchingCoordinates;
            context.drawImage(video,
                settings.x + x1 + MINIMAP_ICON_TOP_LEFT_X_OFFSET,
                settings.y + y2 + MINIMAP_ICON_TOP_LEFT_Y_OFFSET,
                CANVAS_WIDTH * settings.ratio / 100,
                CANVAS_HEIGHT * settings.ratio / 100,
                0,
                0,
                CANVAS_WIDTH,
                CANVAS_HEIGHT);
            context.drawImage(images.platform, 0, 0);
            if (settings.showJump) {
                context.drawImage(images.jump, 0, 0);
            }
        };
        drawInCanvas();
        intervalId = setInterval(drawInCanvas, 1000 / fps);
        return () => {
            video.srcObject = null;
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [stream, matchingCoordinates, settings, images]);

    return (
        <>
            <Toolbar>
                {
                    stream ? (
                        <>
                            <Button onClick={stopStream}>
                                <RiCameraOffFill />
                                {t('capture.stop')}
                            </Button>
                            <Button onClick={() => videoRef.current?.requestPictureInPicture()}>
                                <RiPictureInPictureFill />
                                {t('capture.pip')}
                            </Button>
                            <Button onClick={settings.toggleJump}>
                                {settings.showJump ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
                                {t('capture.showJump')}
                            </Button>
                            <Button onClick={matchTemplate}>
                                <RiMagicFill />
                                {t('capture.autoFix')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={captureStream}>
                                <RiCameraFill />
                                {t('capture.start')}
                            </Button>
                        </>
                    )
                }
            </Toolbar>
            <Canvas style={{ display: stream ? 'block' : 'none' }} ref={canvasRef} width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT} />
            <Video ref={videoRef} autoPlay />
            {stream && (
                <Settings title={t('advanced.title')} align={'center'} legendAlign={'center'}>
                    <Label as={'label'}>
                        x
                        <Slider min={0} max={200} value={settings.x}
                            onChange={(e) => settings.setX(Number(e.target.value))} />
                        <Input value={settings.x}
                            onChange={(e) => settings.setX(Number(e.target.value))} />
                    </Label>
                    <Label as={'label'}>
                        y
                        <Slider min={0} max={200} value={settings.y}
                            onChange={(e) => settings.setY(Number(e.target.value))} />
                        <Input value={settings.y}
                            onChange={(e) => settings.setY(Number(e.target.value))} />
                    </Label>
                    <Label as={'label'}>
                        ratio
                        <Slider min={0} max={200} value={settings.ratio}
                            onChange={(e) => settings.setRatio(Number(e.target.value))} />
                        <Input value={settings.ratio}
                            onChange={(e) => settings.setRatio(Number(e.target.value))} />
                    </Label>

                    <Button styles={rotateGrowOutRight} onClick={() => settings.reset()}>
                        <RiRestartLine />
                        {t('reset')}
                    </Button>
                </Settings>
            )}
        </>
    );
};

const Canvas = styled.canvas`
  width: 100%;
  height: auto;
  image-rendering: pixelated;
`;

const Video = styled.video`
  display: none;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const Label = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 8px;

  & > :last-child {
    width: 64px;

  }
`;

const Settings = styled(Fieldset)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default VideoCapture;
