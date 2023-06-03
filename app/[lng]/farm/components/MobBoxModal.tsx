import { MonsterLifeMob } from '@/data/farm/mobs';
import { getMonsterBox } from '@/data/farm/monsterLifeBox';
import { Card, Modal } from '@/ds/surfaces';
import styled from 'styled-components';
import CostChip from './CostChip';
import { Typography } from '@/ds/displays';

interface MobBoxModalProps {
    mob: MonsterLifeMob;
    onClose: () => void;
}

export const MobBoxModal = ({ mob, onClose }: MobBoxModalProps) => {
    const boxes = getMonsterBox(mob);

    return (
        <Modal title={'어떤 상자에서 나오나요?'} onClose={onClose}>
            <Modal.Content>
                <Ul>
                    {boxes.map((box) => (
                        <Li key={box.name}>
                            <Image src={box.img} alt={box.name} />
                            <Typography as={'h4'}>
                                {box.name}
                            </Typography>
                            <div>
                                {box.price.map((price) => <CostChip key={price} cost={price} />)}
                            </div>
                        </Li>
                    ))}
                </Ul>
            </Modal.Content>
        </Modal>
    );
};

const Ul = styled.ul`
  padding: 0;
  margin: 16px 0;
  list-style: none;
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
`;

const Image = styled.img`
  grid-area: image;
  width: 64px;
  height: auto;
  margin-right: 16px;
`;

const Li = styled(Card).attrs({ as: 'li' })`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  grid-template-areas:
    'image info'
    'image price';
`;
