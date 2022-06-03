import create from 'zustand';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';

interface BookmarkState {
    bookmarks: Set<string>;
    toggleBookmark: (name: string) => void;
    isBookmarked: (name: string) => boolean;
}

const defaultBookmarks = () => LocalStorageHelper.load<Set<string>>(LocalStorageKey.BOOKMARKS);

const useBookmarkStore = create<BookmarkState>((set, get) => ({
    bookmarks: defaultBookmarks(),
    toggleBookmark: (name: string) => set(state => {
        const bookmarks = new Set(state.bookmarks);
        if (bookmarks.has(name)) {
            bookmarks.delete(name);
        } else {
            bookmarks.add(name);
        }
        LocalStorageHelper.save(LocalStorageKey.BOOKMARKS, [...bookmarks]);
        return ({
            bookmarks,
        });
    }),
    isBookmarked: (name: string) => Boolean(get().bookmarks.has(name)),
}));

export default useBookmarkStore;