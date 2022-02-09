import { Avatar, Chip, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { MonsterLifeGrade } from '@data/farm/monsterLifeGrade';
import { blue, green, orange, purple, red, yellow } from '@mui/material/colors';
import { MonsterLifeCategory } from '@data/farm/monsterLifeCategory';

const styles: Record<MonsterLifeGrade, SxProps<Theme>> = {
    ['C']: () => ({}),
    ['B']: (theme) => ({
        color: `${theme.palette.getContrastText(orange[500])} !important`,
        backgroundColor: orange[500],
    }),
    ['B+']: (theme) => ({
        color: `${theme.palette.getContrastText(green[500])} !important`,
        backgroundColor: green[500],
    }),
    ['A']: (theme) => ({
        color: `${theme.palette.getContrastText(blue[500])} !important`,
        backgroundColor: blue[500],
    }),
    ['A+']: (theme) => ({
        color: `${theme.palette.getContrastText(red[500])} !important`,
        backgroundColor: red[500],
    }),
    ['S']: (theme) => ({
        color: `${theme.palette.getContrastText(purple[500])} !important`,
        backgroundColor: purple[500],
    }),
    ['SS']: (theme) => ({
        color: `${theme.palette.getContrastText(yellow[500])} !important`,
        backgroundColor: yellow[500],
    }),
};

interface GradeChipProps {
    grade: MonsterLifeGrade;
    category: MonsterLifeCategory;
}

const GradeChip = ({ grade, category }: GradeChipProps) => {
    return (
        <Chip
            size={'small'}
            avatar={<Avatar sx={styles[grade]}>{grade}</Avatar>}
            label={category}
        />
    );
};

export default GradeChip;
