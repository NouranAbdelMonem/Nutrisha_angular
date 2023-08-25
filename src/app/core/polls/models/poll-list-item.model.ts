export interface PollListItemModel {
    id: string;
    subject: string;
    backgroundColor: string;
    answersCount: number;
    answers: {
        id: number,
        content: string,
        selectedCount: number,
    }[]
}
