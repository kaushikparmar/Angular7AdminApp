import { TestBed } from '@angular/core/testing';

import { NotificationListService } from './notification-list.service';

describe('NotificationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationListService = TestBed.get(NotificationListService);
    expect(service).toBeTruthy();
  });
});
