import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, signal, computed, effect, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '@interfaces/category.interface';
import { createFormRoutine, CreateFormRoutineModel } from '@interfaces/create.interface';
import { RoutineRequest } from '@models/requests.model';
import { FilterPipe } from '@pipes/filter.pipe';
import { AlertService } from '@services/alert.service';
import { DataService } from '@services/data.service';
import { ErrorService } from '@services/error.service';
import { NavigationService } from '@services/navigation.service';
import { RestService } from '@services/rest.service';
import { debounceTime } from 'rxjs/operators';
import { ContentEditableDirective } from 'src/app/directives/content-editable.directive';

@Component({
  selector: 'app-create-routine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, FilterPipe, ContentEditableDirective],
  templateUrl: './create-routine.component.html',
  styleUrl: './create-routine.component.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(window:beforeunload)': 'saveOnUnload($event)'
  }
})
export class CreateRoutineComponent implements OnInit {
  @ViewChild('routineInput', { static: true }) routineInput!: ElementRef<HTMLDivElement>;

  private readonly restService = inject(RestService);
  private readonly errorService = inject(ErrorService);
  private readonly alertService = inject(AlertService);
  private readonly dataService = inject(DataService);
  public readonly navService = inject(NavigationService);

  public readonly form: FormGroup<CreateFormRoutineModel> = createFormRoutine();

  public readonly categories = this.dataService.categories;

  public readonly loading = signal(false);
  public readonly closeMenu = signal(false);

  public readonly newCatSelected = signal(false);

  public readonly routineTyped = signal(false);

  constructor() {
    this.setupCaching();
    effect(() => {
      const selectedType = this.category?.value;
      this.newCatSelected.set(selectedType === 'new');
    });
  }

  ngOnInit(): void {
    this.loadCachedItem();
    this.dataService.loadCategories();
    this.setupDefaultCategory();
  }

  private setupDefaultCategory() {
    effect(() => {
      const categories = this.categories();
      if (categories?.length > 0 && !this.form.get('category')?.value) {
        const filtered = categories.filter((cat: Category) => cat.type === this.navService.activeLayout);
        if (filtered.length > 0) {
          this.form.patchValue({ body: { category: filtered[0].title } });
        }
      }
    });
  }

  setupCaching() {
    this.form.valueChanges.pipe(debounceTime(3000)).subscribe(() => {
      this.cacheOpenItem();
    });
  }

  loadCachedItem() {
    const savedData = sessionStorage.getItem('DevKnowHow_unsavedRoutineItem');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.form.patchValue(parsedData);
    }
  }

  cacheOpenItem() {
    const formData = this.form.getRawValue();
    sessionStorage.setItem('DevKnowHow_unsavedRoutineItem', JSON.stringify(formData));
  }

  onSubmitRoutine() {
    if (this.form.valid) {
      this.loading.set(true);

      const { name, email, message } = this.form.value;
      const bodyValue = this.getBodyValues();
      const payload: RoutineRequest = this.getRoutineRequest(bodyValue, name, email, message);

      this.restService.createRoutine(payload).subscribe({
        next: (response) => this.onCreationSubmitted(response),
        error: (err) => this.onCreationError(err),
      });
    }
  }

  getBodyValues() {
    const bodyValue = this.body.value;

    this.setCategory(bodyValue);

    return bodyValue;
  }

  setCategory(bodyValue: any) {
    if (this.category && this.newCategory?.value != null) {
      bodyValue.category = this.newCategory.value;
    }
  }

  onCreationSubmitted(response: any) {
    this.alertService.showAlert('Thank you for your submission!', 'success');
    this.form.reset();
    sessionStorage.removeItem('DevKnowHow_unsavedRoutineItem');
    this.loading.set(false);
  }

  onCreationError(err: any) {
    this.errorService.handleContactError(err);
    this.loading.set(false);
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.routineInput?.nativeElement.contains(target) && this.routineTyped()) {
      this.routineTyped.set(false);
    }
  }

  checkInput(nativeElement: HTMLElement) {
    const value = nativeElement.textContent?.trim() || '';

    if (nativeElement === this.routineInput.nativeElement) {
      this.routineTyped.set(value.length > 2);
    }
  }

  saveOnUnload(event: BeforeUnloadEvent) {
    this.cacheOpenItem();
  }

  // Getter
  getRoutineRequest(bodyValue: any, name: string | null | undefined, email: string | null | undefined, message: string | null | undefined): RoutineRequest {
    return {
      title: bodyValue.title,
      routine: bodyValue.routine,
      category: bodyValue.category,
      sub_category: bodyValue.subCategory || '',
      creator_name: name || undefined,
      creator_email: email || undefined,
      creator_message: message || '',
    };
  }

  // Form Getter
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get body() {
    return this.form.get('body') as FormGroup;
  }

  get title() {
    return this.body.get('title');
  }

  get routine() {
    return this.body.get('routine');
  }

  get category() {
    return this.body.get('category');
  }

  get newCategory() {
    return this.body.get('newCategory');
  }

  get subCategory() {
    return this.body.get('subCategory');
  }

  get newSubCategory() {
    return this.body.get('newSubCategory');
  }

  get message() {
    return this.form.get('message');
  }

  // Conditions
  hasInput(field: AbstractControl<string | null, string | null> | null) {
    return (field?.dirty || field?.touched) && !field?.pristine;
  }
}