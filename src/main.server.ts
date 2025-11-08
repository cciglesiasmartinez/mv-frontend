import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, {
    ...config,
    providers: [
      ...(config.providers || []),
      provideHttpClient(withFetch()), // 👈 añade HttpClient (lado servidor)
    ],
  }, context);

export default bootstrap;