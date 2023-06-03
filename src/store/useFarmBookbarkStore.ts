import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type FarmBookmarkState = {
    bookmark: string[];
    toggleBookmark: (bookmark: string) => void;
    isBookmarked: (bookmark: string) => boolean;
}

const usePersistedFarmBookmarkStore = create<FarmBookmarkState>()(
    persist(
        (set, get) => ({
            bookmark: [],
            toggleBookmark: (bookmark) => set({ bookmark: get().bookmark.includes(bookmark) ? get().bookmark.filter(f => f !== bookmark) : [...get().bookmark, bookmark] }),
            isBookmarked: (bookmark) => get().bookmark.includes(bookmark),
        }),
        {
            name: 'FARM_BOOKMARK',
        },
    ),
);

const emptyState: FarmBookmarkState = {
    bookmark: [],
    toggleBookmark: () => {
    },
    isBookmarked: () => false,
};

// @ts-ignore
export const useFarmBookmarkStore: typeof usePersistedFarmBookmarkStore = (selector, equals) => {
    const store = usePersistedFarmBookmarkStore(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};
