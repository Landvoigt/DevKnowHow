import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {

  constructor(public navService: NavigationService) { }

}
