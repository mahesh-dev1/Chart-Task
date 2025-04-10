import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { AppComponent } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideClientHydration(),
              importProvidersFrom(ReactiveFormsModule, FormsModule),
              // standaloneComponents: [AppComponent, ChartFormComponent, ChartComponent]
            ]
};
