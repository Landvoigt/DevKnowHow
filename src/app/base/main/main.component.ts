import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationService } from '@services/navigation.service';
import { fadeIn } from '@utils/animations';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeIn]
})
export class MainComponent {

  constructor(public navService: NavigationService) { }

  selectLayout(layout: 'command' | 'routine' | 'smt') {
    this.navService.activeLayout = layout;
  }

}
