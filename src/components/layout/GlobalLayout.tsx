import { Box } from '@mui/system';
import Drawer from '@components/drawer/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import { ReactNode, useCallback, useState } from 'react';
import Header from '@components/header/Header';
import { PaletteMode, Stack } from '@mui/material';
import AdSense, { AdSenseSlot } from '@components/adsense/AdSense';

interface GlobalLayoutProps {
    children: ReactNode;
    themeType: PaletteMode;
    toggleDarkMode: () => void;
}

const GlobalLayout = (props: GlobalLayoutProps) => {
    const { children, themeType, toggleDarkMode } = props;
    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = useCallback(() => setOpen(!open), [open]);

    return (
        <Box display={'flex'}>
            <Header toggleOpen={toggleOpen}
                    themeType={themeType}
                    toggleDarkMode={toggleDarkMode} />
            <Drawer open={open} />
            <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'unset', flexGrow: 1 }}>
                        {children}
                    </Box>
                    <Stack alignItems={'center'} sx={theme => ({ marginLeft: theme.spacing(1), minWidth: '260px' })}>
                        <AdSense slot={AdSenseSlot.RightContent} responsive width={250} height={600} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default GlobalLayout;