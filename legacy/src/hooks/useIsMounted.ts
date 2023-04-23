import { useEffect, useState } from 'react';

export const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted;
}
