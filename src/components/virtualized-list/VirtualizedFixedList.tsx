import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { memo, ReactNode, useMemo } from 'react';
import { ListItem } from '@mui/material';

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
}

const VirtualizedFixedList = <T, >(props: VirtualizedFixedListProps<T>) => {
    const { width, height, items, rowSize, rowRenderer, divider } = props;
    const itemData: { items: T[] } = useMemo(() => ({ items }), []);

    return (
        <FixedSizeList height={height}
                       width={width || '100%'}
                       itemCount={items.length}
                       itemSize={rowSize}
                       itemData={itemData}>
            {(liProps) => <MemoizedVirtualizedFixedListItem {...liProps} divider={divider} rowRenderer={rowRenderer} />}
        </FixedSizeList>
    );
};

export default VirtualizedFixedList;