import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DiscordIcon, KakaoTalkIcon } from '../icons';
import { GitHub } from '@mui/icons-material';
import { discordLink, githubLink, kakaotalkLink } from '../../tools/socialLinks';
import useFetch from '../../hooks/useFetch';
import { AnalyticsRealTimeData } from '../../api/analytics';
import { useTranslation } from 'next-i18next';
import { Locales } from '../../tools/locales';

const currentYear = new Date().getFullYear();

const StyledFooter = styled('footer')(({ theme }) => ({
    whiteSpace: 'initial',
    color: theme.palette.grey[600],
    margin: theme.spacing(1),
}));

interface FooterProps {
    open?: boolean;
}

const Footer = (props: FooterProps) => {
    const { t, i18n } = useTranslation();
    const { data } = useFetch<AnalyticsRealTimeData>(`/api/realtime-users`);
    const isKorean = i18n.resolvedLanguage === Locales.Korean;
    return (
        <StyledFooter>
            <Grid container direction={props.open ? 'row' : 'column'} justifyContent={'center'}>
                {data && (<Grid item sx={{ alignSelf: 'center' }}>
                    <Typography variant={'caption'}>
                        {t('online')} : {data.users}
                    </Typography>
                </Grid>)}
                {
                    isKorean && (
                        <Grid item sx={{ alignSelf: 'center' }}>
                            <Tooltip title={'카톡 문의'} placement={props.open ? 'top' : 'right'}>
                                <IconButton component={'a'}
                                            target={'_blank'}
                                            rel={'noreferrer noopener'}
                                            href={kakaotalkLink}>
                                    <KakaoTalkIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )
                }
                <Grid item sx={{ alignSelf: 'center' }}>
                    <Tooltip title={'Discord'} placement={props.open ? 'top' : 'right'}>
                        <IconButton component={'a'}
                                    target={'_blank'}
                                    rel={'noreferrer noopener'}
                                    href={discordLink}>
                            <DiscordIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item sx={{ alignSelf: 'center' }}>
                    <Tooltip title={'GitHub'} placement={props.open ? 'top' : 'right'}>
                        <IconButton component={'a'}
                                    target={'_blank'}
                                    rel={'noreferrer noopener'}
                                    href={githubLink}>
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Typography variant={'caption'}>
                {
                    props.open
                        ? `© ${currentYear} mapleutils All rights reserved. mapleutils is not associated with NEXON Korea.`
                        : `© ${currentYear} mapleutils`
                }
            </Typography>

        </StyledFooter>
    );
};

export default Footer;
