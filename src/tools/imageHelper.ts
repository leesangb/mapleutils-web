export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', e => resolve(e.target as HTMLImageElement));
        img.addEventListener('error', reject);
        img.src = src;
    });
};
