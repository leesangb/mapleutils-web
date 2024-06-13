import styled from 'styled-components';
import { useTranslation } from '@/i18n/client';
import { FormEvent, useRef, useState } from 'react';
import { Button, Input, TextArea } from '@/ds/inputs';
import { RiSendPlaneFill } from 'react-icons/ri';
import { usePostComment } from '@/api/useMapleutilsApiQuery';
import { toast } from 'react-toastify';

const MAX_LENGTH = 500;

interface CommentPostFormProps {
    parentId?: string;
    repliedTo?: string;
    onSuccess?: () => void;
}

export const CommentPostForm = ({ onSuccess, parentId, repliedTo }: CommentPostFormProps) => {
    const { t } = useTranslation();
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState<string>('');

    const { mutate, status } = usePostComment();

    const isLoading = status === 'pending';
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!nameRef.current || !passwordRef.current || !content) {
            return;
        }

        mutate({
            user: nameRef.current.value,
            password: passwordRef.current.value,
            text: content,
            repliedTo: repliedTo,
            parentId: parentId,
        }, {
            onSuccess: () => {
                setContent('');
                nameRef.current!.value = '';
                passwordRef.current!.value = '';
                onSuccess?.();
            },
            onError: () => {
                toast.error(t('errorMessage'));
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <UserSection>
                <Input ref={nameRef} label={t('comment.nickname')} name={'name'}
                    minLength={2}
                    maxLength={10}
                    required
                    disabled={isLoading}
                    placeholder={t('comment.nickname')} />
                <Input ref={passwordRef} label={t('comment.password')} minLength={6}
                    maxLength={16} name={'password'}
                    autoComplete={'current-password'}
                    required
                    disabled={isLoading}
                    type={'password'}
                    placeholder={`6 - 16 ${t('common:comment.letters')}`} />
            </UserSection>
            <CommentSection>
                <TextArea
                    style={{ width: '100%' }}
                    value={content} onChange={e => setContent(e.target.value)}
                    name={'content'}
                    label={t('comment.comment')}
                    minLength={1}
                    maxLength={MAX_LENGTH}
                    required
                    disabled={isLoading}
                    placeholder={repliedTo ? t('comment.repliedTo', { name: repliedTo }) : t('comment.commentPlaceholder')} />
                <Button disabled={isLoading} style={{ gridArea: 'submit' }} type={'submit'}
                    aria-label={t('comment.send')}>
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
