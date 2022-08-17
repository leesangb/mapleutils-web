import { Box, css, useTheme } from '@mui/system';
import {
    Avatar,
    AvatarProps,
    Badge,
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
import { StarRounded } from '@mui/icons-material';
import { Locales } from '@tools/locales';

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
    width: `calc(${theme.spacing(7)} + 3px)`,
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
    css`
      .MuiDrawer-paper::-webkit-scrollbar {
        width: 1px;
        background: transparent;
      }

      .MuiDrawer-paper::-webkit-scrollbar-track {
        background: transparent;
      }

      .MuiDrawer-paper::-webkit-scrollbar-thumb {
        background: #888;
      }

      .MuiDrawer-paper::-webkit-scrollbar-thumb:hover {
        background: #666;
      }
    `,
);


const seedFloors = [
    23,
    24,
    36,
    39,
    47,
    48,
    49,
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

const LinkAvatar = ({ link, ...props }: AvatarProps & { link: string }) => {
    const location = useRouter();

    return <Avatar sx={theme => ({
        bgcolor: location.pathname !== '/' && link.includes(location.pathname)
            ? theme.palette.primary.light
            : theme.palette.grey[400],
    })} {...props} />;
};

const seedDrawerItem: DrawerItem = {
    category: {
        name: 'drawer.seed.longName',
        short: 'drawer.seed.shortName',
    },
    children:
        seedFloors.map(floor => ({
            key: `seed-${floor}`,
            title: `drawer.seed.${floor}.title`,
            subtitle: `drawer.seed.${floor}.shortDescription`,
            link: `/seed/${floor}`,
            icon: () => <LinkAvatar link={`/seed/${floor}`}>{floor}</LinkAvatar>,
        })),
};

const seedSimulatorDrawerItem: DrawerItem = {
    category: {
        name: 'drawer.seedSimulator.longName',
        short: 'drawer.seedSimulator.shortName',
    },
    children: [39, 49].map((floor) => (
        {
            key: `seed-${floor}-simulator`,
            title: `drawer.seedSimulator.${floor}.title`,
            subtitle: `drawer.seedSimulator.${floor}.shortDescription`,
            link: `/seed/${floor}/simulator`,
            icon: () => (
                <Badge variant={'dot'} color={'error'}>
                    <LinkAvatar link={`/seed/${floor}/simulator`}>{floor}</LinkAvatar>
                </Badge>
            ),
        }
    )),
};

const farmDrawerItem: DrawerItem =
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
                icon: (t: TFunction) => <LinkAvatar
                    link={'/farm/combine'}>{t('drawer.farm.combine.shortName').toString()}</LinkAvatar>,
            },
            {
                key: 'farm-info',
                title: 'drawer.farm.info.longName',
                link: '/farm/info',
                icon: (t: TFunction) => <LinkAvatar
                    link={'/farm/info'}>{t('drawer.farm.info.shortName').toString()}</LinkAvatar>,
            },
            {
                key: 'farm-bookmarks',
                title: 'drawer.farm.bookmark.longName',
                link: '/farm/bookmark',
                icon: () => <LinkAvatar link={'/farm/bookmark'}><StarRounded /></LinkAvatar>,
            },
        ],
    };

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
    const { i18n } = useTranslation();

    const DrawerContents = useCallback(() => <>
        <DrawerHeader />
        <Box sx={theme => ({ padding: theme.spacing(1), flex: 'auto' })}>
            <List>
                <DrawerItemList open={open} key={seedDrawerItem.category.name} item={seedDrawerItem} />
                {
                    i18n.resolvedLanguage === Locales.Korean &&
                    <DrawerItemList open={open} key={farmDrawerItem.category.name} item={farmDrawerItem} />
                }
                <DrawerItemList open={open} key={seedSimulatorDrawerItem.category.name}
                                item={seedSimulatorDrawerItem} />
            </List>
        </Box>
    </>, [open, i18n.resolvedLanguage]);

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