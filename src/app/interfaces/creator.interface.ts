export interface Creator {
    id: number;
    
    firstName: string;
    lastName: string;
    email: string;

    active: boolean;
    created_at: Date;
    updated_at: Date;
}