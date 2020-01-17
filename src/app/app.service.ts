import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(private injector: Injector) {
  }

  /**
   * Admin Notification API Call
   */
  public adminNotification(is_read?: Boolean): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    let params = '';
    params = params + `is_read=${is_read}`;
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/admin/notification/list?${params}`);
  }

  public showCount(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/admin/notification/showcount`, data);
  }

  public updateNotification(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/admin/updatenotification/update`, data);
  }

}
