import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type Seed36State = StoreProps<{
    alignment: 'vertical' | 'horizontal';
}>;

const usePersistedSeed36Store = create<Seed36State>()(
    persist(
        (set) => ({
            alignment: 'vertical',
            setAlignment: (alignment) => set(state => {
                return {
                    ...state,
                    alignment,
                };
            }),
        }),
        {
            name: 'SEED_36',
            partialize: state => ({
                alignment: state.alignment,
            }),
        },
    ),
);

const emptyState: Seed36State = {
    alignment: 'horizontal',
    setAlignment: () => {
    },
};

// @ts-ignore
export const useSeed36Store: typeof usePersistedSeed36Store = (selector, equals) => {
    const store = usePersistedSeed36Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector ? selector(emptyState) : emptyState;
};
