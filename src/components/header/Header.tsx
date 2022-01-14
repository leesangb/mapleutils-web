import {
    Avatar,
    Button,
    CSSObject,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    PaletteMode,
    Slide,
    styled,
    Theme,
    Toolbar,
    useScrollTrigger,
} from '@mui/material';
import { Box } from '@mui/system';
import Link from '../link/Link';
import SettingsButton from './SettingsButton';
import { ReactNode, useState } from 'react';
import { Menu } from '@mui/icons-material';

import MuiDrawer from '@mui/material/Drawer';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface HeaderProps {
    children: ReactNode;
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


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const seeds = [
    {
        floor: 24,
        shortDescription: '마을 BGM',
    },
    {
        floor: 36,
        shortDescription: '기록지',
    },
    {
        floor: 39,
        shortDescription: '문제 족보',
    },
    {
        floor: 48,
        shortDescription: '오버레이 미니맵',
    },
    {
        floor: 49,
        shortDescription: '문제 족보',
    },
];


const Header = (props: HeaderProps) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Box display={'flex'}>
            <HideOnScroll>
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
            </HideOnScroll>
            <Drawer variant={'permanent'} open={open}>
                <DrawerHeader />
                <Box sx={{ padding: '8px' }}>
                    <List>
                        {
                            seeds.map(seed => (
                                <ListItem component={Link} href={`/seed/${seed.floor}`} sx={{ paddingLeft: '8px' }}
                                          button key={seed.floor} dense>
                                    <ListItemIcon>
                                        <Avatar>{seed.floor}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={`시드 ${seed.floor}층`} secondary={seed.shortDescription} />
                                </ListItem>))
                        }
                        <Divider />

                    </List>
                </Box>
            </Drawer>
            <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    );
};
export default Header;
