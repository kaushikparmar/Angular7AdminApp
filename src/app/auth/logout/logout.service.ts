import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class LogoutService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public logout(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/auth/logout`, data);
  }

}
