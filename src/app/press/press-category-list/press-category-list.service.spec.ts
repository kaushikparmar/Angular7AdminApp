/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PressCategoryListService } from './press-category-list.service';
import { SharedModule } from '../../../common/modules/shared.module';

xdescribe('Service: UserList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PressCategoryListService],
      imports: [
        SharedModule
      ]
    });
  });

  it('should ...', inject([PressCategoryListService], (service: PressCategoryListService) => {
    expect(service).toBeTruthy();
  }));
});
