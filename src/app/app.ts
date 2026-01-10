import { Component, signal } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';

@Component({
  selector: 'app-root',
  imports: [BaseComponent, AlertBoxComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('DevKnowHow');
}
