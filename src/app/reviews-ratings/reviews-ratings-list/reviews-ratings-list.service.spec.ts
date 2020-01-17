import { TestBed } from '@angular/core/testing';

import { ReviewsRatingsListService } from './reviews-ratings-list.service';

describe('ReviewsRatingsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewsRatingsListService = TestBed.get(ReviewsRatingsListService);
    expect(service).toBeTruthy();
  });
});
