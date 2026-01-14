import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
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
export class CommandComponent implements OnInit, OnChanges {
  @Input() command!: Command;
  @Input() index!: number;
  @Input() hidden!: Record<number, boolean>;

  public readonly commandService = inject(CommandService);

  readonly optionState = signal<Record<number, boolean>>({});

  readonly sortedOptions = computed<Option[]>(() => {
    this.command;
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

  readonly changesApplied = computed<boolean>(() => {
    return (this.activeOptions().length > 0 || this.showExample() === true || this.activeAlternative() !== null);
  });

  readonly activeOptionDescriptions = computed(() => {
    const cmd = this.command;
    const selectedIds = new Set(Object.keys(this.optionState()).filter(id => this.optionState()[Number(id)]));

    return cmd.option
      .filter(opt => selectedIds.has(String(opt.id)))
      .map(opt => {
        const prefix = opt.title.startsWith('--') ? '--' : opt.title.startsWith('-') ? '-' : '';
        return { id: opt.id, text: `${prefix}${opt.description}`, level: opt.level };
      });
  });

  ngOnInit(): void {
    if (this.command) {
      this.resetOptionState();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['command']) {
      this.resetOptionState();
    }
  }

  private resetOptionState(): void {
    const selectedIds = new Set<number>(
      Object.entries(this.optionState())
        .filter(([id, selected]) => selected)
        .map(([id]) => Number(id))
    );

    const newState: Record<number, boolean> = {};
    this.command.option.forEach(opt => {
      newState[opt.id] = selectedIds.has(opt.id);
    });

    this.optionState.set(newState);
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
    const isActive = this.activeAlternative() === id;

    this.clear();

    if (!isActive) {
      this.activeAlternative.set(id);
    }
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
    let textToCopy = '';

    if (this.showExample()) {
      textToCopy = this.command.example;
    } else if (this.activeAlternativeItem()) {
      textToCopy = this.activeAlternativeItem()!.title;
    } else {
      textToCopy = this.command.title;
      for (const opt of this.activeOptions()) {
        textToCopy += ' ' + opt.title;
      }
    }

    this.commandService.copy(textToCopy, this.command.id, this.index);
  }

  isOptionSelected(option: Option): boolean {
    return this.optionState()[option.id] === true;
  }
}