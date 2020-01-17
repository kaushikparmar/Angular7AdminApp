import { TestBed } from '@angular/core/testing';

import { ReviewsRatingsDetailsService } from './reviews-ratings-details.service';

describe('ReviewsRatingsDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewsRatingsDetailsService = TestBed.get(ReviewsRatingsDetailsService);
    expect(service).toBeTruthy();
  });
});
