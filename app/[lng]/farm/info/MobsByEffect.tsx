'use client';

import { useFarmInfoStore } from '@/store/useFarmInfoStore';

import { Button } from '@/ds/inputs';
import { Typography } from '@/ds/displays';
import MobCard from '../components/MobCard';
import styled from 'styled-components';
import { mobsByEffect } from '@/data/farm/mobs';

export const MobsByEffect = () => {
    const { selected, setSelected } = useFarmInfoStore();
    const information = mobsByEffect[selected] || mobsByEffect.all;

    return (
        <>
            <ButtonGroup>
                {Object.keys(mobsByEffect).map((effect) =>
                    <Button key={effect}
                        onClick={() => setSelected(effect as keyof typeof mobsByEffect)}
                        active={effect === selected}>
                        {effect}
                    </Button>,
                )}
            </ButtonGroup>
            <hr />
            <Typography as={'h1'}>
                {selected}
            </Typography>
            <Typography as={'h2'}>
                스페셜 몬스터
            </Typography>
            <Grid>
                {information.specials.map((m) => (
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
