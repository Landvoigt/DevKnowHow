import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { fadeInSuperSlow } from '@utils/animations';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
  animations: [fadeInSuperSlow]
})
export class BaseComponent {
  closeMenu: boolean = false;

  closeUserMenu() {
    this.closeMenu = true;
    setTimeout(() => this.closeMenu = false, 10);
  }
}