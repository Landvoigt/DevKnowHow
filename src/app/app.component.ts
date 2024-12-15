import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AlertBoxComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
