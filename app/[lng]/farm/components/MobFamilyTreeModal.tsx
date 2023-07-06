import { Modal } from '@/ds/surfaces';
import { MobTree } from './MobTree';
import { MonsterLifeMob } from '@/data/farm/mobs';
import { monsterLifeFamilyMapping } from '@/data/farm/recipes';
import styled from 'styled-components';
import { Typography } from '@/ds/displays';

interface MobModalProps {
    mob: MonsterLifeMob;
    onClose: () => void;
}

export const MobFamilyTreeModal = ({ onClose, mob }: MobModalProps) => {
    const families = monsterLifeFamilyMapping[mob.name];
    return <Modal onClose={onClose}>
        <Modal.Content>
            {families.map((family) =>
                <Section key={family.child.name}>
                    <Typography as={'h2'}>{family.child.name} 조합</Typography>
                    <Content>
                        <MobTree selected={mob.name} family={family} />
                    </Content>
                </Section>)}
        </Modal.Content>
    </Modal>;
};

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 42px;
`;

const Section = styled.section`
  min-width: max-content;
  overflow-y: scroll;

  &:not(:last-child) {
    margin-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.contour};
  }
`;
