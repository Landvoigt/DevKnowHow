import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestService } from '@services/rest.service';
import { Category } from '@interfaces/category.interface';
import { ErrorService } from '@services/error.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  constructor(private rest: RestService, private error: ErrorService) { }

  loadCategories(): void {
    this.rest.getCategories().subscribe({
      next: (cats: Category[]) => {
        this.categoriesSubject.next(cats || []);
        console.log(cats);
      },
      error: (error) => this.error.handleHttpError(error, {}),
    });
  }

  getCategories(): Category[] {
    return this.categoriesSubject.value;
  }

}
