export interface Category {
    id: number;
    active: boolean;
    title: string;
    description: string;
    type: 'command' | 'routine' | 'function';
    creation_date: Date;
    sub_categories: Category[];
}