import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BreedListService {

  constructor(private injector: Injector) {
  }

  public getBreedList(listType?: boolean ,  searchString?: any , limit?: number, pageNo?: number,
    filterName?: string, filterCategory?: string, selectedStatus?: string,
    sortType?: string, sortBy?: string): Observable<any> {
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
      if (filterName) {
        params = params + `&name=${filterName}`;
      }
      if (filterCategory) {
        params = params + `&pet_type_id=${filterCategory}`;
      }
      if (selectedStatus) {
        params = params + `&status=${selectedStatus}`;
      }
      if (sortType) {
        params = params + `&sortType=${sortType}`;
      }
      if (sortBy) {
        params = params + `&sortBy=${sortBy}`;
      }
    } else {
      params =  `id=${searchString}`;
    }

    return httpClient.get(`${environment.origin}/fetchBreed?${params}`);
  }

  public getCategoryList(): Observable<any> {
    const httpClient = this.injector.get(HttpClient);
    return httpClient.get(`${environment.origin}/pet-type/list`);
  }

}
