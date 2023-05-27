type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SizeMap = {
    xs: 480,
    sm: 720,
    md: 960,
    lg: 1280,
    xl: 1920,
} as const;

export const media = {
    max: <S extends Size>(size: S): `@media (max-width: ${typeof SizeMap[S]}px)` => `@media (max-width: ${SizeMap[size]}px)`,
    min: <S extends Size>(size: S): `@media (min-width: ${typeof SizeMap[S]}px)` => `@media (min-width: ${SizeMap[size]}px)`,
    mobile: `@media (max-width: ${SizeMap.xs}px)`,
};
