import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { RestService } from './rest.service';
import { FlagPipe } from '@pipes/flag.pipe';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  activeItems: { [key: number]: boolean } = {};

  constructor(private restService: RestService, private alertService: AlertService) { }

  copy(text: string, commandId: number, index: number) {
    const cleanText = FlagPipe.removeFormatting((text));
    
    navigator.clipboard.writeText(cleanText).then(() => {
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
