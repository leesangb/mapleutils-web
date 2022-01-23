import { ChangeEventHandler, useEffect, useRef } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClear?: () => void;
}

const SearchBar = (props: SearchBarProps) => {
    const { value, onChange, onClear, ...other } = props;

    const searchBarRef = useRef<HTMLInputElement | null>();

    useEffect(() => {
        if (searchBarRef.current) {
            const focusSearchBar = (e: KeyboardEvent) => {
                if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') || e.key === 'F3') {
                    e.preventDefault();
                    searchBarRef.current?.focus();
                }
            };
            window.addEventListener('keydown', focusSearchBar);
            return () => {
                window.removeEventListener('keydown', focusSearchBar);
            };
        }
    });
    return (
        <TextField
            {...other}
            inputRef={searchBarRef}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <IconButton size='small' disabled>
                            <SearchRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: value && (
                    <InputAdornment position='end'>
                        <IconButton size='small' onClick={onClear}>
                            <ClearRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            variant='outlined'
            fullWidth
            size='small'
            inputProps={{ 'aria-label': 'search' }}
            value={value}
            onChange={onChange}
        />
    );
};

export default SearchBar;