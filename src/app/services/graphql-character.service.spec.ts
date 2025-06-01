// src/app/services/graphql-character.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class GraphqlCharacterService {
  constructor(private apollo: Apollo) {}

  getCharacterWithResidents(id: string) {
    return this.apollo.query<any>({
      query: gql`
        query GetCharacterWithResidents($id: ID!) {
          character(id: $id) {
            id
            name
            image
            status
            species
            type
            gender
            created
            origin {
              name
              residents {
                id
                name
                image
              }
            }
            location {
              name
              residents {
                id
                name
                image
              }
            }
            episode {
              id
              name
            }
          }
        }
      `,
      variables: { id }
    });
  }
}
