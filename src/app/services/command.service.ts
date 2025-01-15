import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  activeItems: { [key: number]: boolean } = {};

  constructor(private restService: RestService, private alertService: AlertService) { }

  copy(text: string, commandId: number, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      this.activeItems[index] = true;
      this.showCopiedBanner();

      this.incrementCopyCount(commandId);

      setTimeout(() => {
        this.activeItems[index] = false;
      }, 775);
    }).catch(err => { throw err });
  }

  showCopiedBanner() {
    this.alertService.showAlert('Copied!', 'info');
  }

  incrementCopyCount(commandId: number) {
    this.restService.incrementCopyCount(commandId).subscribe();
  }

}
