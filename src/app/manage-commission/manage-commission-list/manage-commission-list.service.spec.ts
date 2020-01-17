import { TestBed } from '@angular/core/testing';

import { ManageCommissionListService } from './manage-commission-list.service';

describe('ManageCommissionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageCommissionListService = TestBed.get(ManageCommissionListService);
    expect(service).toBeTruthy();
  });
});
