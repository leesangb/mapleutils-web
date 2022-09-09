import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { ChangeEvent, memo, ReactNode, useEffect, useMemo, useState } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { SearchBar } from '@components/input';
import { Box } from '@mui/system';
import { useTranslation } from 'next-i18next';

interface VirtualizedFixedListItemProps<T> extends ListChildComponentProps<{ items: T[] }> {
    rowRenderer: (item: T, index: number) => ReactNode;
    divider?: boolean;
}

const VirtualizedFixedListItem = <T, >(props: VirtualizedFixedListItemProps<T>) => {
    const { data, index, divider, style } = props;
    return (
        <ListItem style={style} sx={{ borderRadius: 0 }} divider={divider}>
            {props.rowRenderer(data.items[index], index)}
        </ListItem>
    );
};

const MemoizedVirtualizedFixedListItem = memo(VirtualizedFixedListItem) as typeof VirtualizedFixedListItem;

interface VirtualizedFixedListProps<T> {
    items: T[];
    height: number;
    width?: number | string;
    rowSize: number;
    divider?: boolean;
    rowRenderer: (item: T, index: number) => ReactNode;
    placeholder?: string;
    searchFilter?: (item: T, term: string) => boolean;
}

const VirtualizedFixedList = <T, >(props: VirtualizedFixedListProps<T>) => {
    const { t } = useTranslation();
    const { width, height, items, rowSize, rowRenderer, divider, placeholder, searchFilter } = props;
    const [search, setSearch] = useState<string>('');
    const [isSsr, setIsSsr] = useState<boolean>(true);
    const itemData: { items: T[] } = useMemo(
        () => ({
            items: searchFilter
                ? items.filter((value) => searchFilter(value, search))
                : items,
        }), [search]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleClear = () => setSearch('');

    useEffect(() => {
        setIsSsr(false);
    }, []);

    return (
        <>
            {
                !!searchFilter && (
                    <SearchBar placeholder={placeholder}
                               value={search}
                               onChange={handleSearch}
                               onClear={handleClear} />
                )
            }
            {
                itemData.items.length === 0
                    ? (
                        <Box sx={{ height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={theme => ({ color: theme.palette.text.disabled })}
                                        align={'center'}
                                        variant={'h4'}
                                        component={'p'}>
                                {t('noResultsFound')}
                            </Typography>
                        </Box>
                    ) : <>
                        {
                            isSsr
                                ?
                                <List>
                                    {itemData.items.map((data, index) => (
                                        <ListItem key={index} sx={{ borderRadius: 0 }} divider={divider}>
                                            {rowRenderer(data, index)}
                                        </ListItem>),
                                    )}
                                </List>
                                :
                                <FixedSizeList height={height}
                                               width={width || '100%'}
                                               itemCount={itemData.items.length}
                                               itemSize={rowSize}
                                               itemData={itemData}>
                                    {(liProps) => <MemoizedVirtualizedFixedListItem {...liProps}
                                                                                    divider={divider}
                                                                                    rowRenderer={rowRenderer} />}
                                </FixedSizeList>

                        }
                    </>
            }

        </>
    );
};

export default VirtualizedFixedList;