import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HomeContentService {

  constructor(private injector: Injector) {}

  /**
   * Add Home Content
   * @param data Provide data
   */
  public updateHomeContent(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/cmspage/homecontent/add`, data);
  }

  public getHomeContent(): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/cmspage/homecontent?id=1`);
  }

  /**
   * Remove data from DB
   * @param params Pass the field you want to remove from database
   */
  public removeHomeContent(params: Object): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/removeHomeContent`, params);
  }
}
