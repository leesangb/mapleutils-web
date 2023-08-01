'use client';

import { useFarmInfoStore } from '@/store/useFarmInfoStore';
import { mobsByEffect } from '@/data/farm/mobsByEffect';
import { Button } from '@/ds/inputs';
import { Typography } from '@/ds/displays';
import MobCard from '../components/MobCard';
import styled from 'styled-components';

export const MobsByEffect = () => {
    const { selected, setSelected } = useFarmInfoStore();
    const information = mobsByEffect.find(m => m.name === selected)!;

    return (
        <>
            <ButtonGroup>
                {mobsByEffect.map((effect) =>
                    <Button key={effect.name}
                        onClick={() => setSelected(effect.name)}
                        active={effect.name === selected}>
                        {effect.name}
                    </Button>,
                )}
            </ButtonGroup>
            <hr />
            <Typography as={'h1'}>
                {information.name}
            </Typography>
            <Typography as={'h2'}>
                스페셜 몬스터
            </Typography>
            <Grid>
                {information.mobs.map((m) => (
                    <MobCard mob={m} key={m.name} />
                ))}
            </Grid>

            {information.normals.length > 0 && (
                <>
                    <hr />
                    <Typography as={'h2'}>
                        일반 몬스터
                    </Typography>
                    <Grid>
                        {information.normals.map((m) => (
                            <MobCard mob={m} key={m.name} />
                        ))}
                    </Grid>
                </>
            )}
        </>
    );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;
