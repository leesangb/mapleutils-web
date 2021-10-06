import {
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    PaletteMode,
    Popover,
    Theme,
    Tooltip,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import DarkModeIcon from '@mui/icons-material/Brightness4Rounded';
import LightModeIcon from '@mui/icons-material/Brightness7Rounded';
import { useStore } from '@/stores/StoreContext';
import { SxProps } from '@mui/system';
import { observer } from 'mobx-react';

interface SettingsButtonProps {
    toggleDarkMode: () => void;
}

const themeIconAndLabel: Record<PaletteMode, { label: string; icon: ReactNode }> = {
    dark: {
        label: '다크 모드',
        icon: <DarkModeIcon />,
    },
    light: {
        label: '라이트 모드',
        icon: <LightModeIcon />,
    },
};

const styles: Record<string, SxProps<Theme>> = {
    listButton: {
        borderRadius: '22px',
    },
};

const SettingsButton = observer((props: SettingsButtonProps) => {
    const { app } = useStore();
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

    const toggleAnimation = () => {
        app.changeAnimation(!app.preference.animation);
        window.location.reload();
    };

    return (
        <>
            <Tooltip title='설정'>
                <IconButton aria-describedby={id} onClick={handleClick}>
                    <SettingsRoundedIcon />
                </IconButton>
            </Tooltip>
            <Popover
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
                            <ListItemText>{theme.label}</ListItemText>
                        </ListItem>
                        <ListItem button onClick={toggleAnimation}>
                            <ListItemIcon>
                                {app.preference.animation ? <PlayArrowRoundedIcon /> : <StopRoundedIcon />}
                            </ListItemIcon>
                            <ListItemText>애니메이션 : {app.preference.animation ? '켜짐' : '꺼짐'}</ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
            </Popover>
        </>
    );
});

export default SettingsButton;
