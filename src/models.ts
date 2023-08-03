export interface NoteProps {
    id?: number;
    name: string;
    createdAt: string;
    category: string;
    content: string;
    dates: string[];
    archived: boolean;
}

export interface CategorySummaryProps {
    name: string;
    active: number;
    archived: number;
}
