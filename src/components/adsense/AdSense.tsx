import { ADSENSE_ID } from './lib/gtag';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect } from 'react';
import { Box, styled } from '@mui/system';
import { isProduction } from '@tools/helper';

export enum AdSenseSlot {
    NavigationBottom = '1801603735',
    TopContent = '2636721997',
    RightContent = '3362097413',
    NavigationTop = '7979999272',
}

interface AdSenseProps {
    slot: AdSenseSlot;
    format: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    responsive: boolean;
    containerStyle?: CSSProperties;
    style?: CSSProperties;
    width: number;
    height: number;
    fixed: boolean;
}


interface InsProps {
    dimensions?: { width: string, height: string };
}

const Ins = styled('ins')((props: InsProps) => ({
    display: 'block',
    ...(props.dimensions || {}),
}));

const AdSense = ({ slot, format, responsive, containerStyle, width, height, fixed }: AdSenseProps) => {
    const dimensions = isNaN(width) || isNaN(height) ? undefined : { width: `${width}px`, height: `${height}px` };
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log(e);
            }
        }
    }, [router.pathname]);

    return (
        <Box key={router.pathname} sx={theme => ({
            margin: theme.spacing(4),
            border: !isProduction ? 'solid 1px red' : undefined,
            overflow: 'hidden',
            display: 'block',
            minWidth: '100px',
            ...dimensions,
            ...containerStyle,
            ...(fixed ? { position: 'fixed' } : {}),
        })}>
            <Ins className='adsbygoogle'
                 dimensions={dimensions}
                 data-ad-client={ADSENSE_ID}
                 data-ad-slot={slot}
                 data-ad-format={format}
                 data-adtest={isProduction ? 'off' : 'on'}
                 data-full-width-responsive={responsive} />
        </Box>
    );
};

AdSense.defaultProps = {
    responsive: false,
    format: 'auto',
    width: NaN,
    height: NaN,
    fixed: false,
};

export default AdSense;
