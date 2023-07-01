'use client';

import { Tooltip } from '@/ds/displays';
import { Button, Slider as _Slider } from '@/ds/inputs';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';
import styled from 'styled-components';
import { useTranslation } from '@/i18n/client';

interface VolumeSliderProps {
    value: number;
    onChange?: (volume: number) => void;
}

export const VolumeSlider = ({ value, onChange }: VolumeSliderProps) => {
    const { t } = useTranslation();
    return (
        <Volume>
            <Tooltip title={t('minVolume')} size={'small'} placement={'top'}>
                <Button variant={'ghost'} onClick={() => onChange?.(0)}>
                    <RiVolumeDownFill />
                </Button>
            </Tooltip>
            <Slider value={value}
                onChange={e => onChange?.(e.target.valueAsNumber)} />
            <Tooltip title={t('maxVolume')} size={'small'} placement={'top'}>
                <Button variant={'ghost'} onClick={() => onChange?.(100)}>
                    <RiVolumeUpFill />
                </Button>
            </Tooltip>
        </Volume>
    );
};

const Volume = styled.div`
  width: 100%;
  grid-area: volume;
  gap: 8px;
  display: flex;
  justify-items: center;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Slider = styled(_Slider).attrs({ min: 0, max: 100 })`
  width: 100%;
`;
