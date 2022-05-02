import {
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    PaletteMode,
    Popover,
    Tooltip,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DarkModeIcon from '@mui/icons-material/Brightness4Rounded';
import LightModeIcon from '@mui/icons-material/Brightness7Rounded';
import { useStore } from '@stores/StoreContext';
import { observer } from 'mobx-react';
import { useTranslation } from 'next-i18next';

interface SettingsButtonProps {
    toggleDarkMode: () => void;
}

const themeIconAndLabel: Record<PaletteMode, { label: string; icon: ReactNode }> = {
    dark: {
        label: 'darkMode',
        icon: <DarkModeIcon />,
    },
    light: {
        label: 'lightMode',
        icon: <LightModeIcon />,
    },
};

const SettingsButton = observer((props: SettingsButtonProps) => {
    const { app } = useStore();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const theme = themeIconAndLabel[app.preference.theme];

    return (
        <>
            <Tooltip title={t('settings')}>
                <IconButton aria-describedby={id} onClick={handleClick}>
                    <SettingsRoundedIcon />
                </IconButton>
            </Tooltip>
            <Popover
                PaperProps={{ variant: 'outlined', elevation: 0 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <CardContent>
                    <List>
                        <ListItem button onClick={props.toggleDarkMode}>
                            <ListItemIcon>{theme.icon}</ListItemIcon>
                            <ListItemText>{t(theme.label)}</ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
            </Popover>
        </>
    );
});

export default SettingsButton;
