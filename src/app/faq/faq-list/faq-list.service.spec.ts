import { TestBed } from '@angular/core/testing';

import { FaqListService } from './faq-list.service';

describe('FaqListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaqListService = TestBed.get(FaqListService);
    expect(service).toBeTruthy();
  });
});
