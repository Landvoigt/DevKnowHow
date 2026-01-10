import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flag',
  standalone: true
})
export class FlagPipe implements PipeTransform {
  private static regex = /\^(.*?)\^/g;

  transform(command: string): string {
    return command ? command.replace(FlagPipe.regex, '<span class="text-[#47aee1]">$1</span>') : '';
  }

  static removeFormatting(command: string): string {
    return command.replace(this.regex, '$1');
  }

}
