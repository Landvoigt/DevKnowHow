import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, HttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './app-translate-loader';
import { languageInterceptor } from './interceptors/language.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation()
    ),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([languageInterceptor])
    ),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: () => createTranslateLoader(inject(HttpClient)),
        }
      })
    ])
  ]
};