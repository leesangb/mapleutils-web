import { Button, IconButton, PaletteMode, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from '@components/link';
import SettingsButton from './SettingsButton';
import { Menu } from '@mui/icons-material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface HeaderProps {
    themeType: PaletteMode;
    toggleDarkMode: () => void;
    toggleOpen?: () => void;
}


const AppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));


const Header = (props: HeaderProps) => {
    return (
        <AppBar position={'fixed'} variant={'outlined'} color={'inherit'} elevation={0}>
            <Toolbar>
                <IconButton onClick={props.toggleOpen}
                            size='large'
                            edge='start'>
                    <Menu />
                </IconButton>
                <Button component={Link} href={'/'} noLinkStyle>
                    홈
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <SettingsButton toggleDarkMode={props.toggleDarkMode} />
            </Toolbar>
        </AppBar>
    );
};
export default Header;
