import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookingServiceListService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getUsers(limit?: number, pageNo?: number, searchString?: string,
    filterOrderId?: string, filterPetOwner?: string, filterServiceProvider?: string,
    filterServiceType?: string, filterStatus?: string, startDate?: string,
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
    if (searchString) {
      params = params + `&search=${searchString}`;
    }
    if (filterOrderId) {
      params = params + `&id=${filterOrderId}`;
    }
    if (filterPetOwner && filterPetOwner.trim()) {
      params = params + `&pet_owner_name=${filterPetOwner.trim()}`;
    }
    if (filterServiceProvider && filterServiceProvider.trim()) {
      params = params + `&service_provider_name=${filterServiceProvider.trim()}`;
    }
    if (filterServiceType) {
      params = params + `&service_type_id=${filterServiceType}`;
    }
    if (filterStatus) {
      params = params + `&status=${filterStatus}`;
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
    return httpClient.get(`${environment.origin}/fetchadminbookinglist?${params}`);
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

  /**
   * type list call
   * @param data Provide data to be updated
   */
  public typeList(): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/service-type/list`);
  }
}
