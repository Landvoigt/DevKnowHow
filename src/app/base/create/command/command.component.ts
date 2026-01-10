import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, signal, computed, effect, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, FilterPipe],
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(window:beforeunload)': 'saveOnUnload($event)'
  }
})
export class CommandComponent implements OnInit {
  @ViewChild('commandInput', { static: true }) commandInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput', { static: true }) descriptionInput!: ElementRef<HTMLTextAreaElement>;

  private readonly restService = inject(RestService);
  private readonly errorService = inject(ErrorService);
  private readonly alertService = inject(AlertService);
  private readonly dataService = inject(DataService);
  public readonly navService = inject(NavigationService);

  public readonly form: FormGroup<CreateFormCommandModel> = createFormCommand();

  public readonly categories = this.dataService.categories;

  public readonly loading = signal(false);

  public readonly newCatSelected = signal(false);

  public readonly commandTyped = signal(false);
  public readonly descriptionTyped = signal(false);

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

  onSubmitCommand() {
    if (this.form.valid) {
      this.loading.set(true);

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
    this.loading.set(false);
  }

  onCreationError(err: any) {
    this.errorService.handleContactError(err);
    this.loading.set(false);
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.commandInput?.nativeElement.contains(target) && this.commandTyped()) {
      this.commandTyped.set(false);
    }
    if (!this.descriptionInput?.nativeElement.contains(target) && this.descriptionTyped()) {
      this.descriptionTyped.set(false);
    }
  }

  checkInput(nativeElement: HTMLInputElement | HTMLTextAreaElement) {
    const value = nativeElement.value;

    if (nativeElement === this.commandInput.nativeElement) {
      this.commandTyped.set(value.length > 2);
    } else if (nativeElement === this.descriptionInput.nativeElement) {
      this.descriptionTyped.set(value.length > 2);
    }
  }

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
}