import { Pipe, PipeTransform, inject } from '@angular/core';
import { DataService } from '@services/data.service';

@Pipe({
    name: 'search',
    standalone: true,
    pure: false
})
export class SearchPipe implements PipeTransform {
    private readonly dataService = inject(DataService);

    transform(text: string): string {
        if (!text) return '';

        const query = this.dataService.searchQuery;
        if (!query.trim() || query.trim().length < 2) return text;

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');

        return text.replace(regex, '<span class="text-[#a736b1]">$1</span>');
    }
}