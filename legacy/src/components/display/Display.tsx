import { PropsWithChildren } from 'react';

interface DisplayProps {
    when: boolean;
}

const Display = ({ when, children }: PropsWithChildren<DisplayProps>) => {
    return when
        ? <>{children}</>
        : null;
};

export default Display;