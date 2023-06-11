import { ComponentProps, forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'ref'> {
    fullWidth?: boolean;
    label?: string;
    adornment?: {
        start?: ReactNode;
        end?: ReactNode;
    };
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, TextFieldProps & ComponentProps<'input'>>(({
    fullWidth,
    label,
    adornment = {},
    ...props
}, ref) => {
    const { start, end } = adornment;
    return <Container $fullWidth={fullWidth}>
        {start && <Adornment $placement={'left'}>{start}</Adornment>}
        {label && <Legend>{label}</Legend>}
        <InputField ref={ref} $left={!!start} $right={!!end} $fullWidth={fullWidth} {...props} />
        {end && <Adornment $placement={'right'}>{end}</Adornment>}
    </Container>;
});

const Legend = styled.legend`
  font-size: 12px;
  padding: 0 8px;
  line-height: 14px;
  transition: color 0.125s ease-in-out, font-size 0.125s ease-in-out;
  color: ${({ theme }) => theme.text.disabled};
`;

const Adornment = styled.span<TransientProps<{ placement: 'left' | 'right' }>>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.disabled};
  user-select: none;
`;

const InputField = styled.input<TransientProps<Pick<TextFieldProps, 'fullWidth'> & {
    left?: boolean,
    right?: boolean
}>>`
  transition: border-color 0.125s ease-in-out;
  font-size: 16px;
  width: 100%;
  outline: transparent;
  border: none;

  &::placeholder {
    font-weight: 300;
    color: ${({ theme }) => theme.text.disabled};
  }
`;

const Container = styled.fieldset<TransientProps<{ fullWidth?: boolean }>>`
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'fit-content'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.125s ease-in-out;

  &:focus-within > span:first-child {
    color: ${({ theme }) => theme.primary.default};
  }

  &:focus-within {
    border-width: 2px;
    padding: 8px 7px 7px 7px;
    border-color: ${({ theme }) => theme.primary.default};

    &:not(:has(> legend)) {
      padding: 7px;
    }

    ${Legend} {
      color: ${({ theme }) => theme.primary.default};
      font-size: 14px;
    }
  }
`;
