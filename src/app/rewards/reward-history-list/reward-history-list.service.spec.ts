import { TestBed } from '@angular/core/testing';

import { RewardHistoryListService } from './reward-history-list.service';

describe('RewardHistoryListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardHistoryListService = TestBed.get(RewardHistoryListService);
    expect(service).toBeTruthy();
  });
});
