import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { fadeInSuperSlow } from '@utils/animations';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { RouterOutlet } from '@angular/router';
import { Category } from '@interfaces/category.interface';
import { data } from '@models/command.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeInSuperSlow]
})
export class MainComponent {
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