import { MonsterLifeRecipe } from '@/data/farm/recipes';
import MobCard from './MobCard';
import { Avatar } from '@/ds/displays';
import styled from 'styled-components';
import { media } from '@/ds';
import { forwardRef } from 'react';

type RecipeRowProps = {
    recipe: Required<MonsterLifeRecipe>;
    direction: 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT';
}

export const RecipeRow = forwardRef<HTMLTableRowElement, RecipeRowProps>(function RecipeRow({ recipe, direction, ...props }, ref) {
    const { mob, parents } = recipe;

    return (
        <Row $direction={direction} ref={ref} {...props}>
            <Left>
                <MobCard mob={parents[0]} />
            </Left>
            <Plus>
                <Avatar name={'+'} />
            </Plus>
            <Right>
                <MobCard mob={parents[1]} />
            </Right>
            <Equal>
                <Avatar name={'='} />
            </Equal>
            <Mob>
                <MobCard mob={mob} />
            </Mob>
        </Row>
    );
});

const Mob = styled.td`
  grid-area: mob;
`;

const Plus = styled.td`
  grid-area: plus;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Equal = styled.td`
  grid-area: equal;
`;

const Left = styled.td`
  grid-area: left;
`;

const Right = styled.td`
  grid-area: right;
`;

const Row = styled.tr<TransientProps<{ direction: 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT' }>>`
  padding: 8px 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  grid-template-areas: ${({ $direction }) => $direction === 'LEFT_TO_RIGHT' ? '"left plus right equal mob"' : '"mob equal left plus right"'};
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.contour};

  & > td {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  ${media.max('md')} {
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: ${({ $direction }) => $direction === 'LEFT_TO_RIGHT'
        ? `"left equal mob"
      "plus equal mob"
      "right equal mob"`
        : `"mob equal left"
        "mob equal plus"
        "mob equal right"`};
    gap: 4px;
    padding: 4px 0;
  }
`;
