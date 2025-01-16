import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Command } from '@models/command.model';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';
import { Category } from '@interfaces/category.interface';
import { map, Observable } from 'rxjs';
import { fadeIn, staggeredFadeIn, subCategoryAnimation } from '@utils/animations';

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

  data: Command[] = [];
  hidden: { [key: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    public commandService: CommandService,
    private rest: RestService,
    private error: ErrorService,
    private dataService: DataService) { }

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
      this.rest.getCommandsByCategory(this.categoryId).subscribe({
        next: (commands: Command[]) => {
          this.data = commands;
          console.log(commands)
        },
        error: (error) => this.error.handleHttpError(error, {}),
        complete: () => { }
      });
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