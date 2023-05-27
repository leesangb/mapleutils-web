import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type Seed24State = StoreProps<{
    tab: 'bgm' | 'hint';
    volume: number;
    autoClip: boolean;
    check: boolean;
}>

const usePersistedSeed24Store = create<Seed24State>()(
    persist(
        (set, get) => ({
            tab: 'bgm',
            setTab: (tab) => set({ tab }),
            volume: 50,
            setVolume: (volume) => set({ volume }),
            autoClip: true,
            setAutoClip: (autoClip) => set({ autoClip }),
            check: false,
            setCheck: (check) => set({ check }),
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
    volume: 50,
    setVolume: () => {
    },
    autoClip: true,
    setAutoClip: () => {
    },
    check: false,
    setCheck: () => {
    },
};

// @ts-ignore
export const useSeed24Store: typeof usePersistedSeed24Store = (selector, equals) => {
    const store = usePersistedSeed24Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
