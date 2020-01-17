import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class FaqListService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getFaqs(limit?: number, pageNo?: number, searchString?: string,
    sortType?: string, sortBy?: string, topicName?: string, subTopicName?: string,
    question?: string, selectedStatus?: string, startDate?: string, endDate?: string): Observable<any> {
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
    if (topicName) {
      params = params + `&topicName=${topicName}`;
    }
    if (subTopicName) {
      params = params + `&subtopicName=${subTopicName}`;
    }
    if (question) {
      params = params + `&question=${question}`;
    }
    if (selectedStatus) {
      params = params + `&is_active=${selectedStatus}`;
    }
    if (startDate) {
      params = params + `&fromDate=${startDate}`;
    }
    if (endDate) {
      params = params + `&toDate=${endDate}`;
    }
    return httpClient.get(`${environment.origin}/listFaq?${params}`);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateFaq(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/active-deactive`, data);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public approveRejectFaq(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/sp-approve`, data);
  }

  public fetchParentTopics():  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/getTopics`);
  }


}
