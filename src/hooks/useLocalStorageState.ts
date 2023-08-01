import { useEffect, useState } from 'react';

export const useLocalStorageState = <T>(key: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(defaultValue);

    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            const item = window.localStorage.getItem(key);
            setStoredValue(item ? JSON.parse(item) as T : defaultValue);
        } catch (error) {
            console.log(error);
            setStoredValue(defaultValue);
        }
    }, []);

    return [storedValue, setValue] as const;
};
