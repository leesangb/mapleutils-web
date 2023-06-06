export const BreakpointMap = {
    xs: 480,
    sm: 720,
    md: 960,
    lg: 1280,
    xl: 1920,
} as const;

export type ThemeBreakpoint = keyof typeof BreakpointMap;

export const media = {
    max: <S extends ThemeBreakpoint>(size: S): `@media (max-width: ${typeof BreakpointMap[S]}px)` => `@media (max-width: ${BreakpointMap[size]}px)`,
    min: <S extends ThemeBreakpoint>(size: S): `@media (min-width: ${typeof BreakpointMap[S]}px)` => `@media (min-width: ${BreakpointMap[size]}px)`,
    mobile: `@media (max-width: ${BreakpointMap.xs}px)`,
};
