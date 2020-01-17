import { Component, OnInit, Injector } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { LogoutService } from './logout.service';
import { HttpResponse } from '@angular/common/http';
import { CommonService } from 'src/common/services/common.service';

@Component({
  selector: 'pb-logout',
  template: '<h1>Logout</h1>'
})
export class LogoutComponent implements OnInit {

  constructor(
    private injector: Injector
  ) { }

  /**
   * Frontend Logout
   */
  private frontendLogout(): void {
    // Inject service
    const cookie = this.injector.get(CookieService);
    cookie.clear();
    // Inject service
    const router = this.injector.get(Router);
    router.navigate(['/login']);
  }

  /**
   * Logout A User
   */
  public backendLogout(): void {
    // Inject service
    const progress = this.injector.get(NgProgress);
    const logoutService = this.injector.get(LogoutService);
    // Prepare Data
    const data = {};
    // Call API
    progress.start();
    logoutService.logout(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  ngOnInit() {
    this.backendLogout();
    this.frontendLogout();
  }

}
