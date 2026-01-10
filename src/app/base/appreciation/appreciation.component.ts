import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'app-appreciation',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './appreciation.component.html',
  styleUrl: './appreciation.component.scss',
})
export class AppreciationComponent {

  constructor(public navService: NavigationService) { }
  
}
