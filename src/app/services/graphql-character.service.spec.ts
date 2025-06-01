import { TestBed } from '@angular/core/testing';

import { GraphqlCharacterService } from './graphql-character.service';

describe('GraphqlCharacterService', () => {
  let service: GraphqlCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
