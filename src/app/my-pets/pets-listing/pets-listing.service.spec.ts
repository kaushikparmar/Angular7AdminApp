import { TestBed } from '@angular/core/testing';

import { PetsListingService } from './pets-listing.service';

describe('PetsListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetsListingService = TestBed.get(PetsListingService);
    expect(service).toBeTruthy();
  });
});
