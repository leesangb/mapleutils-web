'use client';

import styled from 'styled-components';
import { ComponentType, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export type VirtualizedMasonryDataProps<T> = {
    data: T;
}
export type VirtualizedComponent<T> = ComponentType<VirtualizedMasonryDataProps<T>>

export interface VirtualizedMasonryProps<T> {
    data: T[];
    height: number | string;
    estimatedHeight: (data: T) => number;
    overScan: number;
    Component: VirtualizedComponent<T>;
    EmptyComponent?: ComponentType;
    getLanes: (width: number) => number;
    className?: string;
}

const VirtualizedMasonry = <T, >({
    data,
    height,
    Component,
    EmptyComponent,
    overScan,
    estimatedHeight,
    getLanes,
    className,
}: VirtualizedMasonryProps<T>) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const [lanes, setLanes] = useState(1);
    const [count, setCount] = useState(data.length);

    // overscan for ssr
    const [overscan, setOverscan] = useState(data.length);
    useEffect(() => {
        setOverscan(overScan);
    }, [overScan]);

    // hack to force a re-calculating of the virtualizer
    useLayoutEffect(() => {
        setCount(0);
    }, []);

    const rowVirtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: i => estimatedHeight(data[i]),
        overscan,
        lanes: lanes,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = parentRef.current?.clientWidth;
            if (!width) {
                return;
            }
            const lanes = getLanes(width);
            if (lanes !== rowVirtualizer.options.lanes) {
                setLanes(lanes);
                // some hack to force a re-calculating of the virtualizer
                setCount(0);
            }
            setTimeout(() => {
                setCount(data.length);
            }, 0);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data.length, getLanes]);

    const laneWidth = 100 / lanes;

    const virtualItems = rowVirtualizer.getVirtualItems();
    return (
        <Container ref={parentRef} style={{ height }} className={className}>
            {
                data.length === 0 && EmptyComponent
                    ? <EmptyComponent />
                    : <Content style={{ height: rowVirtualizer.getTotalSize() }}>
                        {virtualItems.filter(({ index }) => data[index]).map((virtualRow) => {
                            const rowData = data[virtualRow.index];
                            return (
                                <CellWrapper key={virtualRow.key}
                                    ref={rowVirtualizer.measureElement}
                                    style={{
                                        left: `${virtualRow.lane * laneWidth}%`,
                                        width: `${laneWidth}%`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                    data-index={virtualRow.index}>
                                    <Component key={virtualRow.key} data={rowData} />
                                </CellWrapper>
                            );
                        })}
                    </Content>
            }
        </Container>
    );
};

const Container = styled.div`
  display: block;
  width: 100%;
  overflow-y: auto;
  contain: strict;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
`;

const CellWrapper = styled.div`
  position: absolute;
  top: 0;
`;

export default VirtualizedMasonry;
