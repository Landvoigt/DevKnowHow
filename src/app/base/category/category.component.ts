import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map, switchMap } from 'rxjs';

import { Command } from '@interfaces/command.interface';
import { Category } from '@interfaces/category.interface';

import { RestService } from '@services/rest.service';
import { DataService } from '@services/data.service';
import { NavigationService } from '@services/navigation.service';
import { TranslationService } from '@services/translation.service';
import { CommandService } from '@services/command.service';
import { ErrorService } from '@services/error.service';

import { CommandComponent } from '../command/command.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, CommandComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly rest = inject(RestService);
  private readonly dataService = inject(DataService);
  private readonly translation = inject(TranslationService);
  private readonly error = inject(ErrorService);

  public readonly navService = inject(NavigationService);
  public readonly commandService = inject(CommandService);

  readonly categories = this.dataService.categories;

  readonly categoryId = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      filter(Boolean)
    ),
    { initialValue: null }
  );

  readonly language = this.translation.language;

  readonly categoryDetail = toSignal(
    combineLatest([
      toObservable(this.categoryId).pipe(filter(Boolean)),
      toObservable(this.language)
    ]).pipe(
      switchMap(([id]) => this.rest.getDetailedCategory(id))
    ),
    { initialValue: null }
  );

  readonly category = computed<Category | undefined>(() => {
    const id = this.categoryId();
    return this.categories().find(cat => cat.id === id);
  });

  readonly commands = computed<Command[]>(() => this.categoryDetail()?.commands ?? []);

  readonly activeOrder = signal<'copy' | 'asc' | 'dec' | null>('asc');
  readonly hidden = signal<Record<number, boolean>>({});
  readonly sudo = signal<boolean>(false);

  readonly filteredCommands = computed<Command[]>(() => {
    const searchResults = this.dataService.searchResults();

    const result = searchResults !== null
      ? [...searchResults]
      : [...this.commands()];

    const order = this.activeOrder();

    switch (order) {
      case 'asc': return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'dec': return result.sort((a, b) => b.title.localeCompare(a.title));
      case 'copy': return result.sort((a, b) => b.copy_count - a.copy_count);
      default: return result;
    }
  });

  readonly isSearch = computed(() => {
    return this.dataService.searchResults() !== null;
  });

  readonly isBashCategory = computed(() => this.category()?.title === 'Bash');

  constructor() {
    effect(() => {
      const id = this.categoryId();

      if (id) {
        this.dataService.clearSearchResults();
      }
    });
  }

  toggleExtendedInfo(index: number): void {
    this.hidden.update(h => ({ ...h, [index]: !h[index] }));
  }

  toggleSudo(): void {
    this.sudo.set(!this.sudo());
  }

  onOrderChange(value: 'asc' | 'dec' | 'copy'): void {
    this.activeOrder.set(value);
    this.cacheFilters();
  }

  loadCachedFilters(): void {
    const saved = sessionStorage.getItem('DevKnowHow_activeCommandFilters');
    if (saved) {
      this.activeOrder.set(JSON.parse(saved).activeOrder);
    } else {
      this.activeOrder.set('asc');
    }
  }

  cacheFilters(): void {
    sessionStorage.setItem('DevKnowHow_activeCommandFilters', JSON.stringify({ activeOrder: this.activeOrder() }));
  }
}
