export interface Option {
    id: number;
    
    title: string;
    description: string;
    level: number;
    combinable: boolean;
    standalone: boolean;
    value: string;

    active: boolean;
    created_at: Date;
    updated_at: Date;
}