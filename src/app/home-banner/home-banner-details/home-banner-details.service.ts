import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HomeBannerDetailService {

  constructor(private injector: Injector) {
  }


  /**
   *
   * @param params Add Home Banner params
   * Add Home Banner Ajax Call
   */
  public addHomeBanner(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/add_banner`, params);
  }

  /**
   *
   * @param params Update Home Banner Status
   * Update Home Banner Ajax Call
   */
  public updateHomeBanner(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/update_banner`, params);
  }


  /**
   *
   * @param params Delete Image parameters
   * Delete Home Banner Image Ajax Call
   */
  public deleteCustomHomeImage(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/removeCustomAds`,  params );
  }

}
