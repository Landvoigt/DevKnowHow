import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { fadeIn, slideUpDownSlow } from '../utils/animations';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [fadeIn, slideUpDownSlow]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() closeMenu: boolean = false;
  @Input() currentPage: 'dashboard' | 'films' | 'series' | 'playlist' = 'dashboard';
  @Output() pageChanged: EventEmitter<'dashboard' | 'films' | 'series' | 'playlist'> = new EventEmitter<'dashboard' | 'films' | 'series' | 'playlist'>();

  userMenuOpen: boolean = false;
  mobileMenuOpen: boolean = false;

  constructor(public navService: NavigationService) { }

  ngOnInit(): void {
  }

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

  changePage(page: 'dashboard' | 'films' | 'series' | 'playlist') {
    this.closeUserMenu();
    this.closeMobileMenu();
    this.navService.main();
    this.currentPage = page;
    this.pageChanged.emit(page);
    localStorage.setItem('currentPage', page);
  }

  activePage(page: 'dashboard' | 'films' | 'series' | 'playlist') {
    return this.currentPage === page;
  }

  goToProfiles() {
    this.navService.profiles();
  }


  ngOnDestroy(): void {
  }
}