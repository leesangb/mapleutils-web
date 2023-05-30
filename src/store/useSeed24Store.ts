import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

export type TrackOrder = 'default' | 'nameAsc' | 'nameDesc' | 'nameLengthAsc' | 'nameLengthDesc';

type Seed24State = StoreProps<{
    tab: 'bgm' | 'hint';
    autoClip: boolean;
    check: boolean;
    order: TrackOrder;
}>

const usePersistedSeed24Store = create<Seed24State>()(
    persist(
        (set) => ({
            tab: 'bgm',
            setTab: (tab) => set({ tab }),
            autoClip: true,
            setAutoClip: (autoClip) => set({ autoClip }),
            check: false,
            setCheck: (check) => set({ check }),
            order: 'default',
            setOrder: (order) => set({ order }),
        }),
        {
            name: 'SEED_24',
        },
    ),
);

const emptyState: Seed24State = {
    tab: 'bgm',
    setTab: () => {
    },
    autoClip: true,
    setAutoClip: () => {
    },
    check: false,
    setCheck: () => {
    },
    order: 'default',
    setOrder: () => {
    },
};

// @ts-ignore
export const useSeed24Store: typeof usePersistedSeed24Store = (selector, equals) => {
    const store = usePersistedSeed24Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
