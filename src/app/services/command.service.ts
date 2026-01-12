import { Injectable, signal } from '@angular/core';
import { AlertService } from './alert.service';
import { RestService } from './rest.service';
import { FlagPipe } from '@pipes/flag.pipe';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  readonly activeItems = signal<Record<number, boolean>>({});

  constructor(private restService: RestService, private alertService: AlertService) { }

  copy(text: string, commandId: number, index: number) {
    const cleanText = FlagPipe.removeFormatting(text);

    navigator.clipboard.writeText(cleanText).then(() => {
      this.setActive(index, true);

      this.alertService.showAlert('Copied!', 'info');

      this.incrementCopyCount(commandId);

      setTimeout(() => {
        this.setActive(index, false);
      }, 775);
    });
  }

  setActive(index: number, value: boolean) {
    this.activeItems.update(items => ({
      ...items,
      [index]: value,
    }));
  }

  showCopiedBanner() {
    this.alertService.showAlert('Copied!', 'info');
  }

  incrementCopyCount(commandId: number) {
    this.restService.incrementCopyCount(commandId).subscribe();
  }

}
