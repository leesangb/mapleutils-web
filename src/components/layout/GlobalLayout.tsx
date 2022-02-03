import { Box } from '@mui/system';
import Drawer from '@components/drawer/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import { ReactNode, useCallback, useState } from 'react';
import Header from '@components/header/Header';
import { PaletteMode, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdSense, { AdSenseSlot } from '@components/adsense/AdSense';

interface GlobalLayoutProps {
    children: ReactNode;
    themeType: PaletteMode;
    toggleDarkMode: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
                        <AdSense slot={AdSenseSlot.LeftMenu} responsive width={250} height={600} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default GlobalLayout;