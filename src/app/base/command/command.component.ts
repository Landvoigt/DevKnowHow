import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Command } from '@interfaces/command.interface';
import { Option } from '@interfaces/option.interface';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';

@Component({
  selector: 'app-command',
  imports: [CommonModule, TranslateModule, VariablePipe],
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss',
})
export class CommandComponent {
  @Input() command!: Command;
  @Input() index!: number;
  @Input() hidden!: Record<number, boolean>;

  public readonly commandService = inject(CommandService);

  readonly sortedOptions = computed<Option[]>(() => {
    return [...this.command.option].sort((a, b) => a.level - b.level);
  });

  readonly selectedOptions = signal<Set<number>>(new Set());

  toggleOption(option: Option): void {
    const selected = new Set(this.selectedOptions());

    if (selected.has(option.id)) {
      selected.delete(option.id);
    } else {
      const sameLevelOptions = this.sortedOptions().filter(opt => opt.level === option.level);

      if (!option.combinable) {
        sameLevelOptions.forEach(opt => selected.delete(opt.id));
      }

      selected.add(option.id);
    }

    this.selectedOptions.set(selected);
  }

  toggleExtendedInfo(): void {
    this.hidden[this.index] = !this.hidden[this.index];
  }

  copy(): void {
    this.commandService.copy(this.command.title, this.command.id, this.index);
  }

  isOptionSelected(option: Option): boolean {
    return this.selectedOptions().has(option.id);
  }

}
