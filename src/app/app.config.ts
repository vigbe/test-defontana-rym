// src/app/app.config.ts
import { ApplicationConfig, inject } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'https://rickandmortyapi.com/graphql' }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
