import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

@Injectable({ providedIn: 'root' })
export class GraphqlCharacterService {
  private apollo = inject(Apollo);
  private httpLink = inject(HttpLink);

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
