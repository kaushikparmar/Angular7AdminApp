import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationListService {

  constructor(private injector: Injector) {
  }


  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getNotifications(limit?: number, pageNo?: number, searchString?: string): Observable<any> {
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

    return httpClient.get(`${environment.origin}/admin/notification/list?${params}`);
  }

  public updateNotification(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/admin/updatenotification/update`, data);
  }

  public clearAllNotification(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/admin/notification/clear`, data);
  }

  public readAllNotification(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/admin/notification/readAll`, data);
  }
}
