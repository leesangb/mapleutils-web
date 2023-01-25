import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { InputAttributes, NumericFormat } from 'react-number-format';

type NumberTextFieldProps = {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumberTextFieldCustom = forwardRef<typeof NumericFormat<InputAttributes>, NumberTextFieldProps>(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
        />
    );
});


const NumberTextField = (props: TextFieldProps) => {
    return (
        <TextField
            {...props}
            InputProps={{
                inputComponent: NumberTextFieldCustom as any,
                ...props.InputProps,
            }}
            inputProps={{
                style: {
                    textAlign: 'right',
                },
                ...props.inputProps,
            }}
        />
    );
};

export default NumberTextField;
