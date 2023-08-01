import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type Seed22State = StoreProps<{
    route: 'none' | 'beginner' | 'expert';
}>

const usePersistedSeed22Store = create<Seed22State>()(
    persist(
        (set) => ({
            route: 'none',
            setRoute: (route) => set({ route }),
        }),
        {
            name: 'SEED_22',
        },
    ),
);

const emptyState: Seed22State = {
    route: 'none',
    setRoute: () => {
    },
};

// @ts-ignore
export const useSeed22Store: typeof usePersistedSeed22Store = (selector, equals) => {
    const store = usePersistedSeed22Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
