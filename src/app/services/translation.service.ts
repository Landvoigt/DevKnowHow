import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translate = inject(TranslateService);

  private readonly defaultLanguage = 'en';

  readonly language = signal<string>(this.defaultLanguage);

  constructor() {
    const savedLang = localStorage.getItem('language') ?? this.defaultLanguage;
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.language.set(lang);
  }

  translateInstant(key: string, params?: Record<string, any>): string {
    return this.translate.instant(key, params);
  }

}
