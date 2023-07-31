'use client';

import { ADSENSE_ID } from './lib/gtag';
import { useEffect } from 'react';
import { isProduction } from '@/utils/helper';
import { useIsMounted } from '@/hooks/useIsMounted';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

export const AdSenseSlotMapping = {
    AdTop: '4522479880',
    AdLeft: '8816948118',
    AdRight: '3345716315',
} as const;

type AdSenseSlot = keyof typeof AdSenseSlotMapping;

interface AdSenseProps {
    slot: AdSenseSlot;
}

const Ins = styled.ins`
  display: block;
  width: 100%;
`;

const AdSense = ({ slot }: AdSenseProps) => {
    const pathname = usePathname();
    const isMounted = useIsMounted();

    useEffect(() => {
        if (!isMounted) return;
        try {
            window.adsbygoogle.push({});
        } catch (e) {
            setTimeout(() => {
                try {
                    window.adsbygoogle.push({});
                } catch (e) {
                    console.error(e);
                }
            }, 2000);
            // console.error(e);
        }
    }, [isMounted, pathname]);

    return isMounted ? (
        <Ins className='adsbygoogle'
            key={pathname}
            data-ad-client={ADSENSE_ID}
            data-ad-slot={AdSenseSlotMapping[slot]}
            data-ad-format={'auto'}
            data-adtest={isProduction ? 'off' : 'on'}
            data-full-width-responsive={true} />
    ) : null;
};

export default AdSense;
