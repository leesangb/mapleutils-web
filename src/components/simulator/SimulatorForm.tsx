import styled from 'styled-components';
import { Button, Input } from '@/ds/inputs';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from '@/i18n/client';
import { RiArrowRightLine, RiLightbulbFlashLine, RiRestartLine, RiSearchLine } from 'react-icons/ri';

interface SimulatorFormProps {
    hint: string;
    answer: string;
    onAnswer: () => void;
    label: string;
    onNext: () => void;
    onReset: () => void;
}

export const SimulatorForm = ({ label, hint, answer, onAnswer, onReset, onNext }: SimulatorFormProps) => {
    const [value, setValue] = useState<string>('');
    const [placeholder, setPlaceholder] = useState<string>('');
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (value === answer) {
            onAnswer();
        } else {
            setValue('');
            toast.error(t('wrongAnswer'));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Button type={'button'} onClick={() => {
                setValue('');
                setPlaceholder(hint);
                inputRef.current?.focus();
            }}>
                <RiLightbulbFlashLine />
                {t('hint')}
            </Button>

            <Button type={'button'} onClick={() => setValue(answer)}>
                <RiSearchLine />
                {t('answer')}
            </Button>
            <Input ref={inputRef} label={label}
                autoFocus
                placeholder={placeholder}
                fullWidth
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Button type={'button'} onClick={() => onReset()}>
                <RiRestartLine />
                {t('restart')}
            </Button>
            <Button type={'button'} onClick={() => onNext()}>
                {t('next')}
                <RiArrowRightLine />
            </Button>
        </Form>
    );
};

const Form = styled.form`
`;
