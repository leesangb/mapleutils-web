export const isClientSide =
    typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof localStorage !== 'undefined';

export const isServerSide = !isClientSide;

export const isIOS = isClientSide && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const isMobile =
    isClientSide && /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
