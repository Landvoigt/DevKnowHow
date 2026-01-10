import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Command } from '@interfaces/command.interface';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { Category } from '@interfaces/category.interface';
import { map, Observable, Subscription } from 'rxjs';
import { fadeIn, staggeredFadeIn, subCategoryAnimation } from '@utils/animations';
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
  styleUrl: './category.component.scss',
  animations: [fadeIn, staggeredFadeIn, subCategoryAnimation]
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  private languageSubscription!: Subscription;

  categories$: Observable<Category[]> = this.dataService.categories$;
  categoryId: number | null = null;
  category: Category | undefined;

  activeOrder: 'copy' | 'asc' | 'dec' | null = null;

  commands: Command[] = [];
  routines: Routine[] = [];
  filteredCommands: Command[] = [];
  filteredRoutines: Routine[] = [];

  hidden: { [key: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private error: ErrorService,
    private dataService: DataService,
    private translationService: TranslationService,
    public commandService: CommandService,
    public navService: NavigationService) { }

  ngOnInit(): void {
    this.getCategoryId();
    this.loadCachedFilters();
    this.loadData();
    this.setupLanguageListener();
  }

  getCategoryId(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoryId = +id;
        this.loadCategory();
        this.loadData();
      }
    });
  }

  loadCategory(): void {
    if (this.categoryId) {
      this.categories$.pipe(
        map(categories => categories.find(cat => cat.id === this.categoryId))
      ).subscribe(category => {
        this.category = category;

        // if (category && this.activeSubCatId) {
        //   this.activeSubCat = category.sub_categories.find(subCat => subCat.id === this.activeSubCatId) || null;
        // }
      });
    }
  }

  loadData(): void {
    // if (this.categoryId) {
    //   this.rest.getDetailedCategory(this.categoryId).subscribe({
    //     next: (commands: Command[]) => {
    //       this.commands = commands;
    //       this.filteredCommands = [...commands];
    //       this.orderCommands();
    //       if (this.searchInput?.nativeElement.value) {
    //         this.onSearch(this.searchInput.nativeElement.value);
    //       }
    //     },
    //     error: (error) => this.error.handleHttpError(error, {}),
    //     complete: () => { }
    //   });
    // }
  }

  setupLanguageListener() {
    this.languageSubscription = this.translationService.languageChanged.subscribe(() => {
      this.loadData();
    });
  }

  onSearch(searchTerm: string): void {
    if (this.navService.activeLayout === 'command') {
      this.filteredCommands = this.commands.filter((command) =>
        command.title.toLowerCase().includes(searchTerm.toLowerCase()) || command.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredRoutines = this.routines.filter((routine) =>
        routine.title.toLowerCase().includes(searchTerm.toLowerCase()) || routine.routine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  cancelSearch(search: HTMLInputElement) {
    search.value = '';
    this.onSearch('');
  }

  toggleExtendedInfo(index: number): void {
    this.hidden[index] = !this.hidden[index];
  }

  loadCachedFilters(): void {
    const savedData = sessionStorage.getItem(this.getCurrentStorageName());
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.activeOrder = parsedData.activeOrder;
    }
  }

  cacheFilters(): void {
    const data = {
      activeOrder: this.activeOrder
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
    if (this.activeOrder === 'asc') {
      this.filteredCommands.sort((a, b) => this.compareStrings(a.title, b.title));
    } else if (this.activeOrder === 'dec') {
      this.filteredCommands.sort((a, b) => this.compareStrings(b.title, a.title));
    } else if (this.activeOrder === 'copy') {
      this.filteredCommands.sort((a, b) => b.copy_count - a.copy_count);
    }
  }

  orderRoutines(): void {
    if (this.activeOrder === 'asc') {
      this.filteredRoutines.sort((a, b) => this.compareStrings(a.routine, b.routine));
    } else if (this.activeOrder === 'dec') {
      this.filteredRoutines.sort((a, b) => this.compareStrings(b.routine, a.routine));
    } else if (this.activeOrder === 'copy') {
      this.filteredRoutines.sort((a, b) => b.copy_count - a.copy_count);
    }
  }

  compareStrings(str1: string, str2: string): number {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    if (s1 < s2) return -1;
    if (s1 > s2) return 1;
    return 0;
  }

  getCurrentStorageName(): string {
    return this.navService.activeLayout === 'command' ? 'DevKnowHow_activeCommandFilters' : 'DevKnowHow_activeRoutineFilters';
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
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
