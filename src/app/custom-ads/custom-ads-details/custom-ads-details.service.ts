import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CustomAdsDetailService {

  constructor(private injector: Injector) {
  }



  public addFaq(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/addcustomads`, params);
  }

  public updateFaq(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/updateCustomAds`, params);
  }

  public fetchcustomAdsDetail(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/getCustomAdsList`, {params : params  });
  }


  public deleteFaq(params):  Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/removeCustomAds`,  params );
  }

}
