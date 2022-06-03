import { IconButton, useTheme } from '@mui/material';
import { StarOutlineRounded, StarRounded } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import useBookmarkStore from '@store/useBookmarkStore';

interface FavoriteButtonProps {
    name: string;
    compact?: boolean;
}

const FavoriteButton = ({ name, compact }: FavoriteButtonProps) => {
    const isBookmarked = useBookmarkStore(state => state.bookmarks.has(name));
    const toggleBookmark = useBookmarkStore(state => state.toggleBookmark);
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