'use client';

import { Modal } from '@/ds/surfaces';
import { MonsterLifeMob } from '@/data/farm/mobs';
import {
    Controls,
    Edge,
    Handle,
    MarkerType,
    Node,
    Position,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    useStoreApi,
    XYPosition,
} from 'reactflow';
import { useEffect, useMemo, useState } from 'react';
import { familyMapping, FamilyNode } from '@/data/farm/treeBuilder';
import styled from 'styled-components';
import { Button } from '@/ds/inputs';
import MobCard from './MobCard';

interface MobModalProps {
    mob: MonsterLifeMob;
    onClose: () => void;
}

const buildReactFlow = (mob: MonsterLifeMob): { nodes: Node[], edges: Edge[], name: string }[] => {
    const families = familyMapping[mob.name];
    const WIDTH = 240;
    const HGAP = 24;
    const VGAP = 250;

    const createNode = (from: MonsterLifeMob['name'], mob: MonsterLifeMob, position: XYPosition, type: 'input' | 'output' | 'default'): Node => ({
        id: mob.name,
        position,
        data: { mob, type, from, showTree: familyMapping[mob.name].length > 1 },
        type: 'mobCard',
    });

    const createEdge = (source: string, target: string, label?: string): Edge => ({
        id: `${source}-${target}`,
        source,
        target,
        label,
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: 'auto-start-reverse',
        },
    });

    const computeNodes = (node: FamilyNode, position: XYPosition, siblingDistance: number): {
        nodes: Node[],
        edges: Edge[]
    } => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        const levelWidth = Math.pow(2, node.height - 1);
        const totalWidth = levelWidth * siblingDistance + (levelWidth - 1) * HGAP;

        const type = position.y === 0
            ? 'input'
            : (node.father || node.mother)
                ? 'default'
                : 'output';
        nodes.push(createNode(mob.name, node.current, position, type));

        if (node.father && node.mother) {
            const isSameParent = node.father.current.name === node.mother.current.name;

            const minHeight = isSameParent
                ? 0
                : Math.min(
                    node.father.mother // min (father, father's mother + 1)
                        ? node.father.mother.height + 1
                        : node.father.height,
                    node.mother.father // min (mother, mother's father + 1)
                        ? node.mother.father.height + 1
                        : node.mother.height) - 1;
            const count = Math.pow(2, node.height - minHeight);

            edges.push(createEdge(node.current.name, node.father.current.name, isSameParent ? 'x 2' : ''));
            const fathers = computeNodes(node.father, {
                x: position.x - totalWidth / count,
                y: position.y + VGAP,
            }, siblingDistance);
            edges.push(...fathers.edges);
            nodes.push(...fathers.nodes);

            if (!isSameParent) {
                edges.push(createEdge(node.current.name, node.mother.current.name));
                const mothers = computeNodes(node.mother, {
                    x: position.x + totalWidth / count,
                    y: position.y + VGAP,
                }, siblingDistance);
                nodes.push(...mothers.nodes);
                edges.push(...mothers.edges);
            }
        }

        return { nodes, edges };
    };

    return families.map((family) => ({
        ...computeNodes(family, { x: 0, y: 0 }, WIDTH),
        name: family.current.name,
    }));
};

type MobNodeProps = {
    data: {
        mob: MonsterLifeMob;
        type: 'input' | 'output' | 'default';
        showTree: boolean;
        from: MonsterLifeMob['name'];
    }
}
const MobNode = ({ data }: MobNodeProps) => {
    const top = data.type === 'output' || data.type === 'default';
    const bottom = data.type === 'input' || data.type === 'default';
    return (
        <>
            {top && <Handle type={'target'} position={Position.Top} />}
            <MobCard mob={data.mob} showTree={data.showTree} active={data.mob.name === data.from} />
            {bottom && <Handle type={'source'} position={Position.Bottom} />}
        </>
    );
};

const Tree = ({ nodes, edges, focusOn }: { nodes: Node[], edges: Edge[], focusOn: Node['id'] }) => {
    const { fitView, getZoom, setCenter } = useReactFlow();
    const store = useStoreApi();

    const focusNode = (key: string) => {
        const zoom = Math.min(getZoom(), 1);
        const { nodeInternals } = store.getState();
        const node = nodeInternals.get(key);
        if (node && node.width && node.height && zoom < 1) {
            const x = node.position.x + node.width / 2;
            const y = node.position.y + node.height / 2;
            const zoom = 1.25;
            setCenter(x, y, { zoom, duration: 200 });
        } else {
            fitView({ duration: 200 });
        }
    };

    return <ReactFlow
        fitView
        onLoad={() => {
            focusNode(focusOn);
        }}
        nodes={nodes}
        edges={edges}
        nodeTypes={{
            mobCard: MobNode,
        }}
        minZoom={0.75}
        maxZoom={1.5}
        zoomOnDoubleClick={false}
        edgesUpdatable={false}
        nodesConnectable={false}
        nodesDraggable={false}>
        <Controls />
    </ReactFlow>;
};

export const MobFamilyTreeModal = ({ onClose, mob }: MobModalProps) => {
    const families = useMemo(() => buildReactFlow(mob), [mob.name]);
    const [tab, setTab] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTab(0);
    }, [families]);

    return <Modal onClose={onClose} onAnimationEnd={() => setVisible(true)}>
        <Modal.Content style={{ position: 'relative', width: '85vw', height: '85vh' }}>
            <Tabs>
                {families.map((family, i) => (
                    <Button key={family.name}
                        size={'large'}
                        active={tab === i}
                        onClick={() => setTab(i)}>
                        <b>{family.name}</b> 조합
                    </Button>
                ))}
            </Tabs>
            {
                visible && tab < families.length && (
                    <ReactFlowProvider>
                        <Tree nodes={families[tab].nodes} edges={families[tab].edges} focusOn={mob.name} />
                    </ReactFlowProvider>
                )
            }
        </Modal.Content>
    </Modal>;
};

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 2;
`;
