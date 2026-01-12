import { Category } from "./category.interface";
import { Option } from "./option.interface";

export interface Command {
    id: number;

    title: string;
    category: Category[];
    description: string;
    example: string;
    tooltip: string;
    option: Option[];
    alternative: Command[];
    copy_count: number;

    active: boolean;
    created_at: Date;
    updated_at: Date;
}