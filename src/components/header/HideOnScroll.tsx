import { Slide, useScrollTrigger } from '@mui/material';

interface HideOnScrollProps {
    children: React.ReactElement;
}

const HideOnScroll = (props: HideOnScrollProps) => {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {props.children}
        </Slide>
    );
};

export default HideOnScroll;