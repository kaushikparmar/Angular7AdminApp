import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RewardHistoryListService {

  constructor(private injector: Injector) {
  }

  public getRewards(listType?: boolean ,  searchString?: any , limit?: number, pageNo?: number,
    userName?: string, eventName?: string, filterType?: string, startDate?: string,
    endDate?: string, sortType?: string, sortBy?: string): Observable<any> {
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
      if (userName && userName.trim()) {
        params = params + `&name=${userName.trim()}`;
      }
      if (eventName && eventName.trim()) {
        params = params + `&event_name=${eventName.trim()}`;
      }
      if (filterType) {
        params = params + `&type=${filterType}`;
      }
      if (startDate) {
        params = params + `&fromDate=${startDate}`;
      }
      if (endDate) {
        params = params + `&toDate=${endDate}`;
      }
      if (sortType) {
        params = params + `&sortType=${sortType}`;
      }
      if (sortBy) {
        params = params + `&sortBy=${sortBy}`;
      }
    } else {
      params =  `id=${searchString}`;
    }
    return httpClient.get(`${environment.origin}/admin/rewards-history/list?${params}`);
  }









  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateReward(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/active-deactive`, data);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public approveRejectReward(data: any): Observable<any> {
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
