/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogListService } from './blog-list.service';
import { SharedModule } from 'src/common/modules/shared.module';

xdescribe('Service: UserList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogListService],
      imports: [
        SharedModule
      ]
    });
  });

  it('should ...', inject([BlogListService], (service: BlogListService) => {
    expect(service).toBeTruthy();
  }));
});
