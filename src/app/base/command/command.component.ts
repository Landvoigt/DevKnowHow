import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Command } from '@interfaces/command.interface';
import { Option } from '@interfaces/option.interface';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';
import { StripPipe } from '@pipes/strip.pipe';
import { SearchPipe } from '@pipes/search.pipe';

@Component({
  selector: 'app-command',
  imports: [CommonModule, TranslateModule, VariablePipe, StripPipe, SearchPipe],
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss',
})
export class CommandComponent implements OnInit, OnChanges {
  @Input() command!: Command;
  @Input() index!: number;
  @Input() hidden!: Record<number, boolean>;
  @Input() sudo: boolean = false;

  private readonly levelColors = [
    '#4af6f7',
    '#16b2ff',
    '#2b6bff'
  ];

  public readonly commandService = inject(CommandService);

  readonly optionState = signal<Record<number, boolean>>({});

  readonly sortedOptions = computed<Option[]>(() => {
    this.command;
    return [...this.command.option].sort((a, b) => a.level - b.level);
  });

  readonly activeOptions = computed(() => {
    const selectedIds = new Set(Object.entries(this.optionState()).filter(([id, selected]) => selected).map(([id]) => Number(id)));
    const activeOptions = this.command.option.filter(opt => selectedIds.has(opt.id)).sort((a, b) => a.level - b.level);
    const standaloneOption = activeOptions.find(opt => opt.standalone);

    if (standaloneOption) {
      return [{ ...standaloneOption }];
    }

    return activeOptions.map(opt => ({ ...opt }));
  });

  readonly activeAlternative = signal<number | null>(null);
  readonly activeAlternativeItem = computed(() => this.command.alternative.find(a => a.id === this.activeAlternative()) ?? null);

  readonly activeExample = signal<string | null>(null);
  readonly activeExampleItem = computed(() => this.command.example.find(a => a === this.activeExample()) ?? null);

  readonly changesApplied = computed<boolean>(() => {
    return (this.activeOptions().length > 0 || this.activeExample() !== null || this.activeAlternative() !== null);
  });

  readonly activeOptionDescriptions = computed(() => {
    const cmd = this.command;
    const selectedIds = new Set(Object.entries(this.optionState()).filter(([_, selected]) => selected).map(([id]) => Number(id)));
    const activeOptions = cmd.option.filter(opt => selectedIds.has(opt.id)).sort((a, b) => a.level - b.level);
    const standaloneOption = activeOptions.find(opt => opt.standalone);
    const optionsToRender = standaloneOption ? [standaloneOption] : activeOptions;

    return optionsToRender.map(opt => {
      const prefix = opt.title.startsWith('--') ? '--' : opt.title.startsWith('-') ? '-' : '';
      const description = opt.description ? prefix + opt.description : opt.title;
      return { id: opt.id, description, level: opt.level };
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
    this.activeExample.set(null);

    const state = { ...this.optionState() };
    const newValue = !state[option.id];

    if (newValue && option.standalone) {
      for (const opt of this.sortedOptions()) {
        state[opt.id] = false;
      }

      state[option.id] = true;
      this.optionState.set(state);
      return;
    }

    if (newValue && !option.standalone) {
      for (const opt of this.sortedOptions()) {
        if (opt.standalone) {
          state[opt.id] = false;
        }
      }
    }

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

  toggleExample(ex: string): void {
    const isActive = this.activeExample() === ex;

    this.clear();

    if (!isActive) {
      this.activeExample.set(ex);
    }
  }

  clearOptions(): void {
    const cleared: Record<number, boolean> = {};
    this.sortedOptions().forEach(o => cleared[o.id] = false);
    this.optionState.set(cleared);
  }

  clear(): void {
    this.activeAlternative.set(null);
    this.activeExample.set(null);
    this.clearOptions();
  }

  copy(): void {
    let textToCopy = '';

    if (this.activeExample()) {
      textToCopy = this.activeExample()!;
    } else if (this.activeAlternativeItem()) {
      textToCopy = this.activeAlternativeItem()!.title;
    } else {
      textToCopy = this.sudo ? 'sudo ' + this.command.title : this.command.title;
      for (const opt of this.activeOptions()) {
        textToCopy += ' ' + opt.title;
      }
      if (this.command.context) {
        textToCopy += ' ' + this.command.context;
      }
    }

    this.commandService.copy(textToCopy, this.command.id, this.index);
  }

  isOptionSelected(option: Option): boolean {
    return this.optionState()[option.id] === true;
  }

  getColorByLevel(level: number): string {
    return this.levelColors[level % this.levelColors.length];
  }

}