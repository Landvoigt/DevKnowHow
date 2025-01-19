export interface Command {
    id: number;
    active: boolean;
    command: string;
    description: string;
    category: string;
    sub_category: string;
    example: string;
    tooltip: string;
    copy_count: number;
}