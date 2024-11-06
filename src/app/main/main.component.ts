import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  currentPage: 'dashboard' | 'films' | 'series' | 'playlist' = 'dashboard';
  closeMenu: boolean = false;

  constructor() { }

  ngOnInit() {
    this.loadCurrentPage();
  }

  loadCurrentPage() {
    const storedPage = localStorage.getItem('currentPage') as 'dashboard' | 'films' | 'series' | 'playlist';
    if (storedPage) {
      this.currentPage = storedPage;
    }
  }

  onPageChanged(page: 'dashboard' | 'films' | 'series' | 'playlist') {
    this.currentPage = page;
  }

  activePage(page: 'dashboard' | 'films' | 'series' | 'playlist') {
    return this.currentPage === page;
  }

  closeUserMenu() {
    this.closeMenu = true;
    setTimeout(() => this.closeMenu = false, 10);
  }
}
