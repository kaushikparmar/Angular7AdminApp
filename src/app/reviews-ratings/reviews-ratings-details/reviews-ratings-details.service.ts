import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsRatingsDetailsService {

  constructor(private injector: Injector) { }
  public getReviewDetails(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/review/list?`, {params: data});
  }
}
