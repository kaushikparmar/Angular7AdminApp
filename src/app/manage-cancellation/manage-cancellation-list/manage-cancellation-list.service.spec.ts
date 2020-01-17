import { TestBed } from '@angular/core/testing';

import { ManageCancellationListService } from './manage-cancellation-list.service';

describe('ManageCancellationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageCancellationListService = TestBed.get(ManageCancellationListService);
    expect(service).toBeTruthy();
  });
});
