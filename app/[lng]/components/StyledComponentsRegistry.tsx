'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import { theme } from '@/ds/theme';

export default function StyledComponentsRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    // Only create stylesheet once with lazy initial state
    // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    return (typeof window !== 'undefined')
        ? (
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ) : (
            <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
                <ThemeProvider theme={theme}>
                    {children as React.ReactChild}
                </ThemeProvider>
            </StyleSheetManager>
        );
}
