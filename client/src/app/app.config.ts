import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { tokenInterceptor } from './shared/token.interceptors';
import { LoggingInterceptor } from './logging.interceptor';



export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes), 
		importProvidersFrom(HttpClientModule),
		tokenInterceptor
	]
};
