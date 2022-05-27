import { SeedLocation } from '@data/seed/49';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';

const useSeed49Location = (data: SeedLocation[]) => {
    const { t } = useTranslation(['seed49']);
    const allLocations = useMemo(() => data.map(l => l.location).sort((a, b) => t(a).localeCompare(t(b))), [data]);
    const [locations, setLocations] = useState(allLocations);

    const onChangeLocations = useCallback((locations: string[]) => {
        setLocations(locations);
        LocalStorageHelper.save(LocalStorageKey.SEED_49_LOCATIONS, locations);
    }, []);

    useEffect(() => {
        const locations = LocalStorageHelper.load<string[] | null>(LocalStorageKey.SEED_49_LOCATIONS);
        onChangeLocations(locations ? locations.filter(location => allLocations.includes(location)) : allLocations);
    }, []);

    return {
        locations,
        onChangeLocations,
        allLocations,
    };
};

export default useSeed49Location;