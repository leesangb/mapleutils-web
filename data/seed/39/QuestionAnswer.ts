export interface QuestionAnswer {
    question: string;
    // [string, string, string, string]
    choices: string[];
    // 0 | 1 | 2 | 3
    answer: number;
}
