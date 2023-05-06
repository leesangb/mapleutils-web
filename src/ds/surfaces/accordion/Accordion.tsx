import styled from 'styled-components';
import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

interface AccordionProps {
    title: string | ReactNode;
    defaultOpen?: boolean;
}

const expanded = '--_expanded_height';
const collapsed = '--_collapsed_height';

export const Accordion = ({ title, defaultOpen, children }: PropsWithChildren<AccordionProps>) => {
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
            <Accordion.Summary>
                {title}
            </Accordion.Summary>
            <Accordion.Content>
                {children}
            </Accordion.Content>
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

    & > summary > svg {
      transform: rotate(180deg);
    }
  }
`;

const AccordionSummary = ({ children }: PropsWithChildren) => {
    return (
        <Summary>
            {children}
            <RiArrowDownSLine />
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

  &:hover {
    background-color: ${({ theme }) => theme.surface.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.surface.active};
  }

  & > svg {
    position: absolute;
    right: 8px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    transition: transform 0.325s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  }
`;

Accordion.Summary = AccordionSummary;
Accordion.Content = styled.div`
  padding: 8px;
`;
