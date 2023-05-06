import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
// @ts-ignore
import { theme } from '@/ds/theme';
// @ts-ignore
import GlobalStyle from '@/ds/global.style';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { ThemeProvider } from 'styled-components';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: { disable: true },
    },
    decorators: [
        withThemeFromJSXProvider({
            GlobalStyles: GlobalStyle,
        }),
        (Story, context) => {
            useEffect(() => {
                const storybook = document.querySelector('html');
                storybook.setAttribute('data-theme', context.globals.theme);
                storybook.style.background = theme.background;

                const docs = document.querySelector<HTMLDivElement>('#storybook-docs .sbdocs-wrapper');
                if (docs) {
                    docs.style.color = theme.text.primary;
                    docs.style.background = theme.background;

                    const tableHead = docs.querySelectorAll<HTMLElement>('.sbdocs-wrapper > table > thead > tr > th');
                    tableHead.forEach(th => th.style.color = theme.text.primary);

                    const h1 = docs.querySelectorAll<HTMLElement>('.sbdocs-wrapper > h1');
                    h1.forEach(h => h.style.color = theme.text.primary);

                    const h2 = docs.querySelectorAll<HTMLElement>('.sbdocs-wrapper > h2');
                    h2.forEach(h => h.style.color = theme.text.secondary);

                    const h3 = docs.querySelectorAll<HTMLElement>('.sbdocs-wrapper > h3');
                    h3.forEach(h => h.style.color = theme.text.secondary);

                    const docsPreview = docs.querySelectorAll<HTMLElement>('.sbdocs-preview .docs-story');
                    docsPreview.forEach((docPreview) => {
                        docPreview.style.background = theme.background;
                        docPreview.style.color = theme.text.primary;
                    });
                }
            }, [context.globals.theme]);

            return (
                <ThemeProvider theme={theme}>
                    <Story />
                </ThemeProvider>
            );
        },
    ],
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Theme',
            defaultValue: 'light',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'light', title: 'light' },
                    { value: 'dark', title: 'dark' },
                ],
            },
        },
    },
};

export default preview;
