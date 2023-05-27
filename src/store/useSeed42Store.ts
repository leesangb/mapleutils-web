import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type Seed42State = StoreProps<{
    route: 'none' | 'route1' | 'route2';
    opacity: number;
}>;

const usePersistedSeed42Store = create<Seed42State>()(
    persist(
        (set, get) => ({
            route: 'none',
            setRoute: (route) => set({ route }),
            opacity: 50,
            setOpacity: (opacity) => set({ opacity }),
        }),
        {
            name: 'SEED_42',
        },
    ),
);

const emptyState: Seed42State = {
    route: 'none',
    setRoute: () => {
    },
    opacity: 50,
    setOpacity: () => {
    },
};

// @ts-ignore
export const useSeed42Store: typeof usePersistedSeed42Store = (selector, equals) => {
    const store = usePersistedSeed42Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
