import { IconButton } from '@mui/material';
import { StarOutlineRounded, StarRounded } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import useBookmarkStore from '../../../store/useBookmarkStore';

interface FavoriteButtonProps {
    name: string;
}

const FavoriteButton = ({ name }: FavoriteButtonProps) => {
    const isBookmarked = useBookmarkStore(state => state.bookmarks.has(name));
    const toggleBookmark = useBookmarkStore(state => state.toggleBookmark);

    return (
        <IconButton onClick={() => toggleBookmark(name)}>
            {
                isBookmarked
                    ? <StarRounded htmlColor={yellow[500]} />
                    : <StarOutlineRounded htmlColor={yellow[500]} />
            }
        </IconButton>
    );
};

export default FavoriteButton;