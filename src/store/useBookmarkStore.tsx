import { create } from 'zustand';
import { LocalStorageHelper, LocalStorageKey } from '@/utils/localStorageHelper';

interface BookmarkState {
    bookmarks: Set<string>;
    toggleBookmark: (name: string) => void;
    isBookmarked: (name: string) => boolean;
}

const defaultBookmarks = (key: LocalStorageKey) => LocalStorageHelper.load<Set<string>>(key);

const BookmarkStore = (key: LocalStorageKey) => create<BookmarkState>((set, get) => ({
    bookmarks: defaultBookmarks(key),
    toggleBookmark: (name: string) => set(state => {
        const bookmarks = new Set(state.bookmarks);
        if (bookmarks.has(name)) {
            bookmarks.delete(name);
        } else {
            bookmarks.add(name);
        }
        LocalStorageHelper.save(key, [...bookmarks]);
        return ({
            bookmarks,
        });
    }),
    isBookmarked: (name: string) => Boolean(get().bookmarks.has(name)),
}));

type BookmarkKeys = LocalStorageKey.BOOKMARKS | LocalStorageKey.SEED_49_BOOKMARKS;

const useBookmarkStore: Record<BookmarkKeys, ReturnType<typeof BookmarkStore>> = {
    [LocalStorageKey.SEED_49_BOOKMARKS]: BookmarkStore(LocalStorageKey.SEED_49_BOOKMARKS),
    [LocalStorageKey.BOOKMARKS]: BookmarkStore(LocalStorageKey.BOOKMARKS),
};

export default useBookmarkStore;
