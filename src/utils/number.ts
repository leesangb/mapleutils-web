export const minmax = (min: number, max: number, value: number) => Math.max(Math.min(value, max), min);
export const toMinuteSecond = (seconds: number): string => new Date(seconds * 1000).toISOString().substring(14, 19);
