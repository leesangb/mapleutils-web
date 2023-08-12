import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';
import { MobEffectGroup } from '@/data/farm/mobs';

type FarmInfoState = StoreProps<{
    selected: MobEffectGroup;
}>

const usePersistedFarmInfoStore = create<FarmInfoState>()(
    persist(
        (set) => ({
            selected: 'all',
            setSelected: (selected) => set({ selected }),
        }),
        {
            name: 'FARM_INFO',
            version: 1,
        },
    ),
);

const emptyState: FarmInfoState = {
    selected: 'all',
    setSelected: () => {
    },
};

// @ts-ignore
export const useFarmInfoStore: typeof usePersistedFarmInfoStore = (selector, equals) => {
    const store = usePersistedFarmInfoStore(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
