import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReviewsRatingsListService {

  constructor(private injector: Injector) { }

  public getReviewList(limit?: number, pageNo?: number, searchString?: string,
    sortType?: string, sortBy?: string, selectedNumber?: string, startDate?: string,
    endDate?: string): Observable<any> {
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
    if (sortType) {
      params = params + `&sortType=${sortType}`;
    }
    if (sortBy) {
      params = params + `&sortBy=${sortBy}`;
    }
    if (selectedNumber) {
      params = params + `&rating=${selectedNumber}`;
    }
    if (startDate) {
      params = params + `&fromDate=${startDate}`;
    }
    if (endDate) {
      params = params + `&toDate=${endDate}`;
    }
    return httpClient.get(`${environment.origin}/review/list?${params}`);
  }

  public deleteReview(data: any): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.put(`${environment.origin}/review/delete?`, data);
  }

}
