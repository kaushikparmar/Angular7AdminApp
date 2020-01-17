/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogCategoryListService } from './blog-category-list.service';
import { SharedModule } from '../../../common/modules/shared.module';

xdescribe('Service: UserList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogCategoryListService],
      imports: [
        SharedModule
      ]
    });
  });

  it('should ...', inject([BlogCategoryListService], (service: BlogCategoryListService) => {
    expect(service).toBeTruthy();
  }));
});
