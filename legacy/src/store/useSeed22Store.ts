import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocalStorageKey } from '../tools/localStorageHelper';
import { useIsMounted } from '../hooks/useIsMounted';

interface Seed22State {
    route: 'none' | 'beginner' | 'expert';
    setRoute: (route: Seed22State['route']) => void;
}

const usePersistedSeed22Store = create<Seed22State>()(
    persist(
        (set, get) => ({
            route: 'none',
            setRoute: (route) => set({ route }),
        }),
        {
            name: LocalStorageKey.SEED_22,
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
