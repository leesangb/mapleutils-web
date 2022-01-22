export interface QuestionAnswer {
    question: string;
    choices: [string, string, string, string];
    answer: 0 | 1 | 2 | 3;
}