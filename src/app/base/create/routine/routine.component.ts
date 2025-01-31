import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
import { debounceTime, map, Observable } from 'rxjs';
import { ContentEditableDirective } from 'src/app/directives/content-editable.directive';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, FilterPipe, ContentEditableDirective],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss'
})
export class RoutineComponent {
  @ViewChild('routineInput', { static: true }) routineInput!: ElementRef<HTMLDivElement>;

  public form: FormGroup<CreateFormRoutineModel> = createFormRoutine();

  categories$: Observable<Category[]> = this.dataService.categories$;

  loading: boolean = false;
  closeMenu: boolean = false;

  newCatSelected: boolean = false;
  newSubCatSelected: boolean = false;

  routineTyped: boolean = false;

  constructor(
    private restService: RestService,
    private errorService: ErrorService,
    private alertService: AlertService,
    private dataService: DataService,
    public navService: NavigationService) {

    this.setupCaching();
  }

  ngOnInit(): void {
    this.loadCachedItem();
    this.dataService.loadCategories();
    this.setupCategoryListener();
    this.setupSubCategoryListener();
    this.setupDefaultCategory();
  }

  setupCategoryListener() {
    this.category?.valueChanges.subscribe(() => {
      this.checkNewCategorySelection();
    });
  }

  setupSubCategoryListener() {
    this.subCategory?.valueChanges.subscribe(() => {
      this.checkNewSubCategorySelection();
    });
  }

  setupDefaultCategory() {
    this.categories$.subscribe(categories => {
      if (categories?.length > 0 && !this.form.get('category')?.value) {
        this.form.patchValue({ body: { category: categories.filter(cat => cat.type === this.navService.activeLayout)[0].title } });
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

  checkNewCategorySelection() {
    const selectedType = this.category?.value;
    this.newCatSelected = selectedType === 'new';
  }

  checkNewSubCategorySelection() {
    const selectedType = this.subCategory?.value;
    this.newSubCatSelected = selectedType === 'new';
  }

  onSubmitRoutine() {
    if (this.form.valid) {
      this.loading = true;

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
    this.setSubCategory(bodyValue);

    return bodyValue;
  }

  setCategory(bodyValue: any) {
    if (this.category && this.newCategory?.value != null) {
      bodyValue.category = this.newCategory.value;
    }
  }

  setSubCategory(bodyValue: any) {
    if (this.subCategory && this.newSubCategory?.value != null) {
      bodyValue.subCategory = this.newSubCategory.value;
    }
  }

  onCreationSubmitted(response: any) {
    this.alertService.showAlert('Thank you for your submission!', 'success');
    this.form.reset();
    sessionStorage.removeItem('DevKnowHow_unsavedRoutineItem');
    this.loading = false;
  }

  onCreationError(err: any) {
    this.errorService.handleContactError(err);
    this.loading = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.routineInput?.nativeElement.contains(target) && this.routineTyped) {
      this.routineTyped = false;
    }
  }

  checkInput(nativeElement: HTMLElement) {
    const value = nativeElement.textContent?.trim() || '';

    if (nativeElement === this.routineInput.nativeElement) {
      this.routineTyped = value.length > 2;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
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

  getSubCategories(): Observable<Category[]> {
    return this.categories$.pipe(
      map(categories => {
        const category = categories.find(cat => cat.title === this.category?.value);
        return category ? category.sub_categories : [];
      })
    );
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
  hasInput(control: AbstractControl<string | null, string | null> | null) {
    return (control?.dirty || control?.touched) && !control?.pristine;
  }

  selectedCatHasSubCategories(): boolean {
    const selectedCategory = this.form.get('body.category')?.value;

    if (!selectedCategory || !this.categories$) {
      return false;
    }

    let hasSubCategories = false;

    this.categories$.subscribe(categories => {
      const category = categories.find(cat => cat.title === selectedCategory);
      if (category && category.sub_categories && category.sub_categories.length > 0) {
        hasSubCategories = true;
      }
    });

    return hasSubCategories;
  }
}