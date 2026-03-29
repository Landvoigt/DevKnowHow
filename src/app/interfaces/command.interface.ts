import { Category } from "./category.interface";
import { Option } from "./option.interface";
import { Tag } from "./tag.interface";

export interface Command {
    id: number;

    title: string;
    description: string;
    context: string;
    context_description: string;
    category: Category[];
    example: string[];
    tooltip: string;
    option: Option[];
    alternative: Command[];
    equivalent: Command[];
    tag: Tag[];
    copy_count: number;

    active: boolean;
    created_at: Date;
    updated_at: Date;
}