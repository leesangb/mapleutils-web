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
    const isBookmarked = useBookmarkStore[bookmarkKey](state => state.bookmarks.has(name));
    const toggleBookmark = useBookmarkStore[bookmarkKey](state => state.toggleBookmark);
    const { palette: { mode } } = useTheme();
    const isLight = mode === 'light';
    if (name === '가로등') {
        console.log(isBookmarked);
    }

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