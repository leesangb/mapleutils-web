'use client';
import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';

export const QueryClientProvider = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { retry: 1, retryDelay: 1_000 } } }),
    );

    return (
        <_QueryClientProvider client={queryClient}>
            {children}
        </_QueryClientProvider>
    );
};
