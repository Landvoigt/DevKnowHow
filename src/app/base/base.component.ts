import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { fadeInSuperSlow } from '@utils/animations';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { RouterOutlet } from '@angular/router';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
  animations: [fadeInSuperSlow]
})
export class BaseComponent {
  categories: Category[] = [];
  closeMenu: boolean = false;

  constructor(private rest: RestService, private error: ErrorService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.rest.getCategories().subscribe({
      next: (cats: Category[]) => {
        this.categories = cats || [];
        console.log(this.categories)
      },
      error: (error) => this.error.handleHttpError(error, {}),
      complete: () => { }
    });
  }

  closeUserMenu() {
    this.closeMenu = true;
    setTimeout(() => this.closeMenu = false, 10);
  }
}