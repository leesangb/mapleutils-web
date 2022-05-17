import { Chip, Grid } from '@mui/material';
import {
    CheckBoxOutlineBlankOutlined,
    CheckBoxRounded,
    FiberManualRecordRounded,
    PictureInPictureRounded,
    StopRounded,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface CaptureButtonsProps {
    isCapturing: boolean;
    showJump: boolean;
    onClickCapture: () => void;
    onClickPiP: () => void;
    onToggleShowJump: () => void;
}

const CaptureButtons = (props: CaptureButtonsProps) => {
    const { t } = useTranslation('seed48');
    const { isCapturing, showJump, onClickCapture, onClickPiP, onToggleShowJump } = props;
    return (
        <Grid container spacing={1}>
            <Grid item>
                <Chip
                    icon={isCapturing ? <StopRounded /> : <FiberManualRecordRounded />}
                    onClick={onClickCapture}
                    label={isCapturing ? t('capture.stop') : t('capture.start')}
                />
            </Grid>
            {isCapturing && (
                <>
                    <Grid item>
                        <Chip
                            icon={<PictureInPictureRounded />}
                            onClick={onClickPiP}
                            label={t('capture.pip')}
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
                            label={t('capture.showJump')}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default CaptureButtons;