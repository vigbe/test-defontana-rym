import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom, inject } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        importProvidersFrom(BrowserModule, MatTableModule, FormsModule),
        provideAnimationsAsync(),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: '<%= endpoint %>',
        }),
        cache: new InMemoryCache(),
      };
    })
    ]
})
  .catch(err => console.error(err));
