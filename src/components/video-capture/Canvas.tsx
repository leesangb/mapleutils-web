import { MUIStyledCommonProps, styled, Theme } from '@mui/system';

interface CanvasProps {
    isVisible: boolean;
}

const Canvas = styled('canvas')((props: MUIStyledCommonProps<Theme> & CanvasProps) =>
    props.isVisible ? ({
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