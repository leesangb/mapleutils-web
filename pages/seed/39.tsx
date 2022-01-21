import data from '@data/seed/39.json';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

interface QuestionAnswer {
    question: string;
    choices: [string, string, string, string];
    answer: 0 | 1 | 2 | 3;
}

interface Seed39Props {
    data: QuestionAnswer[];
}

interface QuestionAnswerItemProps {
    qa: QuestionAnswer;
}

const QuestionAnswerItem = (props: QuestionAnswerItemProps) => {
    const { question, answer, choices } = props.qa;
    const theme = useTheme();

    return (
        <Grid container alignItems='center' spacing={1}>
            <Grid item xs={12} sm={12} md={4}>
                <Typography>{question}</Typography>
            </Grid>
            {
                choices.map((choice, i) => (
                    <Grid item xs={12} sm={12} md={2} key={`${choice}-${answer}`}>
                        <Card elevation={0} variant={answer === i ? 'outlined' : undefined}>
                            <Typography variant={'body2'}>{i + 1}. {choice}</Typography>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

const Seed39 = (props: Seed39Props) => {
    return (
        <Card>
            <CardContent>
                {
                    props.data.map((d, i) => <QuestionAnswerItem qa={d} key={i} />)
                }
            </CardContent>
        </Card>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            data: data.sort((a, b) => a.question.localeCompare(b.question)),
        },
    };
};

export default Seed39;