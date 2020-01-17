import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class LostFoundListService {

  constructor(private injector: Injector) {
  }


  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getUsers(limit?: number, pageNo?: number, searchString?: string, filterName?: string,
    filterBreed?: string, filterLocation?: string, filterGender?: string, filterCategory?: string,
    startDate?: string, endDate?: string, sortType?: string, sortBy?: string): Observable<any> {
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
    if (filterName && filterName.trim()) {
      params = params + `&name=${filterName.trim()}`;
    }
    if (filterBreed && filterBreed.trim()) {
      params = params + `&breed=${filterBreed.trim()}`;
    }
    if (filterLocation && filterLocation.trim()) {
      params = params + `&address=${filterLocation.trim()}`;
    }
    if (filterGender) {
      params = params + `&gender=${filterGender}`;
    }
    if (filterCategory) {
      params = params + `&pet_type=${filterCategory}`;
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
    return httpClient.get(`${environment.origin}/lost_found/list?${params}`);
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

  // To get category list for filter category dropdown
  public petTypeDataRequest(): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/pet-type/list`);
  }

}
