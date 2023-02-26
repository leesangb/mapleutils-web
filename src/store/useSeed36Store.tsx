import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@hooks/useIsMounted';
import { LocalStorageKey } from '@tools/localStorageHelper';


interface Seed36State {
    alignment: 'vertical' | 'horizontal';
    setAlignment: (alignment: Seed36State['alignment']) => void;
}

const usePersistedSeed36Store = create<Seed36State>()(
    persist(
        (set, get) => ({
            alignment: 'vertical',
            setAlignment: (alignment) => set(state => {
                return {
                    ...state,
                    alignment,
                };
            }),
        }),
        {
            name: LocalStorageKey.SEED_36,
            partialize: state => ({
                alignment: state.alignment,
            }),
        },
    ),
);

const emptyState: Seed36State = {
    alignment: 'vertical',
    setAlignment: () => {
    },
};

// @ts-ignore
export const useSeed36Store: typeof usePersistedSeed36Store = (selector, equals) => {
    const store = usePersistedSeed36Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector ? selector(emptyState) : emptyState;
};
