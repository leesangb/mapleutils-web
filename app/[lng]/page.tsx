import { useTranslation } from '@/i18n/server';
import { I18nPageProps } from '@/i18n/settings';
import { Typography } from '@/ds/displays';
import { DISCORD_URL, GITHUB_RELEASE_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';

const Ko = () => {
    return (<>
        <Typography>
            각종 문의 및 버그 제보는{' '}
            <a href={KAKAOTALK_URL}>크로아 상빈</a>{' '}
            <a href={DISCORD_URL}>디스코드</a>{' '}
            또는 댓글로 편하게 해주세요 😊
        </Typography>
        <Typography>
            <a href={GITHUB_URL}>Github</a> 이슈 또는 PR도 환영합니다!
        </Typography>
        <Typography>
            <a href={GITHUB_RELEASE_URL}>릴리즈 노트 바로가기</a>
        </Typography>
    </>);
};

const En = () => {
    return (<></>);
};

const HomePage = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'common');
    return (
        <>
            <Typography as={'h1'}>{t('welcome')}</Typography>
            {params.lng === 'ko' ? <Ko /> : <En />}
        </>
    );
};

export default HomePage;
