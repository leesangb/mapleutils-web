import { Button, IconButton, PaletteMode, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import Link from '../link/Link';
import SettingsButton from './SettingsButton';
import { Menu } from '@mui/icons-material';


import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { DRAWER_WIDTH } from '@components/drawer/Drawer';

interface HeaderProps {
    themeType: PaletteMode;
    toggleDarkMode: () => void;
    open?: boolean;
    toggleOpen?: () => void;
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Header = (props: HeaderProps) => {
    return (
        <AppBar position='fixed' color={'inherit'} open={props.open} elevation={0}>
            <Toolbar>
                <IconButton onClick={props.toggleOpen}>
                    <Menu />
                </IconButton>
                <Button component={Link} href='/' noLinkStyle>
                    홈
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <SettingsButton toggleDarkMode={props.toggleDarkMode} />
            </Toolbar>
        </AppBar>
    );
};
export default Header;
