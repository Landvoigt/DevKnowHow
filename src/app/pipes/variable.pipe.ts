import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variable',
  standalone: true
})
export class VariablePipe implements PipeTransform {
  private static regex = /(?<!\\)\*(.*?)(?<!\\)\*/g;
  private static escapedRegex = /\\\*/g;

  transform(command: string): string {
    if (!command) return '';

    return command
      .replace(VariablePipe.regex, '<span class="text-[#32ff7c]">$1</span>')
      .replace(VariablePipe.escapedRegex, '*');
  }

  static removeFormatting(command: string): string {
    return command
      .replace(this.regex, '$1')
      .replace(this.escapedRegex, '*');
  }

}
