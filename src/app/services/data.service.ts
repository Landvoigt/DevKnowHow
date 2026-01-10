import { Injectable, inject, signal } from '@angular/core';
import { RestService } from '@services/rest.service';
import { Category } from '@interfaces/category.interface';
import { ErrorService } from '@services/error.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly rest = inject(RestService);
  private readonly error = inject(ErrorService);

  private readonly categoriesSignal = signal<Category[]>([]);
  readonly categories = this.categoriesSignal.asReadonly();

  loadCategories(): void {
    this.rest.getCategories().subscribe({
      next: (cats: Category[]) => {
        this.categoriesSignal.set(cats || []);
      },
      error: (error) => this.error.handleHttpError(error, {}),
    });
  }

  getCategories(): Category[] {
    return this.categoriesSignal();
  }
}
