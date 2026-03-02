import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'strip',
    standalone: true
})
export class StripPipe implements PipeTransform {

    transform(command: string): string {
        if (!command) return '';

        return command
            .replace(/\*(.*?)\*/g, '')
            .trim()
            .replace(/\s+/g, ' ');
    }
}