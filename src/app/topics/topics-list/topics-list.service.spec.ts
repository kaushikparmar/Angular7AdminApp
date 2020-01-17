/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {TopicsListService} from './../topics-list/topics-list.service';

describe('Service: TopicsList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicsListService]
    });
  });

  it('should ...', inject([TopicsListService], (service: TopicsListService) => {
    expect(service).toBeTruthy();
  }));
});
