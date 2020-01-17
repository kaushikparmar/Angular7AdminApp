/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreedListService } from './breed-list.service';

describe('Service: BreedList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreedListService]
    });
  });

  it('should ...', inject([BreedListService], (service: BreedListService) => {
    expect(service).toBeTruthy();
  }));
});
