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
  @Input() currentPage: 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other' = 'bash';
  @Output() pageChanged: EventEmitter<'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other'>
    = new EventEmitter<'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other'>();

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

  changePage(page: 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other') {
    this.closeUserMenu();
    this.closeMobileMenu();
    this.navService.main();
    this.currentPage = page;
    this.pageChanged.emit(page);
    localStorage.setItem('currentPage', page);
  }

  activePage(page: 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other') {
    return this.currentPage === page;
  }

  goToProfiles() {
    this.navService.profiles();
  }


  ngOnDestroy(): void {
  }
}