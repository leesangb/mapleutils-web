import styled, { css } from 'styled-components';
import { cloneElement, CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { keyframes } from '@/ds';
import usePopover from '@/ds/hooks/usePopover';
import { PopoverProvider } from '@/ds/surfaces/popover/PopoverProvider';

type Alignment = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface PopoverProps {
    style?: CSSProperties;
    className?: string;
    fadeMs?: number;
}

export const Popover = ({
    style,
    className,
    children,
    fadeMs = 125,
}: PropsWithChildren<PopoverProps>) => {
    return (
        <PopoverProvider fadeMs={fadeMs}>
            <Container style={style} className={className}>
                {children}
            </Container>
        </PopoverProvider>
    );
};

const Container = styled.div`
  position: relative;
`;

const AlignmentMap = {
    'bottom-right': css`
      top: 100%;
      right: 0;
      margin-top: 8px;
    `,
    'bottom-left': css`
      top: 100%;
      left: 0;
      margin-top: 8px;
    `,
    'top-right': css`
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
    `,
    'top-left': css`
      bottom: 100%;
      left: 0;
      margin-bottom: 8px;
    `,
};

const Trigger = ({ children }: {
    children: (options: { open: () => void, toggle: () => void, close: () => void, }) => ReactElement
}) => {
    const { setState, id, state } = usePopover();
    return cloneElement(children({
        open: () => setState('opened'),
        toggle: () => state === 'opened' ? setState('closing') : setState('opened'),
        close: () => setState('closing'),
    }), { ['data-popover']: id });
};

Popover.Trigger = Trigger;

interface PopoverContentProps {
    style?: CSSProperties;
    alignment?: Alignment;
    className?: string;
}

const Content = ({ children, alignment = 'bottom-right', ...props }: PropsWithChildren<PopoverContentProps>) => {
    const { state, fadeMs, id } = usePopover();
    return (
        <PanelContainer $fadeMs={fadeMs} $alignment={alignment} data-popover={id} {...props} data-popover-state={state}>
            {children}
        </PanelContainer>);
};

const PanelContainer = styled.div<TransientProps<{ alignment: Alignment, fadeMs: number }>>`
  position: absolute;
  ${({ $alignment }) => AlignmentMap[$alignment]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.surface.default};
  border: 1px solid ${({ theme }) => theme.contour};
  padding: 8px;
  z-index: ${({ theme }) => theme.zIndex.popover};
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: ${keyframes.fadeIn} ${({ $fadeMs }) => $fadeMs}ms ease-in-out;
  min-width: 120px;
  width: fit-content;
  transition: opacity ${({ $fadeMs }) => $fadeMs}ms ease-in-out;

  &[data-popover-state='closing'] {
    opacity: 0;
  }

  &[data-popover-state='closed'] {
    display: none;
  }
`;

Popover.Content = Content;
