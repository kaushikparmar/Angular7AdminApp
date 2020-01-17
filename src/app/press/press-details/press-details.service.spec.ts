import { TestBed } from '@angular/core/testing';

import { PressDetailsService } from './press-details.service';

describe('PressDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PressDetailsService = TestBed.get(PressDetailsService);
    expect(service).toBeTruthy();
  });
});
