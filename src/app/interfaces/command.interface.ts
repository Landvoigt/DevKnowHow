export interface Command {
    id: number;
    command: string;
    description: string;
    category: string;
    sub_category: string;
    active: boolean;
    example: string;
    tooltip: string;
}