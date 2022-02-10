import { Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { KakaoTalkIcon } from '@components/icons';
import { GitHub } from '@mui/icons-material';

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
    return (
        <StyledFooter>
            <Grid container direction={props.open ? 'row' : 'column'} justifyContent={'center'}>
                <Grid item sx={{ alignSelf: 'center' }}>
                    <IconButton component={'a'}
                                target={'_blank'}
                                rel={'noreferrer noopener'}
                                href={'https://open.kakao.com/o/sDbLVFoc'}>
                        <KakaoTalkIcon />
                    </IconButton>
                </Grid>
                <Grid item sx={{ alignSelf: 'center' }}>
                    <IconButton component={'a'}
                                target={'_blank'}
                                rel={'noreferrer noopener'}
                                href={'https://github.com/leesangb/mapleutils-web'}>
                        <GitHub />
                    </IconButton>
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