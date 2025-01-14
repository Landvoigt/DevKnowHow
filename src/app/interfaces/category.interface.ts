export interface Category {
    id: number;
    active: boolean;
    title: string;
    description: string;
    creation_date: Date;
    sub_categories: Category[];
}