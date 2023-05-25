import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';
import type { SeedLocation } from '@/data/seed/49';
import { seedLocations } from '@/data/seed/49';

type Seed49State = StoreProps<{
    showOnlyFavorite: boolean;
    locations: Partial<Record<SeedLocation, boolean>>;
}> & {
    toggleLocation: (location: SeedLocation) => void;
    reverseLocations: () => void;
    favorites: string[];
    toggleFavorite: (favorite: string) => void;
};

const usePersistedSeed49Store = create<Seed49State>()(
    persist(
        (set, get) => ({
            showOnlyFavorite: false,
            setShowOnlyFavorite: (showOnlyFavorite) => set({ showOnlyFavorite }),
            favorites: [],
            toggleFavorite: (favorite) => set({ favorites: get().favorites.includes(favorite) ? get().favorites.filter(f => f !== favorite) : [...get().favorites, favorite] }),
            locations: {},
            setLocations: (locations) => set({ locations }),
            toggleLocation: (location) => set({
                locations: {
                    ...get().locations,
                    [location]: !get().locations[location],
                },
            }),
            reverseLocations: () => set({
                locations: {
                    ...seedLocations.reduce((acc, location) => ({
                        ...acc,
                        [location]: !get().locations[location],
                    }), {}),
                },
            }),
        }),
        {
            name: 'SEED_49',
            partialize: state => ({
                showOnlyFavorite: state.showOnlyFavorite,
                favorites: state.favorites,
                locations: state.locations,
            }),
        },
    ),
);

const emptyState: Seed49State = {
    showOnlyFavorite: false,
    setShowOnlyFavorite: () => {
    },
    favorites: [],
    toggleFavorite: () => {
    },
    locations: {},
    setLocations: () => {
    },
    toggleLocation: () => {
    },
    reverseLocations: () => {
    },
};

// @ts-ignore
export const useSeed49Store: typeof usePersistedSeed49Store = (selector, equals) => {
    const store = usePersistedSeed49Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector ? selector(emptyState) : emptyState;
};
