import { TestBed } from '@angular/core/testing';

import { PressCategoryDetailsService } from './press-category-details.service';

describe('AddEditBlogCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PressCategoryDetailsService = TestBed.get(PressCategoryDetailsService);
    expect(service).toBeTruthy();
  });
});
