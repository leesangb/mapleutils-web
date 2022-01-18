import { Button, IconButton, PaletteMode, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import Link from '../link/Link';
import SettingsButton from './SettingsButton';
import { ReactNode, useState } from 'react';
import { Menu } from '@mui/icons-material';


import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Drawer, { DRAWER_WIDTH } from '@components/drawer/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';

interface HeaderProps {
    children: ReactNode;
    themeType: PaletteMode;
    toggleDarkMode: () => void;
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
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Box display={'flex'}>
            <AppBar position='fixed' color={'inherit'} open={open} elevation={0}>
                <Toolbar>
                    <IconButton onClick={() => setOpen(open => !open)}>
                        <Menu />
                    </IconButton>
                    <Button component={Link} href='/' noLinkStyle>
                        홈
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <SettingsButton toggleDarkMode={props.toggleDarkMode} />
                </Toolbar>
            </AppBar>
            <Drawer open={open} />
            <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    );
};
export default Header;
