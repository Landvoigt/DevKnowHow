import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@interfaces/category.interface';
import { NavigationService } from '@services/navigation.service';
import { fadeIn, slideUpDownSlow } from '@utils/animations';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [fadeIn, slideUpDownSlow]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Input() closeMenu: boolean = false;
  
  userMenuOpen: boolean = false;
  mobileMenuOpen: boolean = false;

  constructor(public navService: NavigationService, private router: Router) { }

  ngOnInit(): void { }

  ngOnChanges() {
    if (this.closeMenu) {
      this.closeUserMenu();
      this.closeMobileMenu();
    }
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu() {
    if (this.userMenuOpen) {
      this.userMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  changePage(cat: Category) {
    this.closeUserMenu();
    this.closeMobileMenu();
    this.router.navigate([`category/${cat.id}/`])
    // this.navService.base();
    // this.currentPage = page;
    // this.pageChanged.emit(page);
    // localStorage.setItem('currentPage', page);
  }

  // activePage(cat: Category) {
  //   return this.currentPage === cat.id;
  // }

  goToProfiles() {
    // this.navService.profiles();
  }

  ngOnDestroy(): void { }
}