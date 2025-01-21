import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Command } from '@interfaces/command.interface';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { Category } from '@interfaces/category.interface';
import { map, Observable } from 'rxjs';
import { fadeIn, staggeredFadeIn, subCategoryAnimation } from '@utils/animations';
import { Routine } from '@interfaces/routine.interface';
import { NavigationService } from '@services/navigation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, VariablePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  animations: [fadeIn, staggeredFadeIn, subCategoryAnimation]
})
export class CategoryComponent implements OnInit {
  categories$: Observable<Category[]> = this.dataService.categories$;
  categoryId: number | null = null;
  category: Category | undefined;

  activeSubCat: Category | null = null;
  activeSubCatId: number | null = null;
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
    public commandService: CommandService,
    public navService: NavigationService) { }

  ngOnInit(): void {
    this.getCategoryId();
    this.loadCachedFilters();
    this.loadData();
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

        if (category && this.activeSubCatId) {
          this.activeSubCat = category.sub_categories.find(subCat => subCat.id === this.activeSubCatId) || null;
        }
      });
    }
  }

  loadData(): void {
    if (this.categoryId) {
      if (this.navService.activeLayout === 'command') {
        this.rest.getCommandsByCategory(this.categoryId).subscribe({
          next: (commands: Command[]) => {
            this.commands = commands;
            this.filteredCommands = [...commands];
            this.orderCommands();
          },
          error: (error) => this.error.handleHttpError(error, {}),
          complete: () => { }
        });
      } else {
        this.rest.getRoutinesByCategory(this.categoryId).subscribe({
          next: (routines: Routine[]) => {
            this.routines = routines;
            this.filteredRoutines = [...routines];
            this.orderRoutines();
          },
          error: (error) => this.error.handleHttpError(error, {}),
          complete: () => { }
        });
      }
    }
  }

  onSearch(searchTerm: string): void {
    if (this.navService.activeLayout === 'command') {
      this.filteredCommands = this.commands.filter((command) =>
        command.command.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredRoutines = this.routines.filter((routine) =>
        routine.routine.toLowerCase().includes(searchTerm.toLowerCase())
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
      this.activeSubCatId = parsedData.activeSubCat;
      this.activeOrder = parsedData.activeOrder;
    }
  }

  cacheFilters(): void {
    const data = {
      activeSubCat: this.activeSubCat ? this.activeSubCat.id : null,
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
      this.filteredCommands.sort((a, b) => this.compareStrings(a.command, b.command));
    } else if (this.activeOrder === 'dec') {
      this.filteredCommands.sort((a, b) => this.compareStrings(b.command, a.command));
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
}