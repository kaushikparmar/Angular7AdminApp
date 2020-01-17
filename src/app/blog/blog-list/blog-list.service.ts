import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BlogListService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */

  public getBlogsList(limit?: number, pageNo?: number, searchString?: string,
    filterTitle?: string, filterStatus?: string, filterCategory?: string,
    sortType?: string, sortBy?: string, startDate?: string, endDate?: string): Observable<any> {
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
    if (filterTitle && filterTitle.trim()) {
      params = params + `&title=${filterTitle.trim()}`;
    }
    if (filterStatus && filterStatus.trim()) {
      params = params + `&is_published=${filterStatus.trim()}`;
    }
    if (filterCategory && filterCategory) {
      params = params + `&category=${filterCategory}`;
    }
    if (sortType) {
      params = params + `&sortType=${sortType}`;
    }
    if (sortBy) {
      params = params + `&sortBy=${sortBy}`;
    }
    if (startDate) {
      params = params + `&fromDate=${startDate}`;
    }
    if (endDate) {
      params = params + `&toDate=${endDate}`;
    }
    params = params + `&expose=0&isAdmin=1`;
    return httpClient.get(`${environment.origin}/blog/list?${params}`);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/blog/changeStatus`, data);
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

  // To get category list for filter category dropdown
  public petTypeDataRequest(): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/pet-type/list`);
  }

}
