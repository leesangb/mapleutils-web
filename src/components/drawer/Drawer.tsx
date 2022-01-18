import { Box } from '@mui/system';
import { Avatar, CSSObject, Divider, List, ListItem, ListItemIcon, ListItemText, styled, Theme } from '@mui/material';
import Link from '@components/link/Link';
import MuiDrawer from '@mui/material/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';

interface DrawerProps {
    open: boolean;
}

export const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
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


const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
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

const Drawer = (props: DrawerProps) => {
    const { open } = props;

    return (
        <StyledDrawer variant={'permanent'} open={open}>
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
        </StyledDrawer>
    );
};

export default Drawer;