import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as crypto from 'crypto-js';

@Injectable()
export class LoginService {

  constructor(private injector: Injector) {
  }

  /**
   * Login API Call
   * @param username Provide Username
   * @param password Provide Password
   */
  public login(email: string, password: string): Observable<any> {
    const cipherEmail = crypto.AES.encrypt(email, 'secretofsuccess').toString();
    const cipherPasswrd = crypto.AES.encrypt(password, 'secretofsuccess').toString();
    // Dynamic Service Injector To Manage Memory Occupency
    const httpClient = this.injector.get(HttpClient);
    return httpClient.post(`${environment.origin}/auth/login`, { 'email': cipherEmail, 'password': cipherPasswrd });
  }

}
