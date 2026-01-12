import { Injectable, signal } from '@angular/core';
import { Alert } from '@interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  readonly alert = signal<Alert | null>(null);

  showAlert(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.alert.set({ message, type });

    setTimeout(() => {
      this.clearAlert();
    }, 2750);
  }

  clearAlert() {
    this.alert.set(null);
  }
}