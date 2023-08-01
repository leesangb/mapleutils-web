import styled from 'styled-components';
import { HTMLAttributes, PropsWithChildren, useCallback, useState } from 'react';

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
}

export const Collapse = ({ open, children, ...rest }: PropsWithChildren<CollapseProps>) => {
    const [height, setHeight] = useState(0);
    const callbackRef = useCallback((node: HTMLDivElement) => {
        if (node) {
            setHeight(node.scrollHeight);
        }
    }, []);

    return (
        <Container ref={callbackRef} style={{ height: !open ? 0 : height }} {...rest}>
            {children}
        </Container>
    );
};

const Container = styled.div`
  will-change: height;
  overflow: hidden;
  transition: height 325ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
`;
