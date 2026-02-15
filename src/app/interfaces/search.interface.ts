import { Category } from "./category.interface";
import { Command } from "./command.interface"

export interface SearchResult {
    command: Command[];
    category: Category[];
    counts: {
        command: number;
        category: number;
        total: number;
    };
}