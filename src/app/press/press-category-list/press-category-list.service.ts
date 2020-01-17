import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PressCategoryListService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */

  public getBlogsList(limit?: number, pageNo?: number, searchString?: string,
    filterTitle?: string, selectedStatus?: string, sortType?: string,
    sortBy?: string): Observable<any> {
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
    if (filterTitle) {
      params = params + `&title=${filterTitle}`;
    }
    if (selectedStatus) {
      params = params + `&status=${selectedStatus}`;
    }
    if (sortType) {
      params = params + `&sortType=${sortType}`;
    }
    if (sortBy) {
      params = params + `&sortBy=${sortBy}`;
    }
    // params = params + `&expose=0&isAdmin=1`;
    return httpClient.get(`${environment.origin}/master/listpresscategory?${params}`);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/master/updatepresscategory`, data);
  }

}
