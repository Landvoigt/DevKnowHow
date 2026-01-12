import { Component, computed, inject } from '@angular/core';
import { AlertService } from '@services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.scss',
})
export class AlertBoxComponent {
  private alertService = inject(AlertService);

  alert = this.alertService.alert;

  message = computed(() => this.alert()?.message ?? '');
  type = computed(() => this.alert()?.type ?? 'info');

  close() {
    this.alertService.clearAlert();
  }
  
}
