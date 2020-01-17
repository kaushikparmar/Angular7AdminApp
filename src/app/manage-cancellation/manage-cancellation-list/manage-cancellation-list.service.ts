import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ManageCancellationListService {

  constructor(private injector: Injector) {
  }


  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getUsers(limit?: number, pageNo?: number, searchString?: string, startDate?: string,
    endDate?: string, sortType?: string, sortBy?: string): Observable<any> {
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
    return httpClient.get(`${environment.origin}/get-cancellation/list?${params}`);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/active-deactive`, data);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public approveRejectUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/sp-approve`, data);
  }
}
