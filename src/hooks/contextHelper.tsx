import { createContext, useContext } from 'react';

export const createGenericContext = <T extends unknown>() => {
    const genericContext = createContext<T | undefined>(undefined);

    const useGenericContext = () => {
        const context = useContext(genericContext);
        if (!context) {
            throw new Error('useContext must be uses within a Provider');
        }

        return context;
    };

    return [useGenericContext, genericContext.Provider] as const;
};
