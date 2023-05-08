import styled from 'styled-components';
import { ComponentProps, PropsWithChildren, useEffect, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Box } from '@/ds/displays';

interface AccordionProps {
    defaultOpen?: boolean;
}

const expanded = '--_expanded_height';
const collapsed = '--_collapsed_height';

export const Accordion = ({ defaultOpen = false, children }: PropsWithChildren<AccordionProps>) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        if (!detailsRef.current)
            return;

        let currentWidth = -1;
        const computedStyle = window.getComputedStyle(detailsRef.current);
        const detailsBorderOffset = parseInt(computedStyle.borderTopWidth) + parseInt(computedStyle.borderBottomWidth);

        const getHeight = (details: HTMLDetailsElement, open: boolean) => {
            const opened = details.open;
            details.open = open;
            const { height } = details.getBoundingClientRect();
            details.open = opened;
            return height - detailsBorderOffset;
        };

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const details = entry.target as HTMLDetailsElement;
                const { width } = details.getBoundingClientRect();

                if (currentWidth !== width) {
                    currentWidth = width;
                    details.removeAttribute('style');
                    details.style.setProperty(collapsed, `${getHeight(details, false)}px`);
                    details.style.setProperty(expanded, `${getHeight(details, true)}px`);
                }
            });
        });

        resizeObserver.observe(detailsRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Accordion.Details ref={detailsRef} open={defaultOpen}>
            {children}
        </Accordion.Details>
    );
};

Accordion.Details = styled.details`
  height: var(${collapsed});
  overflow: hidden;
  transition: height 325ms cubic-bezier(0.4, 0.01, 0.165, 0.99);
  cursor: auto;
  border: 1px solid ${({ theme }) => theme.contour};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.surface.default};

  &[open] {
    height: var(${expanded});

    & > summary > svg:last-of-type {
      transform: rotate(180deg);
    }
  }
`;

export const AccordionSummary = ({ children }: PropsWithChildren) => {
    return (
        <Summary>
            {children}
            <RiArrowDownSLine fontSize={'20px'} />
        </Summary>
    );
};

const Summary = styled.summary`
  height: calc(var(${collapsed}) - 16px);
  min-height: 18px;
  position: relative;
  padding: 8px;
  cursor: pointer;
  transition: all 0.325s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.surface.active};
  }

  & > svg:last-of-type {
    position: absolute;
    right: 8px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    transition: transform 0.325s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  }
`;

export const AccordionContent = ({ styles, ...props }: ComponentProps<typeof Box>) => {
    return <Box styles={[{ padding: '8px' }, styles]} {...props} />;
};
