import { PropsWithChildren, ReactNode, useId } from 'react';
import styled from 'styled-components';

interface RadioGroupProps<T = unknown> {
    name: string;
    options: readonly T[];
    value?: T;
    onChange?: (value: T) => void;
    direction?: 'row' | 'column';
    align?: 'left' | 'right' | 'center';
    getOptionValue?: (option: T) => string;
    getRender?: (option: T) => ReactNode;
    getCompare?: (a: T, b: T) => boolean;
}

export const RadioGroup = <T, >({
    name,
    options,
    getCompare = (a, b) => a === b,
    getOptionValue = v => String(v),
    getRender = v => String(v),
    value,
    onChange,
    align = 'left',
    direction = 'column',
}: RadioGroupProps<T>) => {
    return (
        <RadioGroup.OptionContainer $direction={direction} $align={align}>
            {options.map(option => {
                const optionValue = getOptionValue(option);
                return (
                    <RadioOption key={optionValue}
                        name={name}
                        value={optionValue}
                        onClick={() => onChange?.(option)}
                        checked={value ? getCompare(value, option) : false}>
                        {getRender(option)}
                    </RadioOption>
                );
            })}
        </RadioGroup.OptionContainer>
    );
};

RadioGroup.OptionContainer = styled.div<TransientProps<Pick<RadioGroupProps, 'direction' | 'align'>>>`
  display: flex;
  gap: 8px;
  flex-direction: ${p => p.$direction};
  justify-content: ${({ $align }) => $align === 'left' ? 'flex-start' : $align === 'right' ? 'flex-end' : 'center'};
`;

interface RadioOptionProps {
    name?: string;
    value: string;
    onClick?: (value: string) => void;
    checked?: boolean;
}

const RadioOption = ({ name, value, checked, onClick, children }: PropsWithChildren<RadioOptionProps>) => {
    const id = useId();
    return (
        <Container onClick={() => onClick?.(value)}>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Input id={id} type={'radio'} value={value} name={name} onChange={() => {
            }} checked={checked} />
            <Label htmlFor={id}>{children}</Label>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: 0.125s background-color ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.surface.active};
  }

  & > * {
    pointer-events: none;
  }
`;

const Input = styled.input`
  appearance: none;
  margin: 0;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid ${({ theme }) => theme.text.disabled};
  transition: 0.125s border linear;

  &:checked {
    border: 4px solid ${({ theme }) => theme.primary.default};
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

RadioOption.displayName = 'RadioOption_internal';
