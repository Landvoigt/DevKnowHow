import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadeIn } from '@utils/animations';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
  animations: [fadeIn]
})
export class ImprintComponent {

}
