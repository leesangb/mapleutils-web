import { Box } from '@mui/system';
import Drawer from '@components/drawer/Drawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import { ReactNode, useCallback, useState } from 'react';
import Header from '@components/header/Header';
import { PaletteMode } from '@mui/material';

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
            <Header open={open}
                    toggleOpen={toggleOpen}
                    themeType={themeType}
                    toggleDarkMode={toggleDarkMode} />
            <Drawer open={open} />
            <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
};

export default GlobalLayout;