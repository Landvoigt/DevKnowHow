import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://f6acdd4ff86edf008381319ccb346255@o4509323430395904.ingest.de.sentry.io/4510686151508048",
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
