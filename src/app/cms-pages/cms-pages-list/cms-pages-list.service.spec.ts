import { TestBed } from '@angular/core/testing';

import { CmsPagesListService } from './cms-pages-list.service';

describe('FaqListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsPagesListService = TestBed.get(CmsPagesListService);
    expect(service).toBeTruthy();
  });
});
