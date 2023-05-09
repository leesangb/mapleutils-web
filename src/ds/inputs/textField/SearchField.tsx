import { TextField, TextFieldProps } from '@/ds/inputs/textField/TextField';
import { RiDeleteBack2Fill, RiSearchLine } from 'react-icons/ri';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

interface SearchFieldProps extends TextFieldProps {
    onClear?: () => void;
}

export const SearchField = ({ onClear, ...props }: SearchFieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputRef.current) {
            return;
        }

        const focusInput = (e: KeyboardEvent) => {
            if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') || e.key === 'F3') {
                e.preventDefault();
                inputRef.current?.focus();
                inputRef.current?.select();
            }
        };

        window.addEventListener('keydown', focusInput);
        return () => {
            window.removeEventListener('keydown', focusInput);
        };

    }, []);

    return <TextField inputRef={inputRef} adornment={{
        start: <RiSearchLine />,
        end: onClear && props.value && <ClearButton onClick={onClear}><RiDeleteBack2Fill /></ClearButton>,
    }} autoFocus {...props} />;
};

const ClearButton = styled.button`
  outline: none;
  padding: 6px;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.125s ease-in-out;
  margin-right: 8px;

  &:hover {
    color: ${({ theme }) => theme.primary.default};
    background-color: ${({ theme }) => theme.surface.hover};
  }
`;
