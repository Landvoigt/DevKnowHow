import { Category } from "./category.interface";

export interface Routine {
    id: number;

    title: string;
    routine: string;
    category: Category[];
    example: string;
    tooltip: string;
    alternatives: Routine[];
    copy_count: number;

    active: boolean;
    created_at: Date;
    updated_at: Date;
}