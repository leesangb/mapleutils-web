'use client';

import { useTranslation } from '@/i18n/client';
import { Fragment, useState } from 'react';
import { useSeed36Store } from '@/store/useSeed36Store';
import { seed36Data } from '@/data/seed/36';
import { Button } from '@/ds/inputs';
import styled, { css } from 'styled-components';
import { RiArrowDownLine, RiArrowRightLine, RiRestartLine } from 'react-icons/ri';
import { Card } from '@/ds/surfaces';
import { rotateGrowOut } from '@/ds/css';

type Step = 0 | 1 | 2 | 3 | undefined;
type Steps = [Step, Step, Step, Step, Step, Step, Step, Step]
type Direction = 'vertical' | 'horizontal';

const buildDefaultSteps = (): Steps => [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

const Seed36Page = () => {
    const { t } = useTranslation({ ns: 'seed36' });
    const [steps, setSteps] = useState<Steps>(buildDefaultSteps);

    const resetSteps = () => setSteps(buildDefaultSteps());
    const onChangeStep = (step: Step, index: number) => {
        setSteps(steps => steps.map((s, i) => i === index ? step : s) as Steps);
    };

    const { setAlignment, alignment } = useSeed36Store();

    return (
        <Card>
            <ButtonsContainer>
                <IconButton active={alignment === 'vertical'} onClick={() => setAlignment('vertical')}>
                    <RiArrowDownLine />
                    {t('vertical')}
                </IconButton>
                <IconButton active={alignment === 'horizontal'} onClick={() => setAlignment('horizontal')}>
                    <RiArrowRightLine />
                    {t('horizontal')}
                </IconButton>
                <IconButton styles={[{ marginLeft: 'auto' }, rotateGrowOut]} onClick={() => resetSteps()}>
                    <RiRestartLine />
                    {t('reset')}
                </IconButton>
            </ButtonsContainer>

            <Table $direction={alignment}>
                <Thead>
                    <Tr>
                        {steps.map((step, i) => (
                            <Fragment key={i}>
                                <Th>
                                    {t('step', { ns: 'seed36', step: i + 1 })}
                                </Th>
                                {i === 3 && <Th />}
                            </Fragment>),
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {seed36Data.map((mob, choice) =>
                        <Tr key={mob.name}>
                            {steps.map((step, i) => (
                                <Fragment key={i}>
                                    <Td>
                                        <MobButton onClick={() => onChangeStep(choice as Step, i)}
                                            active={steps[i] === choice}>
                                            <Image src={mob.icon} />
                                        </MobButton>
                                    </Td>
                                    {i === 3 && <Td />}
                                </Fragment>),
                            )}
                        </Tr>,
                    )}
                </Tbody>
            </Table>
        </Card>
    );
};

const directionStyles = {
    vertical: css`
      flex-direction: row;


      & > tbody {
        flex-direction: row;
      }


      & > thead > tr > th:not(:nth-child(5)) {
        height: 100%;
      }

      & > tbody > tr > td {
        width: 100%;
      }

      & > tbody > tr,
      & > thead > tr {
        flex-direction: column;
      }
    `,
    horizontal: css`
      flex-direction: column;

      & > thead > tr > th:not(:nth-child(5)),
      & > tbody > tr > td:not(:nth-child(5)) {
        width: 100%;
      }

      & > tbody {
        flex-direction: column;
      }

      & > tbody > tr,
      & > thead > tr {
        flex-direction: row;
      }
    `,
};

const Table = styled.table<TransientProps<{ direction: Direction }>>`
  display: flex;
  gap: 8px;
  ${({ $direction }) => directionStyles[$direction]})}
`;

const Thead = styled.thead`
  display: flex;
`;

const Tbody = styled.tbody`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const Tr = styled.tr`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

const Th = styled.th`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`;

const Td = styled.td`
`;

const Image = styled.img`
  max-width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const IconButton = styled(Button)`
  gap: 8px;
`;

const MobButton = styled(Button).attrs({ variant: 'ghost' })`
  height: 80px;
  width: 100%;
  justify-content: center;
  background-color: ${({ active, theme }) => active ? theme.primary.hover : theme.background};

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primary.hover : theme.surface.active};
  }
`;

export default Seed36Page;
