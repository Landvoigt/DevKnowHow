import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
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
export class CommandComponent implements OnInit {
  @Input() command!: Command;
  @Input() index!: number;
  @Input() hidden!: Record<number, boolean>;

  public readonly commandService = inject(CommandService);

  readonly optionState = signal<Record<number, boolean>>({});

  readonly sortedOptions = computed<Option[]>(() => {
    return [...this.command.option].sort((a, b) => a.level - b.level);
  });

  readonly activeOptions = computed(() =>
    this.sortedOptions().filter(opt => this.optionState()[opt.id])
  );

  readonly activeAlternative = signal<number | null>(null);

  readonly activeAlternativeItem = computed(() =>
    this.command.alternative.find(a => a.id === this.activeAlternative()) ?? null
  );

  readonly showExample = signal<boolean>(false);

  ngOnInit(): void {
    const initial: Record<number, boolean> = {};
    this.command.option.forEach(opt => {
      initial[opt.id] = false;
    });
    this.optionState.set(initial);
  }

  toggleExtendedInfo(): void {
    this.hidden[this.index] = !this.hidden[this.index];
  }

  toggleOption(option: Option): void {
    this.activeAlternative.set(null);
    this.showExample.set(false);

    const state = { ...this.optionState() };
    const newValue = !state[option.id];

    if (newValue && !option.combinable) {
      for (const opt of this.sortedOptions()) {
        if (opt.level === option.level && opt.id !== option.id) {
          state[opt.id] = false;
        }
      }
    }

    state[option.id] = newValue;
    this.optionState.set(state);
  }

  toggleAlternative(id: number): void {
    this.clear();
    this.activeAlternative.set(id);
  }

  toggleExample(): void {
    const next = !this.showExample();

    if (next) {
      this.clearOptions();
      this.activeAlternative.set(null);
    }

    this.showExample.set(next);
  }

  clearOptions(): void {
    const cleared: Record<number, boolean> = {};
    this.sortedOptions().forEach(o => cleared[o.id] = false);
    this.optionState.set(cleared);
  }

  clear(): void {
    this.activeAlternative.set(null);
    this.showExample.set(false);
    this.clearOptions();
  }

  copy(): void {
    this.commandService.copy(this.command.title, this.command.id, this.index);
  }

  isOptionSelected(option: Option): boolean {
    return this.optionState()[option.id] === true;
  }

}
