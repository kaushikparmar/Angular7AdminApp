import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceDetailsService {

  constructor(private injector: Injector) { }

  /** Get specific blog data in edit blog page */
  public ViewDetails(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/fetchadminbookinglist`, {params: data});
  }

}
