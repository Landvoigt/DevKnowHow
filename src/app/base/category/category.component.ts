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

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, VariablePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  animations: [fadeIn, staggeredFadeIn, subCategoryAnimation]
})
export class CategoryComponent implements OnInit {
  categories$: Observable<Category[]> = this.dataService.categories$;
  categoryId: number | null = null;
  category: Category | undefined;
  activeSubCat: Category | null = null;

  commands: Command[] = [];
  routines: Routine[] = [];

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
      });
    }
  }

  loadData(): void {
    if (this.categoryId) {
      if (this.navService.activeLayout === 'command') {
        this.rest.getCommandsByCategory(this.categoryId).subscribe({
          next: (commands: Command[]) => {
            this.commands = commands.sort((a, b) => b.copy_count - a.copy_count);
          },
          error: (error) => this.error.handleHttpError(error, {}),
          complete: () => { }
        });
      } else {
        this.rest.getRoutinesByCategory(this.categoryId).subscribe({
          next: (routines: Routine[]) => {
            this.routines = routines.sort((a, b) => b.copy_count - a.copy_count);
          },
          error: (error) => this.error.handleHttpError(error, {}),
          complete: () => { }
        });
      }
    }
  }

  setActiveSubCategory(subCategory: Category): void {
    if (this.activeSubCat === subCategory) {
      this.activeSubCat = null;
    } else {
      this.activeSubCat = subCategory;
    }
  }

  toggleExtendedInfo(index: number): void {
    this.hidden[index] = !this.hidden[index];
  }

}