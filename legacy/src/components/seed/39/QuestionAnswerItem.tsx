import { QuestionAnswer } from '@data/seed/39';
import { Card, CardContent, Grid, Typography } from '@mui/material';


interface QuestionAnswerItemProps extends QuestionAnswer {
}

const QuestionAnswerItem = (props: QuestionAnswerItemProps) => {
    const { question, answer, choices } = props;
    return (
        <Grid container alignItems='center' spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
                <Typography variant={'body1'}>{question}</Typography>
            </Grid>
            {
                choices.map((choice, i) => (
                    <Grid item xs={12} sm={12} md={3} lg={2} key={`${choice}-${answer}`}>
                        <Card sx={theme => ({
                            bgcolor: answer === i
                                ? theme.palette.primary.light
                                : theme.palette.background.default,
                            color: answer === i
                                ? theme.palette.getContrastText(theme.palette.primary.light)
                                : theme.palette.getContrastText(theme.palette.background.default),
                        })}
                              elevation={0}>
                            <CardContent sx={(theme) => ({ padding: theme.spacing(1.5) })}>
                                <Typography variant={'subtitle2'}>{i + 1}. {choice}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default QuestionAnswerItem;