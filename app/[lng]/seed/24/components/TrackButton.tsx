import { Button } from '@/ds/inputs';
import { RiCheckboxBlankLine, RiCheckboxFill, RiPauseFill, RiPlayFill } from 'react-icons/ri';
import { Tooltip } from '@/ds/displays';
import { TrackInfo } from '@/data/seed/24';
import styled from 'styled-components';
import { useState } from 'react';

interface TrackButtonProps {
    track: TrackInfo;
    onClick: (track: TrackInfo) => void;
    checkbox?: boolean;
    isPlaying?: boolean;
}

export const TrackButton = ({ track, onClick, checkbox, isPlaying }: TrackButtonProps) => {
    const [checked, setChecked] = useState(false);
    return (
        <Tooltip key={track.name} title={track.hint} as={'li'} placement={'top'} size={'medium'}>
            <TrackButtonContainer>
                {checkbox && <Button variant={'ghost'}
                    onClick={() => setChecked(!checked)}>
                    {checked ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
                </Button>}
                <Track onClick={() => onClick(track)} $active={isPlaying}>
                    <Image src={track.coverImg} alt={track.name} />
                    <span>
                        {track.name}
                    </span>
                    {isPlaying
                        ? <RiPauseFill />
                        : <RiPlayFill />}
                </Track>
            </TrackButtonContainer>
        </Tooltip>
    );
};

const Track = styled.button<TransientProps<{ active?: boolean }>>`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px 8px 8px;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  background-color: ${({ theme, $active }) => $active ? theme.primary.background : 'transparent'};

  &:hover {
    background-color: ${({ theme, $active }) => $active ? theme.primary.hover : theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme, $active }) => $active ? theme.primary.active : theme.surface.active};
    transform: scale(0.98);
  }

  & > span {
    flex-grow: 1;
  }
`;

const TrackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Image = styled.img`
  image-rendering: pixelated;
  border-radius: 0;
`;
