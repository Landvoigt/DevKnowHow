import { CommonModule } from '@angular/common';
import { Component, input, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '@interfaces/category.interface';
import { FilterPipe } from '@pipes/filter.pipe';
import { DataService } from '@services/data.service';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, FilterPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  closeMenu = input<boolean>(false);

  public readonly navService = inject(NavigationService);
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  public readonly categories = this.dataService.categories;

  public readonly userMenuOpen = signal(false);
  public readonly mobileMenuOpen = signal(false);

  constructor() {
    this.dataService.loadCategories();

    effect(() => {
      if (this.closeMenu()) {
        this.closeMobileMenu();
      }
    });
  }

  changePage(cat: Category) {
    this.closeMobileMenu();
    this.router.navigate([`category/${cat.id}/`]);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  toggleUserMenu() {
    this.userMenuOpen.update(open => !open);
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }
}