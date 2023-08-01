import { MonsterLifeFamily } from '@/data/farm/recipes';
import styled from 'styled-components';
import { MobMiniCard } from './MobMiniCard';

interface MobTreeProps {
    selected: string;
    family?: MonsterLifeFamily;
}

export const MobTree = ({ selected, family }: MobTreeProps) => {
    if (!family) {
        return null;
    }

    const { child, father, mother } = family;
    return (
        <MobContainer as={'ul'}>
            <Li $leaf={!father && !mother}>
                <MobMiniCard mob={child} active={selected === child.name} />
            </Li>
            {father && (
                <MobContainer>
                    <MobTree selected={selected} family={father} />
                </MobContainer>
            )}
            {mother && (
                <MobContainer>
                    <MobTree selected={selected} family={mother} />
                </MobContainer>
            )}
        </MobContainer>
    );
};

const Li = styled.li<TransientProps<{ leaf: boolean }>>`
  position: relative;
  margin: 12px 2px;
  padding: 0;

  ${({ $leaf, theme }) => !$leaf && `
      &::after {
        content: "";
        position: absolute;
        bottom: calc(0 - 12px);
        right: 50%;
        width: 50%;
        height: 12px;
        left: 50%;
        border-left: 1px solid ${theme.line};
      }
  `}
`;

const MobContainer = styled.li`
  position: relative;
  margin: 0;
  padding: 0;
  float: left;
  text-align: center;
  text-align: -webkit-center;

  list-style-type: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 1px solid ${({ theme }) => theme.line};
    width: 50%;
    height: 12px;
  }

  &::after {
    right: auto;
    left: 50%;
    border-left: 1px solid ${({ theme }) => theme.line};
  }

  &:only-child::after,
  &:only-child::before {
    display: none;
  }

  &:nth-child(2)::before,
  &:last-child::after {
    border: 0 none;
  }

  &:last-child::before {
    border-right: 1px solid ${({ theme }) => theme.line};
  }

  &:last-child::before {
    border-radius: 0 ${({ theme }) => theme.borderRadius} 0 0;
  }

  &:nth-child(2)::after {
    border-radius: ${({ theme }) => theme.borderRadius} 0 0 0;
  }
`;
