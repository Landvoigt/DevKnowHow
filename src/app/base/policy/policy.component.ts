import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationService } from '@services/navigation.service';
import { fadeIn } from '@utils/animations';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
  animations: [fadeIn]
})
export class PolicyComponent {

  constructor(public navService: NavigationService) { }

}
