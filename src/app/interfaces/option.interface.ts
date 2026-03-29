export interface Option {
    id: number;
    
    title: string;
    description: string;
    category: number[];
    level: number;
    combinable: boolean;
    standalone: boolean;
    overwrite: boolean;
    value: string;

    active: boolean;
    created_at: Date;
    updated_at: Date;
}