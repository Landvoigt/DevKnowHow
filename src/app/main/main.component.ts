import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { BashComponent } from './sites/bash/bash.component';
import { CmdComponent } from './sites/cmd/cmd.component';
import { DockerComponent } from './sites/docker/docker.component';
import { GitComponent } from './sites/git/git.component';
import { NgDefaultsComponent } from './sites/ng-defaults/ng-defaults.component';
import { NgSetupComponent } from './sites/ng-setup/ng-setup.component';
import { SqlComponent } from './sites/sql/sql.component';
import { OtherComponent } from './sites/other/other.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, BashComponent, CmdComponent, DockerComponent, GitComponent, NgDefaultsComponent, NgSetupComponent, SqlComponent, OtherComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  currentPage: 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other'  = 'bash';
  closeMenu: boolean = false;

  constructor() { }

  ngOnInit() {
    this.loadCurrentPage();
  }

  loadCurrentPage() {
    const storedPage = localStorage.getItem('currentPage') as 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other';
    if (storedPage) {
      this.currentPage = storedPage;
    }
  }

  onPageChanged(page: 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other') {
    this.currentPage = page;
  }

  activePage(page: 'bash' | 'cmd' | 'git' | 'sql' | 'docker' | 'ng_setup' | 'ng_defaults' | 'other') {
    return this.currentPage === page;
  }

  closeUserMenu() {
    this.closeMenu = true;
    setTimeout(() => this.closeMenu = false, 10);
  }
}
