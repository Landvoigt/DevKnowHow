import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '@interfaces/category.interface';
import { createFormCommand, CreateFormCommandModel } from '@interfaces/create.interface';
import { CommandRequest } from '@models/requests.model';
import { FilterPipe } from '@pipes/filter.pipe';
import { AlertService } from '@services/alert.service';
import { DataService } from '@services/data.service';
import { ErrorService } from '@services/error.service';
import { NavigationService } from '@services/navigation.service';
import { RestService } from '@services/rest.service';
import { map, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, FilterPipe],
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss'
})
export class CommandComponent {
  @ViewChild('commandInput', { static: true }) commandInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput', { static: true }) descriptionInput!: ElementRef<HTMLTextAreaElement>;

  public form: FormGroup<CreateFormCommandModel> = createFormCommand();

  categories$: Observable<Category[]> = this.dataService.categories$;

  loading: boolean = false;
  closeMenu: boolean = false;

  newCatSelected: boolean = false;
  newSubCatSelected: boolean = false;

  commandTyped: boolean = false;
  descriptionTyped: boolean = false;

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
    const savedData = sessionStorage.getItem('DevKnowHow_unsavedCommandItem');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.form.patchValue(parsedData);
    }
  }

  cacheOpenItem() {
    const formData = this.form.getRawValue();
    sessionStorage.setItem('DevKnowHow_unsavedCommandItem', JSON.stringify(formData));
  }

  checkNewCategorySelection() {
    const selectedType = this.category?.value;
    this.newCatSelected = selectedType === 'new';
  }

  checkNewSubCategorySelection() {
    const selectedType = this.subCategory?.value;
    this.newSubCatSelected = selectedType === 'new';
  }

  onSubmitCommand() {
    if (this.form.valid) {
      this.loading = true;

      const { name, email, message } = this.form.value;
      const bodyValue = this.getBodyValues();
      const payload: CommandRequest = this.getCommandRequest(bodyValue, name, email, message);

      this.restService.createCommand(payload).subscribe({
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
    sessionStorage.removeItem('DevKnowHow_unsavedCommandItem');
    this.loading = false;
  }

  onCreationError(err: any) {
    this.errorService.handleContactError(err);
    this.loading = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.commandInput?.nativeElement.contains(target) && this.commandTyped) {
      this.commandTyped = false;
    }
    if (!this.descriptionInput?.nativeElement.contains(target) && this.descriptionTyped) {
      this.descriptionTyped = false;
    }
  }

  checkInput(nativeElement: HTMLInputElement | HTMLTextAreaElement) {
    const value = nativeElement.value;

    if (nativeElement === this.commandInput.nativeElement) {
      this.commandTyped = value.length > 2;
    } else if (nativeElement === this.descriptionInput.nativeElement) {
      this.descriptionTyped = value.length > 2;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  saveOnUnload(event: BeforeUnloadEvent) {
    this.cacheOpenItem();
  }

  // Getter
  getCommandRequest(bodyValue: any, name: string | null | undefined, email: string | null | undefined, message: string | null | undefined): CommandRequest {
    return {
      command: bodyValue.command,
      description: bodyValue.description,
      category: bodyValue.category,
      sub_category: bodyValue.subCategory || '',
      example: bodyValue.example || '',
      tooltip: bodyValue.tooltip || '',
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

  get command() {
    return this.body.get('command');
  }

  get description() {
    return this.body.get('description');
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

  get example() {
    return this.body.get('example');
  }

  get tooltip() {
    return this.body.get('tooltip');
  }

  get message() {
    return this.form.get('message');
  }

  // Conditions
  hasInput(field: AbstractControl<string | null, string | null> | null) {
    return (field?.dirty || field?.touched) && !field?.pristine;
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