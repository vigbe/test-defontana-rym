import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // HttpClient usando fetch para SSR
    importProvidersFrom(HttpLink),  // Importa HttpLink para Apollo
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://rickandmortyapi.com/graphql'
        })
      };
    }),
    // ...otros providers si tienes
  ]
};
