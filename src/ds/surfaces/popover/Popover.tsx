import styled, { css } from 'styled-components';
import { CSSProperties, PropsWithChildren, useEffect, useId, useRef, useState } from 'react';
import { Button, ButtonProps } from '@/ds/inputs';
import { keyframes } from '@/ds';
import { Tooltip, TooltipProps } from '@/ds/displays';

type Alignment = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface PopoverProps {
    style?: CSSProperties;
    className?: string;
    buttonProps: ButtonProps;
    tooltipProps?: TooltipProps;
    alignment?: Alignment;
    panelProps?: {
        style?: CSSProperties;
        className?: string;
    };
    fadeMs?: number;
}

export const Popover = ({
    style,
    className,
    buttonProps,
    tooltipProps,
    children,
    panelProps,
    alignment = 'bottom-right',
    fadeMs = 125,
}: PropsWithChildren<PopoverProps>) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        if (open) {
            let timeoutId: ReturnType<typeof setTimeout>;
            const clickAway = (e: MouseEvent) => {
                if (!(e.target as HTMLElement).closest(`[data-popover="${id}"]`)) {
                    if (ref.current) {
                        ref.current.style.opacity = '0';
                    }
                    timeoutId = setTimeout(() => {
                        setOpen(false);
                    }, fadeMs);
                }
            };
            window.addEventListener('click', clickAway);
            return () => {
                window.removeEventListener('click', clickAway);
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        }
    }, [open, id]);

    return (
        <Container style={style} className={className}>
            <Tooltip title={''} {...tooltipProps}>
                <Button {...buttonProps} onClick={() => setOpen(!open)} data-popover={id} />
            </Tooltip>
            {open && (
                <PanelContainer ref={ref} $fadeMs={fadeMs} $alignment={alignment} {...panelProps} data-popover={id}>
                    {children}
                </PanelContainer>
            )}
        </Container>
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
  animation: ${keyframes.fadeIn} ${({ $fadeMs }) => $fadeMs}ms ease-in-out;
  min-width: 120px;
  width: fit-content;
  transition: opacity ${({ $fadeMs }) => $fadeMs}ms ease-in-out;
`;
