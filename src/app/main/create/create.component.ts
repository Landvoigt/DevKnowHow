import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { ErrorService } from '@services/error.service';
import { RestService } from '@services/rest.service';
import { createForm, CreateFormModel } from '@interfaces/create.interface';
import { fadeIn } from '@utils/animations';
import { CommandRequest } from '@models/requests.model';
import { Category } from '@interfaces/category.interface';

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

  commandTyped: boolean = false;
  descriptionTyped: boolean = false;

  constructor(
    private restService: RestService,
    private errorService: ErrorService,
    private alertService: AlertService, private rest: RestService, private error: ErrorService) { }

  get name() {
    return this.createForm.get('name');
  }

  get email() {
    return this.createForm.get('email');
  }

  get body() {
    return this.createForm.get('body') as FormGroup;
  }

  get category() {
    return this.body.get('category');
  }

  get newCategory() {
    return this.body.get('newCategory');
  }

  get command() {
    return this.body.get('command');
  }

  get description() {
    return this.body.get('description');
  }

  get message() {
    return this.createForm.get('message');
  }

  ngOnInit(): void {
    this.loadCategories();
    this.setupCategoryListener();
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

  checkNewCategorySelection() {
    const selectedType = this.category?.value;
    this.newCatSelected = selectedType === 'new';
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

  getRequest(bodyValue: any, name: string | null | undefined, email: string | null | undefined, message: string | null | undefined) {
    return {
      command: bodyValue.command,
      category: bodyValue.category,
      sub_category: bodyValue.subCategory || '',
      description: bodyValue.description,
      example: bodyValue.example || '',
      param: bodyValue.param || '',
      creator_name: name || undefined,
      creator_email: email || undefined,
      creator_message: message || '',
    };
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
}