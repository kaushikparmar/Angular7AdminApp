// Angular Library Imports
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from '../common/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpIntercepter implements HttpInterceptor {

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
  }

  // Intercept the HTTP Request to modify headers and handle errors
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = {};
    // Common Headers
    // headers['Cache-Control'] = 'no-cache',
    // headers['Pragma'] = 'no-cache';
    headers['admin'] = 'true';

    // Add Authorization Header If Already LoggedIn User
    if (this.commonService.get('session')) {
      headers['Authorization'] = this.commonService.get('session');
    }

    // Hold the request object
    const req = request.clone({
      setHeaders: headers
    });

    // Handle request
    return next.handle(req)
    .pipe(
      tap(
        (success: HttpResponse<any>) => {
          if (success instanceof HttpResponse && success['body'] && success['body']['code'] === 400) {
            this.toastr.error(success['body']['message'], 'ERROR');
          }
          if (success instanceof HttpResponse && success['body'] && success['body']['code'] === 401) {
            this.commonService.setEvent('isSessionExpired', true);
            this.toastr.error(success['body']['message'], 'ERROR');
          }
          if (success instanceof HttpResponse && success['body'] && success['body']['code'] === 500) {
            this.toastr.error(success['body']['message'], 'ERROR');
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (!navigator.onLine) {
            this.toastr.error('Network Connection Lost', 'ERROR');
          } else {
            this.toastr.error('Something went wrong', 'ERROR');
          }
        }
      )
    );
  }
}
