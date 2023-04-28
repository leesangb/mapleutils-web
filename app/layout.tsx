import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='ko'>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
