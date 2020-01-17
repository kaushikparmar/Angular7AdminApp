import { TestBed } from '@angular/core/testing';

import { SetCancellationService } from './set-cancellation.service';

describe('SetCancellationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetCancellationService = TestBed.get(SetCancellationService);
    expect(service).toBeTruthy();
  });
});
