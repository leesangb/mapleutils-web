import { ComponentProps, ReactNode, Ref } from 'react';
import styled from 'styled-components';

export interface TextFieldProps extends ComponentProps<'input'> {
    fullWidth?: boolean;
    adornment?: {
        start?: ReactNode;
        end?: ReactNode;
    };
    inputRef?: Ref<HTMLInputElement>;
}

export const TextField = ({
    inputRef,
    fullWidth,
    adornment = {},
    ...props
}: TextFieldProps & ComponentProps<'input'>) => {
    const { start, end } = adornment;
    return start || end
        ? (
            <Container $fullWidth={fullWidth}>
                {start && <Adornment $placement={'left'}>{start}</Adornment>}
                <Input ref={inputRef} $left={!!start} $right={!!end} $fullWidth={fullWidth} {...props} />
                {end && <Adornment $placement={'right'}>{end}</Adornment>}
            </Container>
        ) : <Input ref={inputRef} $fullWidth={fullWidth} {...props} />;
};

const Container = styled.div<TransientProps<{ fullWidth?: boolean }>>`
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'fit-content'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:focus-within > span:first-child {
    color: ${({ theme }) => theme.primary.default};
  }

  &:focus-within {
    border-width: 2px;
    padding: 7px;
    border-color: ${({ theme }) => theme.primary.default};
  }
`;

const Adornment = styled.span<TransientProps<{ placement: 'left' | 'right' }>>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.disabled};
  user-select: none;
`;

const Input = styled.input<TransientProps<Pick<TextFieldProps, 'fullWidth'> & { left?: boolean, right?: boolean }>>`
  transition: border-color 0.125s ease-in-out;
  font-size: 16px;
  width: 100%;
  outline: none;
  border: none;


  &::placeholder {
    font-weight: 300;
    color: ${({ theme }) => theme.text.disabled};
  }
`;
