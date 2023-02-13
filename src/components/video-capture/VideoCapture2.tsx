import { useEffect, useRef, useState } from 'react';
import { Badge, Box, Chip, styled, Typography } from '@mui/material';
import {
    AutoAwesomeRounded,
    CheckBoxOutlineBlankOutlined,
    CheckBoxRounded,
    CloseRounded,
    CompareArrowsRounded,
    DoneRounded,
    FiberManualRecordRounded,
    PictureInPictureRounded,
    StopRounded,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import CaptureViewer from '@components/video-capture/CaptureViewer';
import useMediaStream from '@hooks/useMediaStream';
import useNotification from '@hooks/useNotification';
import useVideoCaptureSettings from '@components/video-capture/useVideoCaptureSettings';
import useVideoCaptureImages from '@components/video-capture/useVideoCaptureImages';
import OpenCV from '../../opencv/OpenCV';

const CANVAS_WIDTH = 243;
const CANVAS_HEIGHT = 92;

const MINIMAP_ICON_TOP_LEFT_X_OFFSET = -3;
const MINIMAP_ICON_TOP_LEFT_Y_OFFSET = 7;


const defaultCoordinates = {
    x1: 0,
    x2: 32,
    y1: 0,
    y2: 32,
}


const CaptureHelp2 = () => {
    const {t} = useTranslation('seed48');
    return (
        <section>
            <Typography align='center' variant={'h5'} component={'h2'} gutterBottom>
                {t('helpNew.title')}
            </Typography>
            <Box component={'ol'} paddingLeft={2}>
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

                    <Box component={'div'} display={'grid'} gridTemplateColumns={'1fr auto 1fr'} alignItems={'center'}>
                        <Box component={'div'}>
                            <Image src={'/images/seed/48/ok.png'} alt={'setting ok'} />
                            <Typography variant={'body2'} justifyContent={'center'} display={'flex'} alignItems={'center'}>
                                <DoneRounded color={'success'}/> {t('helpNew.ok')}
                            </Typography>
                        </Box>
                        <CompareArrowsRounded fontSize={'large'} sx={{margin: 1}}/>
                        <Box component={'div'}>
                            <Image src={'/images/seed/48/ko.png'} alt={'setting ko'} />
                            <Typography variant={'body2'} justifyContent={'center'} display={'flex'} alignItems={'center'}>
                                <CloseRounded color={'error'}/> {t('helpNew.ko')}
                            </Typography>
                        </Box>
                    </Box>
                </li>
            </Box>
        </section>
    )
}

const Image = styled('img')`
  width: 100%;
  height: auto;
    image-rendering: pixelated;
`

const VideoCapture2 = () => {
    const { t } = useTranslation('seed48');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [matchingCoordinates, setMatchingCoordinates] = useState<Record<'x1' | 'x2' | 'y1' | 'y2', number>>(defaultCoordinates);
    const images = useVideoCaptureImages();

    const { stream, fps, captureStream, stopStream } = useMediaStream();
    const settings = useVideoCaptureSettings();
    const { notify, NotificationSnackbar } = useNotification();

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

        const {x1, x2, y1, y2, matchPercent} = await OpenCV.matchTemplate(canvas, '/images/seed/48/icon.png');
        if (matchPercent < 0.8) {
            notify(t('capture.autoFixNotFound'), 'error');
        } else {
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
    }, [stream])

    useEffect(() => {
        if (!stream || !images) {
            return;
        }

        const video = document.createElement('video');
        video.autoplay = true;
        video.srcObject = stream;
        let intervalId: number;

        videoRef.current!.srcObject = canvasRef.current!.captureStream();
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
            context.drawImage(images.platform,0, 0);
            if (settings.showJump) {
                context.drawImage(images.jump,0, 0);
            }
        };
        drawInCanvas();
        // @ts-ignore
        intervalId = setInterval(drawInCanvas, 1000 / fps);
        return () => {
            video.srcObject = null;
            clearInterval(intervalId);
        };
    }, [stream, matchingCoordinates, settings, images]);
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
                                <Chip icon={settings.showJump ? <CheckBoxRounded /> : <CheckBoxOutlineBlankOutlined />}
                                      onClick={settings.toggleJump}
                                      label={t('capture.showJump')}
                                      sx={{ marginRight: 1 }}
                                />
                                <Badge badgeContent={'beta'} color={'primary'}>
                                    <Chip icon={<AutoAwesomeRounded/>}
                                          onClick={matchTemplate}
                                          label={t('capture.autoFix')}/>
                                </Badge>
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
            <NotificationSnackbar />
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
