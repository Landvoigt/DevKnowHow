import { Command } from "./command.interface";

export interface Category {
    id: number;

    title: string;
    description: string;
    type: 'command' | 'routine' | 'function';

    active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CategoryDetail extends Category {
    commands: Command[];
}
