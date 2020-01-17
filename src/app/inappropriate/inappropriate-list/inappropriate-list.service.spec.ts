import { TestBed } from '@angular/core/testing';

import { InappropriateListService } from './inappropriate-list.service';

describe('InappropriateListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InappropriateListService = TestBed.get(InappropriateListService);
    expect(service).toBeTruthy();
  });
});
