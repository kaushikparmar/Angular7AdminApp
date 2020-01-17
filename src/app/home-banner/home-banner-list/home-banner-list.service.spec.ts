import { TestBed } from '@angular/core/testing';

import { HomeBannerListService } from './home-banner-list.service';

describe('FaqListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeBannerListService = TestBed.get(HomeBannerListService);
    expect(service).toBeTruthy();
  });
});
