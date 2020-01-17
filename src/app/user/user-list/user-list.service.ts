import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserListService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getUsers(params: string): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/user/getusers?${params}`);
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

  public approveOwnerToProviderUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/petowner-to-serviceprovider`, data);
  }
}
