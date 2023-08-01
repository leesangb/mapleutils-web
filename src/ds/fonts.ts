export const pretendardCss = [
    {
        src: 'Pretendard-Light.subset.woff2',
        weight: '300',
        style: 'light',
    },
    {
        src: 'Pretendard-Regular.subset.woff2',
        weight: '400',
        style: 'normal',
    },
    {
        src: 'Pretendard-Medium.subset.woff2',
        weight: '500',
        style: 'medium',
    },
    {
        src: 'Pretendard-Bold.subset.woff2',
        weight: '700',
        style: 'bold',
    },
    {
        src: 'Pretendard-Black.subset.woff2',
        weight: '900',
        style: 'black',
    },
].map(
    font => `@font-face {
    font-family: 'Pretendard';
    font-weight: ${font.weight};
    font-style: ${font.style};
    src: url('/fonts/${font.src}') format('woff2');
    font-display: swap;
  }`,
).join('\n');
