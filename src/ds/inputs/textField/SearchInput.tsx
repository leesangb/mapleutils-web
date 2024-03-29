import { Input, TextFieldProps } from '@/ds/inputs/textField/Input';
import { RiSearchLine } from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

type SearchFieldProps = Omit<TextFieldProps, 'adornment'>;

export const SearchInput = ({ ...props }: SearchFieldProps) => {
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
                inputRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        };

        window.addEventListener('keydown', focusInput);
        return () => {
            window.removeEventListener('keydown', focusInput);
        };

    }, []);

    return <Input ref={inputRef} autoFocus {...props} adornment={{
        start: <RiSearchLine />,
        end: <>
            <kbd>F3</kbd> <Span>/</Span> <kbd>Ctrl</kbd> <Span>+</Span> <kbd>F</kbd>
        </>,
    }} />;
};

const Span = styled.span`
  font-size: 10px;
`;
