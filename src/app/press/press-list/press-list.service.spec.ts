/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PressListService } from './press-list.service';
import { SharedModule } from '../../../common/modules/shared.module';

xdescribe('Service: UserList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PressListService],
      imports: [
        SharedModule
      ]
    });
  });

  it('should ...', inject([PressListService], (service: PressListService) => {
    expect(service).toBeTruthy();
  }));
});
