import { TestBed } from '@angular/core/testing';

import { RewardListService } from './reward-list.service';

describe('RewardListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardListService = TestBed.get(RewardListService);
    expect(service).toBeTruthy();
  });
});
