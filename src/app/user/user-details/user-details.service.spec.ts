import { TestBed } from '@angular/core/testing';

import { UserDetailsService } from './user-details.service';

describe('UserDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDetailsService = TestBed.get(UserDetailsService);
    expect(service).toBeTruthy();
  });
});
