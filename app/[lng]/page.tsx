import { useTranslation } from '@/i18n/server';
import { I18nPageProps } from '@/i18n/settings';
import { Typography } from '@/ds/displays';
import { DISCORD_URL, GITHUB_RELEASE_URL, GITHUB_URL, KAKAOTALK_URL } from '@/utils/constants';
import { Card } from '@/ds/surfaces';

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
    return (
        <>
            <Typography>
                Bug reports or contact me via{' '}
                <a href={DISCORD_URL}>discord</a> or comment below 😊
            </Typography>
            <Typography>
                <a href={GITHUB_URL}>Github</a> issues and PRs are welcome!
            </Typography>
            <Typography>
                Special thanks to <i>Billy | 2DBF</i> (GMS) for English translations
            </Typography>
            <Typography>
                Special thanks to <i><a href={'https://github.com/takidog'}>takidog</a> | 多脂狗狗</i> (TMS)
                for Traditional Chinese translations
            </Typography>
        </>
    );
};

const HomePage = async ({ params }: I18nPageProps) => {
    const { t } = await useTranslation(params.lng, 'common');
    return (
        <Card>
            <Typography as={'h1'}>{t('welcome')}</Typography>
            {params.lng === 'ko' ? <Ko /> : <En />}
        </Card>
    );
};

export default HomePage;
