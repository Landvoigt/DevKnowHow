import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, signal, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Command } from '@interfaces/command.interface';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { Category } from '@interfaces/category.interface';
import { Routine } from '@interfaces/routine.interface';
import { NavigationService } from '@services/navigation.service';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '@services/translation.service';
import { FlagPipe } from '@pipes/flag.pipe';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, VariablePipe, FlagPipe, TranslateModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  private readonly route = inject(ActivatedRoute);
  private readonly rest = inject(RestService);
  private readonly error = inject(ErrorService);
  private readonly dataService = inject(DataService);
  private readonly translationService = inject(TranslationService);
  public readonly commandService = inject(CommandService);
  public readonly navService = inject(NavigationService);

  public readonly categories = this.dataService.categories;

  public readonly categoryId = signal<number | null>(null);
  public readonly category = signal<Category | undefined>(undefined);

  public readonly activeOrder = signal<'copy' | 'asc' | 'dec' | null>(null);

  public readonly commands = signal<Command[]>([]);
  public readonly routines = signal<Routine[]>([]);
  public readonly filteredCommands = signal<Command[]>([]);
  public readonly filteredRoutines = signal<Routine[]>([]);

  public readonly hidden = signal<{ [key: number]: boolean }>({});

  constructor() {
    effect(() => {
      const id = this.categoryId();
      if (id) {
        this.loadCategory();
        this.loadData();
      }
    });

    effect(() => {
      this.translationService.language();
      this.loadData();
    });

    this.getCategoryId();
    this.loadCachedFilters();
  }

  private getCategoryId(): void {
    effect(() => {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.categoryId.set(+id);
        }
      });
    });
  }

  private loadCategory(): void {
    const id = this.categoryId();
    if (id) {
      const categories = this.categories();
      const foundCategory = categories.find(cat => cat.id === id);
      this.category.set(foundCategory);
    }
  }

  private loadData(): void {
    // Placeholder for data loading logic
  }

  onSearch(searchTerm: string): void {
    if (this.navService.activeLayout === 'command') {
      const cmds = this.commands();
      this.filteredCommands.set(cmds.filter((command) =>
        command.title.toLowerCase().includes(searchTerm.toLowerCase()) || command.description.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      const rts = this.routines();
      this.filteredRoutines.set(rts.filter((routine) =>
        routine.title.toLowerCase().includes(searchTerm.toLowerCase()) || routine.routine.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }

  cancelSearch(search: HTMLInputElement) {
    search.value = '';
    this.onSearch('');
  }

  toggleExtendedInfo(index: number): void {
    const currentHidden = this.hidden();
    this.hidden.set({ ...currentHidden, [index]: !currentHidden[index] });
  }

  loadCachedFilters(): void {
    const savedData = sessionStorage.getItem(this.getCurrentStorageName());
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.activeOrder.set(parsedData.activeOrder);
    }
  }

  cacheFilters(): void {
    const data = {
      activeOrder: this.activeOrder()
    };
    sessionStorage.setItem(this.getCurrentStorageName(), JSON.stringify(data));
  }

  applyOrder(): void {
    this.cacheFilters();
    if (this.navService.activeLayout === 'command') {
      this.orderCommands();
    }
    if (this.navService.activeLayout === 'routine') {
      this.orderRoutines();
    }
  }

  orderCommands(): void {
    const order = this.activeOrder();
    const cmds = [...this.commands()];
    if (order === 'asc') {
      cmds.sort((a, b) => this.compareStrings(a.title, b.title));
    } else if (order === 'dec') {
      cmds.sort((a, b) => this.compareStrings(b.title, a.title));
    } else if (order === 'copy') {
      cmds.sort((a, b) => b.copy_count - a.copy_count);
    }
    this.filteredCommands.set(cmds);
  }

  orderRoutines(): void {
    const order = this.activeOrder();
    const rts = [...this.routines()];
    if (order === 'asc') {
      rts.sort((a, b) => this.compareStrings(a.routine, b.routine));
    } else if (order === 'dec') {
      rts.sort((a, b) => this.compareStrings(b.routine, a.routine));
    } else if (order === 'copy') {
      rts.sort((a, b) => b.copy_count - a.copy_count);
    }
    this.filteredRoutines.set(rts);
  }

  compareStrings(str1: string, str2: string): number {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    if (s1 < s2) return -1;
    if (s1 > s2) return 1;
    return 0;
  }

  onOrderChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.activeOrder.set(value as 'copy' | 'asc' | 'dec' | null);
    this.applyOrder();
  }

  getCurrentStorageName(): string {
    return this.navService.activeLayout === 'command' ? 'DevKnowHow_activeCommandFilters' : 'DevKnowHow_activeRoutineFilters';
  }
}





// @Component({
//   standalone: true,
//   selector: 'app-category',
//   imports: [CommonModule, TranslateModule, FormsModule],
//   templateUrl: './category.component.html',
//   styleUrl: './category.component.scss',
//   animations: [fadeIn, staggeredFadeIn, subCategoryAnimation],
// })
// export class CategoryComponent {

//   private readonly route = inject(ActivatedRoute);
//   private readonly rest = inject(RestService);
//   private readonly translation = inject(TranslationService);
//   private readonly navService = inject(NavigationService);

//   private readonly categoryId = toSignal(
//     this.route.paramMap.pipe(
//       map(params => Number(params.get('id')))
//     ),
//     { initialValue: null }
//   );

//   private readonly language = toSignal(
//     this.translation.languageChanged,
//     { initialValue: this.translation.currentLang }
//   );

//   /** Reload when ID OR language changes */
//   readonly category = toSignal(
//     combineLatest([
//       this.categoryId,
//       this.language,
//     ]).pipe(
//       filter(([id]) => !!id),
//       switchMap(([id]) => this.rest.getCategoryDetail(id!))
//     ),
//     { initialValue: null }
//   );

//   readonly commands = computed(() => this.category()?.commands ?? []);

//   readonly activeOrder = signal<'copy' | 'asc' | 'dec' | null>(null);

//   readonly filteredCommands = computed(() => {
//     const cmds = [...this.commands()];
//     const order = this.activeOrder();

//     switch (order) {
//       case 'asc':
//         return cmds.sort((a, b) => a.title.localeCompare(b.title));
//       case 'dec':
//         return cmds.sort((a, b) => b.title.localeCompare(a.title));
//       case 'copy':
//         return cmds.sort((a, b) => b.copy_count - a.copy_count);
//       default:
//         return cmds;
//     }
//   });

//   setOrder(order: 'copy' | 'asc' | 'dec') {
//     this.activeOrder.set(order);
//   }
// }
