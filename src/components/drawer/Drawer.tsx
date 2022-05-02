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
import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';
import Footer from '@components/footer/Footer';
import { TFunction, useTranslation } from 'next-i18next';

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
        icon: (t: TFunction) => ReactNode
    }[]
}

const LinkAvatar = (props: any) => {
    const location = useRouter();

    return <Avatar sx={theme => ({
        bgcolor: location.pathname !== '/' && props.link.includes(location.pathname)
            ? theme.palette.primary.light
            : theme.palette.grey[400],
    })}>{props.text}</Avatar>;
};

const drawerItems: DrawerItem[] = [
    {
        category: {
            name: 'drawer.seed.longName',
            short: 'drawer.seed.shortName',
        },
        children:
            seeds.map(seed => ({
                key: `seed-${seed.floor}`,
                title: `drawer.seed.${seed.floor}.title`,
                subtitle: `drawer.seed.${seed.floor}.shortDescription`,
                link: `/seed/${seed.floor}`,
                icon: () => <LinkAvatar link={`/seed/${seed.floor}`} text={seed.floor} />,
            })),
    },
    {
        category: {
            name: 'drawer.farm.longName',
            short: 'drawer.farm.shortName',
        },
        children: [
            {
                key: 'farm-combine',
                title: 'drawer.farm.combine.longName',
                link: '/farm/combine',
                icon: (t: TFunction) => <LinkAvatar link={'/farm/combine'} text={t('drawer.farm.combine.shortName')} />,
            },
            {
                key: 'farm-info',
                title: 'drawer.farm.info.longName',
                link: '/farm/info',
                icon: (t: TFunction) => <LinkAvatar link={'/farm/info'} text={t('drawer.farm.info.shortName')} />,
            },
        ],
    },
];

interface DrawerChildItemProps {
    link: string;
    icon: (t: TFunction) => ReactNode;
    title: string;
    subtitle?: string;
}

const DrawerChildItem = (props: DrawerChildItemProps) => {
    const { t } = useTranslation();
    return (
        <ListItem component={Link}
                  href={props.link}
                  sx={theme => ({ paddingLeft: theme.spacing(1) })}
                  button
                  dense>
            <ListItemIcon>
                {props.icon(t)}
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
    const { t } = useTranslation();
    const { open, item } = props;
    return (
        <>
            <ListItem>
                <ListItemText primary={t(open ? item.category.name : item.category.short)} />
            </ListItem>
            {item.children.map(({ key, title, subtitle, ...rest }) => <DrawerChildItem key={key} title={t(title)}
                                                                                       subtitle={subtitle ? t(subtitle) : undefined} {...rest} />)}
            <Divider sx={theme => ({ margin: theme.spacing(1) })} />
        </>
    );
};

const Drawer = (props: DrawerProps) => {
    const { open } = props;
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const DrawerContents = useCallback(() => <>
        <DrawerHeader />
        <Box sx={theme => ({ padding: theme.spacing(1), flex: 'auto' })}>
            <List>
                {drawerItems.map(item => <DrawerItemList open={open} key={item.category.name} item={item} />)}
            </List>
        </Box>
    </>, [open]);

    return mdDown ? (
        <MuiDrawer anchor={'top'} open={open}>
            <DrawerContents />
        </MuiDrawer>
    ) : (
        <StyledDrawer variant={'permanent'} open={open}>
            <DrawerContents />
            <Footer open={open} />
        </StyledDrawer>
    );
};

export default Drawer;