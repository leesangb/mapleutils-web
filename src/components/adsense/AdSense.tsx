'use client';

import { ADSENSE_ID } from './lib/gtag';
import { CSSProperties, useEffect } from 'react';
import { isProduction } from '@/utils/helper';
import { useIsMounted } from '@/hooks/useIsMounted';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

export const AdSenseSlot = {
    NavigationBottom: '1801603735',
    TopContent: '2636721997',
    RightContent: '3362097413',
    NavigationTop: '7979999272',
};

interface AdSenseProps {
    slot: string;
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

const Ins = styled.ins<TransientProps<InsProps>>`
  display: block;
  ${({ $dimensions }) => $dimensions}
`;

const AdSense = ({ slot, format, responsive, width, height }: AdSenseProps) => {
    const dimensions = isNaN(width) || isNaN(height) ? undefined : { width: `${width}px`, height: `${height}px` };
    const pathname = usePathname();
    const isMounted = useIsMounted();

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error(e);
        }
    }, [pathname]);

    return isMounted ? (
        <Ins className='adsbygoogle'
            key={pathname}
            $dimensions={dimensions}
            data-ad-client={ADSENSE_ID}
            data-ad-slot={slot}
            data-ad-format={format}
            data-adtest={isProduction ? 'off' : 'on'}
            data-full-width-responsive={responsive} />
    ) : null;
};

export default AdSense;
