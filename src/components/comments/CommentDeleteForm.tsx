import { FormEvent, useRef } from 'react';
import styled from 'styled-components';
import { Button, Input } from '@/ds/inputs';
import { useTranslation } from '@/i18n/client';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useDeleteComment } from '@/api';
import { toast } from 'react-toastify';

interface CommentDeleteFormProps {
    commentId: string;
    onSuccess?: () => void;
}

export const CommentDeleteForm = ({ commentId, onSuccess }: CommentDeleteFormProps) => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const { mutate, isLoading } = useDeleteComment();
    const { t } = useTranslation();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!passwordRef.current) {
            return;
        }

        mutate({
            id: commentId,
            password: passwordRef.current.value,
        }, {
            onSuccess: () => {
                passwordRef.current!.value = '';
                onSuccess?.();
            },
            onError: (e) => {
                console.log(e);
                toast.error(t('comment.passwordIncorrect'));
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input ref={passwordRef} label={t('comment.password')} minLength={6}
                maxLength={16} name={'password'}
                required
                disabled={isLoading}
                type={'password'}
                placeholder={`6 - 16 ${t('common:comment.letters')}`} />
            <Button disabled={isLoading} type={'submit'}>
                <RiDeleteBin2Fill />
                {t('comment.deleteComment')}
            </Button>
        </Form>
    );
};

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
`;
