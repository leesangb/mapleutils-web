import { Box, useTheme } from '@mui/system';
import {
    Avatar,
    CSSObject,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    Theme,
    useMediaQuery,
} from '@mui/material';
import Link from '@components/link/Link';
import MuiDrawer from '@mui/material/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import Footer from '@components/footer/Footer';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

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
    ({ theme, open, anchor }) => ({
        width: anchor === 'top' ? 'auto' : DRAWER_WIDTH,
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

type DrawerItem = {
    category: {
        name: string,
        short: string,
    },
    children: {
        key: string,
        title: string,
        subtitle?: string,
        link: string,
        icon: ReactNode
    }[]
}

const LinkAvatar = (props: any) => {
    const location = useRouter();

    return <Avatar sx={theme => ({
        bgcolor: props.link.includes(location.pathname)
            ? theme.palette.primary.light
            : theme.palette.grey[400],
    })}>{props.text}</Avatar>;
};

const drawerItems: DrawerItem[] = [
    {
        category: {
            name: '더 시드',
            short: '시드',
        },
        children:
            seeds.map(seed => ({
                key: `seed-${seed.floor}`,
                title: `시드 ${seed.floor}층`,
                subtitle: seed.shortDescription,
                link: `/seed/${seed.floor}`,
                icon: <LinkAvatar link={`/seed/${seed.floor}`} text={seed.floor} />,
            })),
    },
    {
        category: {
            name: '몬스터 라이프',
            short: '몬라',
        },
        children: [
            {
                key: 'farm-combine',
                title: '스페셜 조합식',
                link: '/farm/combine',
                icon: <LinkAvatar link={'/farm/combine'} text={'조합'} />,
            },
            {
                key: 'farm-info',
                title: '몬스터 정리',
                link: '/farm/info',
                icon: <LinkAvatar link={'/farm/info'} text={'몹'} />,
            },
        ],
    },
];

interface DrawerChildItemProps {
    link: string;
    icon: ReactNode;
    title: string;
    subtitle?: string;
}

const DrawerChildItem = (props: DrawerChildItemProps) => {
    return (
        <ListItem component={Link}
                  href={props.link}
                  sx={theme => ({ paddingLeft: theme.spacing(1) })}
                  button
                  dense>
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.title} secondary={props.subtitle} />
        </ListItem>
    );
};

interface DrawerItemListProps {
    open?: boolean;
    item: DrawerItem;
}

const DrawerItemList = (props: DrawerItemListProps) => {
    const { open, item } = props;
    return (
        <>
            <ListItem>
                <ListItemText primary={open ? item.category.name : item.category.short} />
            </ListItem>
            {item.children.map(({ key, ...rest }) => <DrawerChildItem key={key} {...rest} />)}
            <Divider sx={theme => ({ margin: theme.spacing(1) })} />
        </>
    );
};

const Drawer = (props: DrawerProps) => {
    const { open } = props;
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return mdDown ? (
        <MuiDrawer anchor={'top'} open={open}>
            <DrawerHeader />
            <Box sx={theme => ({ padding: theme.spacing(1), flex: 'auto' })}>
                <List>
                    {drawerItems.map(item => <DrawerItemList open={open} key={item.category.name} item={item} />)}
                </List>
            </Box>
        </MuiDrawer>
    ) : (
        <StyledDrawer variant={'permanent'} open={open}>
            <DrawerHeader />
            <Box sx={theme => ({ padding: theme.spacing(1), flex: 'auto' })}>
                <List>
                    {drawerItems.map(item => <DrawerItemList open={open} key={item.category.name} item={item} />)}
                </List>
            </Box>
            <Footer open={open} />
        </StyledDrawer>
    );
};

export default Drawer;