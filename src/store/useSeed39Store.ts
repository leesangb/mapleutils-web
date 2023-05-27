import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

interface Seed39State {
    /**
     * question, answer1, answer2, answer3, answer4
     */
    filter: [boolean, boolean, boolean, boolean, boolean];
    setFilter: (value: boolean, ...indexes: (0 | 1 | 2 | 3 | 4)[]) => void;
}

const usePersistedSeed39Store = create<Seed39State>()(
    persist(
        (set, get) => ({
            filter: [true, true, true, true, true],
            setFilter: (value: boolean, ...indexes: (0 | 1 | 2 | 3 | 4)[]) => set(state => {
                const filter = state.filter;
                indexes.forEach(index => filter[index] = value);
                return {
                    ...state,
                    filter,
                };
            }),
        }),
        {
            name: 'SEED_39',
            partialize: state => ({
                filter: state.filter,
            }),
        },
    ),
);

const emptyState: Seed39State = {
    filter: [true, true, true, true, true],
    setFilter: () => {
    },
};

// @ts-ignore
export const useSeed39Store: typeof usePersistedSeed39Store = (selector, equals) => {
    const store = usePersistedSeed39Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
