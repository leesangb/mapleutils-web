import { useCallback, useEffect, useState } from 'react';
import { LocalStorageHelper, LocalStorageKey } from '../../../tools/localStorageHelper';

const useSeed49Favorite = () => {
    const [showOnlyFavorite, setShowOnlyFavorite] = useState<boolean>(false);

    const onChangeShowOnlyFavorite = useCallback((show: boolean) => {
        setShowOnlyFavorite(show);
        LocalStorageHelper.save(LocalStorageKey.SEED_49_SHOW_FILTER, show);
    }, []);

    useEffect(() => {
        const showFilter = LocalStorageHelper.load<boolean>(LocalStorageKey.SEED_49_SHOW_FILTER);
        setShowOnlyFavorite(showFilter);
    }, []);

    return {
        showOnlyFavorite,
        onChangeShowOnlyFavorite,
    };
};

export default useSeed49Favorite;
