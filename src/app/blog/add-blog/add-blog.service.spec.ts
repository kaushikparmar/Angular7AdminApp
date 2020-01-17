import { TestBed } from '@angular/core/testing';

import { AddBlogService } from './add-blog.service';

describe('AddBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBlogService = TestBed.get(AddBlogService);
    expect(service).toBeTruthy();
  });
});
