import { TestBed } from '@angular/core/testing';

import { InappropriateDetailsServiceService } from './inappropriate-details-service.service';

describe('InappropriateDetailsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InappropriateDetailsServiceService = TestBed.get(InappropriateDetailsServiceService);
    expect(service).toBeTruthy();
  });
});
