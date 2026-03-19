import { CommonModule } from '@angular/common';
import { Component, input, inject, signal, effect, ViewChild, ElementRef, AfterViewInit, computed } from '@angular/core';
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
export class NavbarComponent implements AfterViewInit {
  @ViewChild('categoryContainer') categoryContainer!: ElementRef<HTMLDivElement>;

  private readonly router = inject(Router);
  public readonly navService = inject(NavigationService);
  public readonly dataService = inject(DataService);

  public readonly categories = this.dataService.categories;

  public readonly userMenuOpen = signal(false);
  public readonly mobileMenuOpen = signal(false);

  closeMenu = input<boolean>(false);

  private scrollLeft = signal(0);
  private scrollWidth = signal(0);
  private clientWidth = signal(0);

  showLeftArrow = computed(() => this.canScroll() && this.scrollLeft() > 0);
  showRightArrow = computed(() => this.canScroll() && this.scrollLeft() + this.clientWidth() < this.scrollWidth() - 1);

  private canScroll = computed(() => this.scrollWidth() > this.clientWidth() + 1);

  constructor() {
    this.dataService.loadCategories();

    effect(() => {
      this.categories();
      this.navService.activeLayout;
      queueMicrotask(() => this.measure());
    });

    effect(() => {
      if (this.closeMenu()) {
        this.closeMobileMenu();
      }
    });
  }

  ngAfterViewInit() {
    const el = this.categoryContainer.nativeElement;

    this.measure();

    el.addEventListener('scroll', () => this.scrollLeft.set(el.scrollLeft));

    new ResizeObserver(() => this.measure()).observe(el);
  }

  private measure() {
    const el = this.categoryContainer?.nativeElement;
    if (!el) return;

    this.scrollLeft.set(el.scrollLeft);
    this.scrollWidth.set(el.scrollWidth);
    this.clientWidth.set(el.clientWidth);
  }

  scrollCategories(amount: number) {
    this.categoryContainer.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }

  changePage(cat: Category) {
    this.closeMobileMenu();
    this.router.navigate([`category/${cat.id}/`]);
  }

  search(query: string) {
    if (!query.trim()) {
      this.cancelSearch(query);
    } else {
      this.dataService.search(query);
    }
  }

  cancelSearch(currentQuery?: string) {
    const query = currentQuery ?? this.dataService.searchQuery;
    this.dataService.clearSearchResults();

    if (query && query.trim()) {
      this.navService.category(1);
    }
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