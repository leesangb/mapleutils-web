'use client';
import { PropsWithChildren } from 'react';
import { BottomFloatingBar } from '@/ds/surfaces/bar/BottomFloatingBar';
import { Button } from '@/ds/inputs';
import { I18nPageProps } from '@/i18n/settings';
import { usePathname } from 'next/navigation';

const Layout = ({ children, params: { lng } }: PropsWithChildren<I18nPageProps>) => {
    const pathname = usePathname();
    return (
        <>
            {children}
            <BottomFloatingBar>
                {
                    [22, 23, 24, 36, 39, 42, 47, 48, 49].map((f) => (
                        <Button lang={lng} href={`/seed/${f}`} key={f} active={pathname.includes(`/seed/${f}`)}>
                            {f}
                        </Button>
                    ))
                }
            </BottomFloatingBar>
        </>
    );
};

export default Layout;
