import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { environment } from './environments/environment';

import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: environment.sentryDsn,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracePropagationTargets: [
    'localhost',
    '127.0.0.1',
    'devknowhow-server.timvoigt.ch',
    /^https:\/\/devknowhow-server\.timvoigt\.ch\/api/
  ],
  tracesSampleRate: 1.0,
  sendDefaultPii: true
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
