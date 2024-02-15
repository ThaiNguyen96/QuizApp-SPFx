import { IChoiceGroupOption } from "@fluentui/react";
export interface IQuizzAppProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
}
export interface QuizQuestion {
    id: number;
    question: string;
    type: 'multipleChoice' | 'freeText';
    options?: IChoiceGroupOption[];
    answer?: '';
}
export interface User {
    name: string;
    address: string;
    responses: Record<string, string>;
}
//# sourceMappingURL=IQuizzAppProps.d.ts.map