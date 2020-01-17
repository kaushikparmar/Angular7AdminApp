import { TestBed } from '@angular/core/testing';

import { PetDetailsService } from './pet-details.service';

describe('PetDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetDetailsService = TestBed.get(PetDetailsService);
    expect(service).toBeTruthy();
  });
});
