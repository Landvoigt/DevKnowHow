import { Component } from '@angular/core';
import { NavigationService } from '@services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(public navService: NavigationService) { }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}