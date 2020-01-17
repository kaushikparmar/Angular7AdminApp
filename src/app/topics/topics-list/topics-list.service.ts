import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TopicsListService {

  constructor(private injector: Injector) {
  }

  public getTopicsList(limit?: number, pageNo?: number, searchString?: string,
    sortType?: string, sortBy?: string, filterTopic?: string,
    selectedStatus?: string): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    let params = '';
    if (limit) {
      params = params + `limit=${limit}`;
    }
    if (pageNo) {
      params = params + `&page=${pageNo}`;
    }
    if (searchString && searchString.trim()) {
      params = params + `&search=${searchString.trim()}`;
    }
    if (sortType) {
      params = params + `&sortType=${sortType}`;
    }
    if (sortBy) {
      params = params + `&sortBy=${sortBy}`;
    }
    if (filterTopic) {
      params = params + `&name=${filterTopic}`;
    }
    if (selectedStatus) {
      params = params + `&status=${selectedStatus}`;
    }
    return httpClient.get(`${environment.origin}/topicSubTopic?${params}`);
  }
}
