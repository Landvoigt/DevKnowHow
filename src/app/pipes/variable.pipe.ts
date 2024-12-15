import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variable',
  standalone: true
})
export class VariablePipe implements PipeTransform {

  transform(command: string): string {
    const regex = /\*(.*?)\*/g;
    return command ? command.replace(regex, '<span class="text-textColorVariable">$1</span>') : '';
  }

  static removeFormatting(command: string): string {
    const regex = /<span class="text-textColorVariable">(.*?)<\/span>/g;
    return command.replace(regex, '$1');
  }

}
