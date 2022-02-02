import { Chip, Grid } from '@mui/material';
import {
    CheckBoxOutlineBlankOutlined,
    CheckBoxRounded,
    FiberManualRecordRounded,
    PictureInPictureRounded,
    StopRounded,
} from '@mui/icons-material';

interface CaptureButtonsProps {
    isCapturing: boolean;
    showJump: boolean;
    onClickCapture: () => void;
    onClickPiP: () => void;
    onToggleShowJump: () => void;
}

const CaptureButtons = (props: CaptureButtonsProps) => {
    const { isCapturing, showJump, onClickCapture, onClickPiP, onToggleShowJump } = props;
    return (
        <Grid container spacing={1}>
            <Grid item>
                <Chip
                    icon={isCapturing ? <StopRounded /> : <FiberManualRecordRounded />}
                    onClick={onClickCapture}
                    label={isCapturing ? '캡쳐 중지' : '캡쳐 시작'}
                />
            </Grid>
            {isCapturing && (
                <>
                    <Grid item>
                        <Chip
                            icon={<PictureInPictureRounded />}
                            onClick={onClickPiP}
                            label={'팝업으로 보기 (PIP)'}
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            icon={
                                showJump ? (
                                    <CheckBoxRounded />
                                ) : (
                                    <CheckBoxOutlineBlankOutlined />
                                )
                            }
                            onClick={onToggleShowJump}
                            label={'점프 구간 보기'}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default CaptureButtons;