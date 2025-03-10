import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variable',
  standalone: true
})
export class VariablePipe implements PipeTransform {
  private static regex = /\*(.*?)\*/g;

  transform(command: string): string {
    return command ? command.replace(VariablePipe.regex, '<span class="text-textColorVariable">$1</span>') : '';
  }

  static removeFormatting(command: string): string {
    return command.replace(this.regex, '$1');
  }

}
