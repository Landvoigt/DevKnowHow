import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { ErrorService } from '@services/error.service';
import { RestService } from '@services/rest.service';
import { createForm, CreateFormModel } from '@interfaces/create.interface';
import { fadeIn } from '@utils/animations';
import { CommandRequest } from '@models/requests.model';
import { Category } from '@interfaces/category.interface';
// import { data } from '@models/command.model';
// import { concatMap, from } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  animations: [fadeIn]
})
export class CreateComponent implements OnInit {
  @ViewChild('commandInput', { static: true }) commandInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput', { static: true }) descriptionInput!: ElementRef<HTMLTextAreaElement>;

  public createForm: FormGroup<CreateFormModel> = createForm();

  categories: Category[] = [];

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
    private rest: RestService,
    private error: ErrorService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.setupCategoryListener();
    this.setupSubCategoryListener();
  }

  loadCategories() {
    this.rest.getCategories().subscribe({
      next: (cats: Category[]) => {
        this.categories = cats || [];
      },
      error: (error) => this.error.handleHttpError(error, {}),
      complete: () => { }
    });
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

  checkNewCategorySelection() {
    const selectedType = this.category?.value;
    this.newCatSelected = selectedType === 'new';
  }

  checkNewSubCategorySelection() {
    const selectedType = this.subCategory?.value;
    this.newSubCatSelected = selectedType === 'new';
  }

  closeUserMenu() {
    this.closeMenu = true;
    setTimeout(() => this.closeMenu = false, 10);
  }

  onSubmit() {
    if (this.createForm.valid) {
      const { name, email, message } = this.createForm.value;
      const bodyValue = this.body.value;

      if (this.category && this.newCategory?.value != null) {
        bodyValue.category = this.newCategory.value;
      }

      const commandPayload: CommandRequest = this.getRequest(bodyValue, name, email, message);

      this.loading = true;
      this.restService.createCommand(commandPayload).subscribe({
        next: (response) => {
          this.alertService.showAlert('Thank you for your submission!', 'success');
          this.createForm.reset();
          this.loading = false;
        },
        error: (err) => {
          this.errorService.handleContactError(err);
          this.loading = false;
        },
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.commandInput.nativeElement.contains(target) && this.commandTyped) {
      this.commandTyped = false;
    }
    if (!this.descriptionInput.nativeElement.contains(target) && this.descriptionTyped) {
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

  // Getter
  getRequest(bodyValue: any, name: string | null | undefined, email: string | null | undefined, message: string | null | undefined) {
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

  getSubCategories() {
    return this.categories.find((cat: Category) => cat.title === this.category?.value)?.sub_categories || [];
  }

  // Form Getter
  get name() {
    return this.createForm.get('name');
  }

  get email() {
    return this.createForm.get('email');
  }

  get body() {
    return this.createForm.get('body') as FormGroup;
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
    return this.createForm.get('message');
  }

  // Conditions
  hasInput(field: AbstractControl<string | null, string | null> | null) {
    return (field?.dirty || field?.touched) && !field?.pristine;
  }

  // data: any = data;
  // onBatchSubmit() {
  //   if (!this.data || this.data.length === 0) {
  //     this.alertService.showAlert('No items to submit.', 'warning');
  //     return;
  //   }

  //   this.loading = true;

  //   from(this.data)
  //     .pipe(
  //       concatMap((item: any) => {
  //         // item.param = DIRECT_ACTIVATION_PASSWORD;
  //         const adminRequest: CommandRequest = this.getAdminRequest(item);
  //         return this.restService.createCommand(adminRequest);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Item submitted successfully', response);
  //       },
  //       error: (err) => {
  //         this.errorService.handleContactError(err);
  //       },
  //       complete: () => {
  //         this.alertService.showAlert('All items were submitted successfully!', 'success');
  //         this.loading = false;
  //       },
  //     });
  // }

  // getAdminRequest(bodyValue: any) {
  //   return {
  //     command: bodyValue.command,
  //     category: bodyValue.category,
  //     sub_category: bodyValue.subType || '',
  //     description: bodyValue.description,
  //     example: bodyValue.example || '',
  //     param: bodyValue.param || '',
  //     creator_name: "ADMIN",
  //     creator_email: "timvoigt1996@gmail.com",
  //     creator_message: "",
  //   };
  // }
}