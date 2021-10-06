import { AppBar, PaletteMode, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import { Box } from '@mui/system';
import LinkButton from '../button/LinkButton';
import SettingsButton from './SettingsButton';

interface HeaderProps {
    themeType: PaletteMode;
    toggleDarkMode: () => void;
}

interface HideOnScrollProps {
    children: React.ReactElement;
}

const HideOnScroll = (props: HideOnScrollProps) => {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {props.children}
        </Slide>
    );
};

const homeUrls = ['', '/', '/home'];

const Header = (props: HeaderProps) => {
    return (
        <HideOnScroll>
            <AppBar position='sticky' color='default' elevation={0}>
                <Toolbar>
                    <LinkButton to='/' matches={homeUrls} label='홈' />
                    <Box sx={{ flexGrow: 1 }} />
                    <SettingsButton toggleDarkMode={props.toggleDarkMode} />
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
};
export default Header;
