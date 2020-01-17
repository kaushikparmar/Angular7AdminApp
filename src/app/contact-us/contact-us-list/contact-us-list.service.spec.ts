/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactUsListService } from './contact-us-list.service';

describe('Service: ContactUsList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactUsListService]
    });
  });

  it('should ...', inject([ContactUsListService], (service: ContactUsListService) => {
    expect(service).toBeTruthy();
  }));
});
