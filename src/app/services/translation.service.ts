import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private defaultLanguage: string = 'en';
  public currentLanguage: string = 'en';
  public languageChanged: BehaviorSubject<string> = new BehaviorSubject(this.currentLanguage);

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language') || this.defaultLanguage;
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.languageChanged.next(lang);
  }

  getLanguage(): string {
    return this.translate.currentLang || this.defaultLanguage;
  }

  translateMessage(key: string): Observable<string> {
    return this.translate.get(key);
  }
}
