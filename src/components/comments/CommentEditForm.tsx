import { useEditComment } from '@/api';
import { Button, Input, TextArea } from '@/ds/inputs';
import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useTranslation } from '@/i18n/client';
import { toast } from 'react-toastify';
import { CommentDto } from '@/api/schema/comment.zod';

const MAX_LENGTH = 500;

interface CommentEditFormProps {
    comment: CommentDto;
    onSuccess?: () => void;
}

export const CommentEditForm = ({ comment, onSuccess }: CommentEditFormProps) => {
    const { t } = useTranslation();
    const [content, setContent] = useState<string>(comment.text);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { mutate, isLoading } = useEditComment();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!passwordRef.current || !content) {
            return;
        }

        mutate({
            id: comment.id,
            password: passwordRef.current.value,
            text: content,
        }, {
            onSuccess: () => {
                passwordRef.current!.value = '';
                setContent('');
                onSuccess?.();
                toast.success(t('comment.editSuccess'));
            },
            onError: () => {
                toast.error(t('comment.passwordIncorrect'));
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <UserSection>
                <Input ref={passwordRef}
                    label={t('comment.password')}
                    minLength={6}
                    maxLength={16} name={'password'}
                    required
                    disabled={isLoading}
                    type={'password'}
                    placeholder={`6 - 16 ${t('common:comment.letters')}`} />
            </UserSection>
            <CommentSection>
                <TextArea style={{ width: '100%' }}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    name={'content'}
                    label={t('comment.comment')}
                    minLength={1}
                    maxLength={MAX_LENGTH}
                    required
                    disabled={isLoading} />
                <Button disabled={isLoading} type={'submit'}>
                    <RiSendPlaneFill />
                </Button>
            </CommentSection>
        </Form>
    );
};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  margin: 8px 0;
  width: 100%;
`;

const UserSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const CommentSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;
