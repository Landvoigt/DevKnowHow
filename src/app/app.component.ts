import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { BaseComponent } from './base/base.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AlertBoxComponent, BaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
