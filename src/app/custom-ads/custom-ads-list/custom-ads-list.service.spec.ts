import { TestBed } from '@angular/core/testing';

import { CustomAdsListService } from './custom-ads-list.service';

describe('FaqListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomAdsListService = TestBed.get(CustomAdsListService);
    expect(service).toBeTruthy();
  });
});
