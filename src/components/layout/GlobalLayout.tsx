import { Box, useTheme } from '@mui/system';
import Drawer from '@components/drawer/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import Header from '@components/header/Header';
import { Hidden, PaletteMode, Stack, useMediaQuery } from '@mui/material';
import AdSense, { AdSenseSlot } from '@components/adsense/AdSense';
import Footer from '@components/footer/Footer';
import { useRouter } from 'next/router';

interface GlobalLayoutProps {
    children: ReactNode;
    themeType: PaletteMode;
    toggleDarkMode: () => void;
}

const GlobalLayout = (props: GlobalLayoutProps) => {
    const { children, themeType, toggleDarkMode } = props;
    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = useCallback(() => setOpen(!open), [open]);
    const { pathname } = useRouter();
    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Box display={'flex'}>
            <Header toggleOpen={toggleOpen}
                    themeType={themeType}
                    toggleDarkMode={toggleDarkMode} />
            <Drawer open={open} />
            <Box component={'main'} sx={{ flexGrow: 1, p: lgDown ? 1 : 3 }}>
                <DrawerHeader />
                {
                    lgDown
                        ? (
                            <>
                                <AdSense slot={AdSenseSlot.TopContent} responsive fixed={false} />
                                {children}
                                <Hidden mdUp>
                                    <Footer open />
                                </Hidden>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'unset', flexGrow: 1 }}>
                                    {children}
                                </Box>
                                <Stack alignItems={'center'}
                                       sx={theme => ({ marginLeft: theme.spacing(1), minWidth: '260px' })}>
                                    <AdSense slot={AdSenseSlot.RightContent} responsive width={250} height={600}
                                             fixed={true} />
                                </Stack>
                            </Box>
                        )
                }
            </Box>
        </Box>
    );
};

export default GlobalLayout;