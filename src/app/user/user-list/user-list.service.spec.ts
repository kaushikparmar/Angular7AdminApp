/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserListService } from './user-list.service';
import { SharedModule } from 'src/common/modules/shared.module';

xdescribe('Service: UserList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserListService],
      imports: [
        SharedModule
      ]
    });
  });

  it('should ...', inject([UserListService], (service: UserListService) => {
    expect(service).toBeTruthy();
  }));
});
