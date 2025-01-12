import { Injectable } from '@angular/core';
import { Command } from '@models/command.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  activeItems: { [key: number]: boolean } = {};

  constructor(private alertService: AlertService) { }

  copy(item: Command, index: number) {
    navigator.clipboard.writeText(item.command).then(() => {

      this.activeItems[index] = true;
      this.showCopiedBanner();

      setTimeout(() => {
        this.activeItems[index] = false;
      }, 775);
    }).catch(err => { throw err });
  }

  showCopiedBanner() {
    this.alertService.showAlert('Copied!', 'info');
  }

}
