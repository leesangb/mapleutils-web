import { ComponentProps } from 'react';
import styled from 'styled-components';

interface TextAreaProps extends ComponentProps<'textarea'> {
    label?: string;
}

export const TextArea = ({ label, required, style, ...props }: TextAreaProps) => {
    const rows = props.value?.toString().split('\n').length ?? 0;
    const maxRows = rows < 4 ? 3 : rows;

    return (
        <>
            <Fieldset style={style}>
                {label && <Legend>{label}{required && ' *'}</Legend>}
                <StyledTextArea rows={maxRows} {...props} />
            </Fieldset>
        </>
    );
};

const Legend = styled.legend`
  font-size: 12px;
  padding: 0 8px;
  line-height: 14px;
  transition: color 0.125s ease-in-out, font-size 0.125s ease-in-out;
  color: ${({ theme }) => theme.text.disabled};
`;

const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.contour};
  transition: border-color 0.125s ease-in-out;
  margin: 0;
  padding: 8px;

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

const StyledTextArea = styled.textarea`
  margin: 0;
  padding: 0;
  outline: transparent;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  font-size: 16px;
  border: none;

  &::placeholder {
    font-weight: 300;
    color: ${({ theme }) => theme.text.disabled};
  }
`;
