import { ApplicationConfig, ErrorHandler, importProvidersFrom, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Router, withInMemoryScrolling } from '@angular/router';

import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { languageInterceptor } from './interceptors/language.interceptor';
import { CustomTranslateLoader } from './app-translate-loader';
import { routes } from './app.routes';

import * as Sentry from "@sentry/angular";

export function createTranslateLoader(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideHttpClient(withFetch(), withInterceptors([languageInterceptor])),
    importProvidersFrom([
      TranslateModule.forRoot({
        fallbackLang: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        }
      })
    ]),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
  ]
};
