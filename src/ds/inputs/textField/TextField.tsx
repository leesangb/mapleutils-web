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
  position: relative;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'fit-content'};

  &:focus-within > span:first-child {
    color: ${({ theme }) => theme.primary.default};
  }
`;

const Adornment = styled.span<TransientProps<{ placement: 'left' | 'right' }>>`
  position: absolute;
  ${({ $placement }) => $placement}: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text.disabled};
`;

const Input = styled.input<TransientProps<Pick<TextFieldProps, 'fullWidth'> & { left?: boolean, right?: boolean }>>`
  border: 1px solid ${({ theme }) => theme.contour};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: ${({ $left }) => $left ? '32px' : '8px'};
  padding-right: ${({ $right }) => $right ? '32px' : '8px'};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.125s ease-in-out;
  box-sizing: border-box;
  font-size: 16px;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'fit-content'};

  &:focus {
    border-width: 2px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: ${({ $left }) => $left ? '31px' : '7px'};
    padding-right: ${({ $right }) => $right ? '31px' : '7px'};
    border-color: ${({ theme }) => theme.primary.default};
    outline: none;
  }

  &::placeholder {
    font-weight: 300;
    color: ${({ theme }) => theme.text.disabled};
  }
`;
