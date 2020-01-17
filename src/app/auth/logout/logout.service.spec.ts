/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogoutService } from './logout.service';
import { SharedModule } from 'src/common/modules/shared.module';

describe('Service: Logout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutService],
      imports: [
        SharedModule
      ]
    });
  });

  it('should ...', inject([LogoutService], (service: LogoutService) => {
    expect(service).toBeTruthy();
  }));
});
