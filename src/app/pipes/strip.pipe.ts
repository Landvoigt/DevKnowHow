import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'strip',
    standalone: true
})
export class StripPipe implements PipeTransform {

    transform(command: string): string {
        if (!command) return '';

        const stripped = command
            .replace(/\*(.*?)\*/g, '')
            .trim()
            .replace(/\s+/g, ' ');

        if (!stripped) return command;

        return stripped;
    }
}