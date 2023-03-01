import { ADSENSE_ID } from './lib/gtag';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect } from 'react';
import { Box, styled } from '@mui/system';
import { isProduction } from '@tools/helper';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { useIsMounted } from '@hooks/useIsMounted';

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
    const { width: windowWidth } = useWindowDimensions();
    const isMounted = useIsMounted();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log(e);
            }
        }
    }, [router.pathname]);

    return isMounted ? (
        <Box key={router.pathname} sx={theme => ({
            margin: theme.breakpoints.down('lg') ? theme.spacing(1) : theme.spacing(4),
            border: !isProduction ? 'solid 1px red' : undefined,
            overflow: 'hidden',
            display: 'block',
            //minWidth: '100px',
            maxWidth: `${windowWidth - 32}px`,
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
    ) : null;
};

AdSense.defaultProps = {
    responsive: false,
    format: 'auto',
    width: NaN,
    height: NaN,
    fixed: false,
};

export default AdSense;
