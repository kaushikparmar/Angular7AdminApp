import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsListingService {

  constructor(private injector: Injector) {
  }


  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public getPetListing(limit?: number, pageNo?: number, searchString?: string,
    filterPetName?: string, filterBreed?: string,
    filterOwnerName?: string, filterPetType?: number,
    sortType?: string, sortBy?: string): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
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
    if (filterPetName && filterPetName.trim()) {
      params = params + `&name=${filterPetName.trim()}`;
    }
    if (filterBreed && filterBreed.trim()) {
      params = params + `&breed=${filterBreed.trim()}`;
    }
    if (filterOwnerName && filterOwnerName.trim()) {
      params = params + `&owner_name=${filterOwnerName.trim()}`;
    }
    if (filterPetType) {
      params = params + `&pet_type_id=${filterPetType}`;
    }
    if (sortType) {
      params = params + `&sortType=${sortType}`;
    }
    if (sortBy) {
      params = params + `&sortBy=${sortBy}`;
    }
    return httpClient.get(`${environment.origin}/pet-details/adminList?${params}`);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public activateDeactivateUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/active-deactive`, data);
  }

  /**
   * Login API Call
   * @param data Provide data to be updated
   */
  public approveRejectUser(data: any): Observable<any> {
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/user/sp-approve`, data);
  }
}
