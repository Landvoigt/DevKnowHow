import { Injectable, effect, inject, signal } from '@angular/core';
import { RestService } from '@services/rest.service';
import { Category } from '@interfaces/category.interface';
import { ErrorService } from '@services/error.service';
import { Command } from '@interfaces/command.interface';
import { catchError, debounceTime, of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly rest = inject(RestService);
  private readonly error = inject(ErrorService);

  private readonly categoriesSignal = signal<Category[]>([]);
  readonly categories = this.categoriesSignal.asReadonly();

  private readonly searchResultsSignal = signal<Command[] | null>(null);
  readonly searchResults = this.searchResultsSignal.asReadonly();

  private readonly searchQuerySignal = signal<string>('');

  private searchQuery$ = new Subject<string>();

  constructor() {
    this.searchQuery$
      .pipe(
        debounceTime(150),
        switchMap(query => {
          const trimmed = query.trim();
          if (!trimmed) return of(null);
          return this.rest.search(trimmed).pipe(
            catchError(err => {
              this.error.handleHttpError(err, {});
              return of({ command: [] });
            })
          );
        })
      )
      .subscribe(result => {
        this.searchResultsSignal.set(result?.command ?? null);
      });

    effect(() => {
      this.searchQuery$.next(this.searchQuerySignal());
    });
  }

  loadCategories(): void {
    this.rest.getCategories().subscribe({
      next: (cats: Category[]) => this.categoriesSignal.set(cats || []),
      error: (error) => this.error.handleHttpError(error, {}),
    });
  }

  search(query: string) {
    this.searchQuerySignal.set(query);
  }

  clearSearchResults() {
    this.searchQuerySignal.set('');
    this.searchResultsSignal.set(null);
  }

  getCategories(): Category[] {
    return this.categoriesSignal();
  }

  get searchQuery() {
    return this.searchQuerySignal();
  }

}
