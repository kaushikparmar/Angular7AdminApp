import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PressCategoryDetailsService {

  constructor(private injector: Injector) { }

  /** Get specific press data in edit press page */
  public getCategoryData(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/master/presscategorydetail`, {params: data});
  }

  public addBlogs(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/master/addpresscategory`, data);
  }

  public updateBlogs(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/master/updatepresscategory`, data);
  }

}
