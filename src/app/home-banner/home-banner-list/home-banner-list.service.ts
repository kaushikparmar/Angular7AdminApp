import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HomeBannerListService {

  constructor(private injector: Injector) {
  }

  public getHomeBanner(listType?: boolean ,  searchString?: any , limit?: number, pageNo?: number ): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    let params = '';
    if (listType) {
      if (limit) {
        params = params + `limit=${limit}`;
      }
      if (pageNo) {
        params = params + `&page=${pageNo}`;
      }
      if (searchString && searchString.trim()) {
        params = params + `&search=${searchString.trim()}`;
      }
    } else {
      params =  `id=${searchString}`;
    }

    return httpClient.get(`${environment.origin}/banner_list?${params}`);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateHomeBanner(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/update_banner_status`, data);
  }


    /**
   *
   * @param data Provide data to be deleted
   */
  public deleteHomeBanner(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/delete_banner`, data);
  }




  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public approveRejectHomeBanner(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/sp-approve`, data);
  }
}
