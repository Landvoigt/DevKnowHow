import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

}
