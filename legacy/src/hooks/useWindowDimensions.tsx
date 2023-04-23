import { useEffect, useState } from 'react';

const getWindowDimensions = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 1920,
        height: 1080,
    });

    useEffect(() => {
        setWindowDimensions(getWindowDimensions());
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
