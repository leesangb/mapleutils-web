import { MUIStyledCommonProps, styled, Theme } from '@mui/system';

interface CanvasProps {
    visible?: number;
}

const Canvas = styled('canvas')<CanvasProps>((props: MUIStyledCommonProps<Theme> & CanvasProps) =>
    props.visible ? ({
        width: '100%',
        height: 'auto',
        marginTop: props.theme?.spacing(2),
        borderRadius: props.theme?.shape.borderRadius,
    }) : ({
        position: 'absolute',
        top: '-9999px',
    }),
);

export default Canvas;