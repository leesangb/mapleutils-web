import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';
import { OptionName } from '@/data/farm';

type FarmInfoState = StoreProps<{
    selected: OptionName;
}>

const usePersistedFarmInfoStore = create<FarmInfoState>()(
    persist(
        (set) => ({
            selected: '전체',
            setSelected: (selected) => set({ selected }),
        }),
        {
            name: 'FARM_INFO',
        },
    ),
);

const emptyState: FarmInfoState = {
    selected: '전체',
    setSelected: () => {
    },
};

// @ts-ignore
export const useFarmInfoStore: typeof usePersistedFarmInfoStore = (selector, equals) => {
    const store = usePersistedFarmInfoStore(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
