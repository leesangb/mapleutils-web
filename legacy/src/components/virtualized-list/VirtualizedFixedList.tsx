import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { ChangeEvent, memo, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { IconButton, List, ListItem, Popover, Tooltip, Typography } from '@mui/material';
import { SearchBar } from '../input';
import { Box } from '@mui/system';
import { useTranslation } from 'next-i18next';
import { useIsMounted } from '../../hooks/useIsMounted';
import { SettingsRounded } from '@mui/icons-material';

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
    optionMenu?: ReactNode;
}

const VirtualizedFixedList = <T, >(props: VirtualizedFixedListProps<T>) => {
    const { t } = useTranslation();
    const { width, height, items, rowSize, rowRenderer, divider, placeholder, searchFilter, optionMenu } = props;
    const [search, setSearch] = useState<string>('');
    const isMounted = useIsMounted();
    const isSsr = !isMounted;
    const itemData: { items: T[] } = useMemo(
        () => ({
            items: searchFilter
                ? items.filter((value) => searchFilter(value, search))
                : items,
        }), [search, searchFilter]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleClear = () => setSearch('');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {
                !!searchFilter && (
                    <Box display={'flex'}>
                        <SearchBar placeholder={placeholder}
                                   value={search}
                                   onChange={handleSearch}
                                   onClear={handleClear} />
                        <>
                            {optionMenu && <>
                                <Tooltip title={t('settings')}>
                                    <IconButton
                                        onClick={handleClick}
                                        size='small'
                                        sx={{ ml: 2 }}>
                                        <SettingsRounded />
                                    </IconButton>
                                </Tooltip>
                                <Popover
                                    PaperProps={{ variant: 'outlined', elevation: 0, sx: { padding: 1 } }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}>
                                    {optionMenu}
                                </Popover>
                            </>}

                        </>
                    </Box>


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
