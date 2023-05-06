import styled from 'styled-components';
import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/all';

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

        const details = detailsRef.current;

        // get height when expanded
        details.open = true;
        const expandedHeight = details.getBoundingClientRect().height - 2;
        details.style.setProperty(expanded, `${expandedHeight}px`);

        // get height when collapsed
        details.open = false;
        const collapsedHeight = details.getBoundingClientRect().height - 2;
        details.style.setProperty(collapsed, `${collapsedHeight}px`);
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
    return <Summary>
        {children}
        <RiArrowDownSLine />
    </Summary>;
};

const Summary = styled.summary`
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

AccordionSummary.Icon = styled.span`
  position: absolute;
  right: 8px;
  display: inline-block;
`;

Accordion.Content = styled.div`
  padding: 8px;
`;
