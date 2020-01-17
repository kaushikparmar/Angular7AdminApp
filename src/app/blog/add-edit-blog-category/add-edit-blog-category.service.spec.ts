import { TestBed } from '@angular/core/testing';

import { AddEditBlogCategoryService } from './add-edit-blog-category.service';

describe('AddEditBlogCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditBlogCategoryService = TestBed.get(AddEditBlogCategoryService);
    expect(service).toBeTruthy();
  });
});
