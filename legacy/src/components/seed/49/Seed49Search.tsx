import { SearchBar } from '../../input';
import { Badge, Button, Collapse, Divider, Grid } from '@mui/material';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded, StarRounded } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface Seed49SearchProps {
    search: string;
    onSearch: (search: string) => void;
    silhouette: boolean;
    onChangeSilhouette: (value: boolean) => void;
    locations: string[];
    allLocations: string[];
    onChangeLocations: (locations: string[]) => void;
    showOnlyFavorite: boolean;
    onChangeShowOnlyFavorite: (show: boolean) => void;
}

const Seed49Search = ({
                          search,
                          onSearch,
                          silhouette,
                          onChangeSilhouette,
                          locations,
                          onChangeLocations,
                          allLocations,
                          showOnlyFavorite,
                          onChangeShowOnlyFavorite,
                      }: Seed49SearchProps) => {
    const { t } = useTranslation(['common', 'seed49']);
    const [collapse, setCollapse] = useState(true);

    const handleClear = () => onSearch('');
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <>
            <SearchBar placeholder={t('searchPlaceholder', { ns: 'seed49' })}
                       value={search}
                       onChange={handleSearch}
                       onClear={handleClear} />
            <Grid justifyContent={'space-between'} sx={theme => ({ marginTop: theme.spacing(1) })} container
                  spacing={1}>
                <Grid item>
                    <Button
                        disableElevation
                        variant={'contained'}
                        onClick={() => onChangeSilhouette(!silhouette)}>
                        {silhouette ? `${t('silhouette')} OFF` : `${t('silhouette')} ON`}
                    </Button>
                    <Button sx={{ marginLeft: 1 }}
                            variant={showOnlyFavorite ? 'contained' : 'outlined'}
                            disableElevation
                            startIcon={<StarRounded />}
                            onClick={() => onChangeShowOnlyFavorite(!showOnlyFavorite)}>
                        {t('showOnlyFavorite', { ns: 'seed49' })}
                    </Button>
                </Grid>
                <Grid item>
                    <Badge badgeContent={locations.length} color={'primary'}
                           invisible={locations.length === allLocations.length}>
                        <Button onClick={() => setCollapse(!collapse)}
                                endIcon={collapse
                                    ? <KeyboardArrowDownRounded />
                                    : <KeyboardArrowUpRounded />}>
                            {t('filters')}
                        </Button>
                    </Badge>
                </Grid>
            </Grid>
            <Collapse in={!collapse} timeout={'auto'} unmountOnExit>
                <Grid container sx={theme => ({ marginTop: theme.spacing(1) })} spacing={1}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Button
                            variant={'contained'}
                            disableElevation
                            onClick={() => onChangeLocations(allLocations)}>{t('selectAll')}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant={'contained'}
                            disableElevation
                            onClick={() => onChangeLocations(allLocations.filter(l => !locations.includes(l)))}>{t('invert')}</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {
                        allLocations.map(location => <Grid key={location} item>
                            <Button
                                size={'small'}
                                disableElevation
                                variant={locations.includes(location) ? 'contained' : 'outlined'}
                                onClick={() => locations.includes(location)
                                    ? onChangeLocations(locations.filter(l => l !== location))
                                    : onChangeLocations([...locations, location])
                                }>
                                {t(location, { ns: 'seed49' })}</Button>
                        </Grid>)
                    }
                </Grid>
            </Collapse>
        </>
    );
};

export default Seed49Search;
