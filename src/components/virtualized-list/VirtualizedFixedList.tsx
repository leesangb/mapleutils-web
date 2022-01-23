import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { ChangeEvent, memo, ReactNode, useMemo, useState } from 'react';
import { ListItem } from '@mui/material';
import { SearchBar } from '@components/input';

interface VirtualizedFixedListItemProps<T> extends ListChildComponentProps<{ items: T[] }> {
    rowRenderer: (item: T, index: number) => ReactNode;
    divider?: boolean;
}

const VirtualizedFixedListItem = <T, >(props: VirtualizedFixedListItemProps<T>) => {
    const { data, index, style, divider } = props;
    return (
        <ListItem style={style} divider={divider}>
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
    const { width, height, items, rowSize, rowRenderer, divider, placeholder, searchFilter } = props;
    const [search, setSearch] = useState<string>('');
    const itemData: { items: T[] } = useMemo(
        () => ({
            items: searchFilter
                ? items.filter((value) => searchFilter(value, search))
                : items,
        }), [search]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleClear = () => setSearch('')

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
            <FixedSizeList height={height}
                           width={width || '100%'}
                           itemCount={itemData.items.length}
                           itemSize={rowSize}
                           itemData={itemData}>
                {(liProps) => <MemoizedVirtualizedFixedListItem {...liProps}
                                                                divider={divider}
                                                                rowRenderer={rowRenderer} />}
            </FixedSizeList>
        </>
    );
};

export default VirtualizedFixedList;