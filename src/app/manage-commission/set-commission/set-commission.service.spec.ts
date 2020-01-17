import { TestBed } from '@angular/core/testing';

import { SetCommissionService } from './set-commission.service';

describe('SetCommissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetCommissionService = TestBed.get(SetCommissionService);
    expect(service).toBeTruthy();
  });
});
