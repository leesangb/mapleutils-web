import { IconButton, useTheme } from '@mui/material';
import { StarOutlineRounded, StarRounded } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import useBookmarkStore from '@store/useBookmarkStore';
import { LocalStorageKey } from '@tools/localStorageHelper';

interface FavoriteButtonProps {
    bookmarkKey: LocalStorageKey.BOOKMARKS | LocalStorageKey.SEED_49_BOOKMARKS;
    name: string;
    compact?: boolean;
}


const FavoriteButton = ({ bookmarkKey, name, compact }: FavoriteButtonProps) => {
    const useBookmark = useBookmarkStore[bookmarkKey];
    const isBookmarked = useBookmark(state => state.bookmarks.has(name));
    const toggleBookmark = useBookmark(state => state.toggleBookmark);
    const { palette: { mode } } = useTheme();
    const isLight = mode === 'light';

    return (
        <IconButton size={compact ? 'small' : 'medium'} onClick={() => toggleBookmark(name)}>
            {
                isBookmarked
                    ? <StarRounded htmlColor={yellow[isLight ? 800 : 500]}
                                   fontSize={compact ? 'small' : 'medium'} />
                    : <StarOutlineRounded htmlColor={yellow[isLight ? 800 : 500]}
                                          fontSize={compact ? 'small' : 'medium'} />
            }
        </IconButton>
    );
};

export default FavoriteButton;