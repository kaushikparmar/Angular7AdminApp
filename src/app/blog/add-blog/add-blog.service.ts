import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddBlogService {

  constructor(private injector: Injector) { }

  public getCategories(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/master/listblogcategory`, {params: data});
  }

  /** Get specific blog data in edit blog page */
  public getBlogData(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/blog/viewblog`, {params: data});
  }

  public addBlogs(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/blog/addblog`, data);
  }

  public updateBlogs(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/blog/updateblog`, data);
  }

  public deleteBlog(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    console.log(params);
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/blog/removemedia`,  params );
  }



}
