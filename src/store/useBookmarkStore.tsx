import create from 'zustand';

interface BookmarkState {
    bookmarks: Set<string>;
    toggleBookmark: (name: string) => void;
    isBookmarked: (name: string) => boolean;
}

const useBookmarkStore = create<BookmarkState>((set, get) => ({
        bookmarks: new Set(),
        toggleBookmark: (name: string) => set(state => {
            const bookmarks = new Set(state.bookmarks);
            if (bookmarks.has(name)) {
                bookmarks.delete(name);
            } else {
                bookmarks.add(name);
            }
            return ({
                bookmarks,
            });
        }),
        isBookmarked: (name: string) => Boolean(get().bookmarks.has(name)),
    }))
;

export default useBookmarkStore;