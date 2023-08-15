import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type FarmDirectionState = StoreProps<{
    direction: 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT';
}>

const usePersistedFarmDirectionStore = create<FarmDirectionState>()(
    persist(
        (set) => ({
            direction: 'LEFT_TO_RIGHT',
            setDirection: (direction) => set({ direction }),
        }),
        {
            name: 'FARM_DIRECTION',
        },
    ),
);

const emptyState: FarmDirectionState = {
    direction: 'LEFT_TO_RIGHT',
    setDirection: () => {
    },
};

// @ts-ignore
export const useFarmDirectionStore: typeof usePersistedFarmDirectionStore = (selector, equals) => {
    const store = usePersistedFarmDirectionStore(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
