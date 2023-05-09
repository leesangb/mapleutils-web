'use client';

import styled from 'styled-components';
import { ComponentType, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export type VirtualizedRowProps<T> = {
    rowData: T;
    measureRef?: (node: (Element | null)) => void;
}
export type VirtualizedRowComponent<T> = ComponentType<VirtualizedRowProps<T>>

export interface VirtualizedTableProps<T> {
    data: T[];
    height: number | string;
    estimatedRowHeight: (index: number) => number;
    overScan: number;
    RowComponent: VirtualizedRowComponent<T>;
    EmptyComponent?: ComponentType;
}

const VirtualizedTable = <T, >({
    data,
    height,
    RowComponent,
    EmptyComponent,
    overScan,
    estimatedRowHeight,
}: VirtualizedTableProps<T>) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: estimatedRowHeight,
        overscan: overScan,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    return (
        <Container ref={parentRef} style={{ height }}>
            {
                data.length === 0 && EmptyComponent
                    ? <EmptyComponent />
                    : <Table style={{ height: rowVirtualizer.getTotalSize() }}>
                        <Tbody style={{ transform: `translateY(${virtualItems[0]?.start}px)` }}>
                            {virtualItems.map((virtualRow) => {
                                const rowData = data[virtualRow.index];
                                return (
                                    <RowComponent key={virtualRow.key}
                                        measureRef={rowVirtualizer.measureElement}
                                        data-index={virtualRow.index} rowData={rowData} />);
                            })}
                        </Tbody>
                    </Table>
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

const Table = styled.table`
  display: block;
  width: 100%;
  position: relative;
`;

const Tbody = styled.tbody`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export default VirtualizedTable;
