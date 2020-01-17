/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreedDetailService } from './breed-detail.service';

describe('Service: BreedDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreedDetailService]
    });
  });

  it('should ...', inject([BreedDetailService], (service: BreedDetailService) => {
    expect(service).toBeTruthy();
  }));
});
