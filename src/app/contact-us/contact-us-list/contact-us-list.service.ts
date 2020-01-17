import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContactUsListService {

  constructor(private injector: Injector) {
  }

  public getContactUsList(listType?: boolean ,  searchString?: any , limit?: number, pageNo?: number,
    sortType?: string, sortBy?: string, filterTopic?: string, startDate?: string,
    endDate?: string): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    let params = '';
    if (listType) {
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
        params = params + `&category_id=${filterTopic}`;
      }
      if (startDate) {
        params = params + `&fromDate=${startDate}`;
      }
      if (endDate) {
        params = params + `&toDate=${endDate}`;
      }
    } else {
      params =  `id=${searchString}`;
    }
    return httpClient.get(`${environment.origin}/get-submit-request/list?${params}`);
  }

  // getting topic list for advance filter dropdown
  public getTopicList(): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/fetchTopics`);
  }
}
