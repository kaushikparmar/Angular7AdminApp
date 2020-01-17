import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment';
import { NgProgress } from '@ngx-progressbar/core';
import { CommonService } from 'src/common/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public useremail: any;
  public loginForm: FormGroup;
  public submitted = false;
  constructor(
    private injector: Injector
  ) { }

  /**
   * Login with Username & Password
   */
  public login() {
    if (this.loginForm.valid && this.submitted === false) {
      this.submitted = true;
      // Inject service
      const loginService = this.injector.get(LoginService);
      const progress = this.injector.get(NgProgress);
      const commonService = this.injector.get(CommonService);
      const toastrService = this.injector.get(ToastrService);
      // Call API
      progress.start();
      loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            const d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
            // Set Cookie
            const cookie = this.injector.get(CookieService);
            cookie.setItem('session', response['data']['token'], { path: '/', expires: 24 * 60 * 60 });
            commonService.set('session', response['data']['token']);
            commonService.setEvent('getNotifications', null);
            // this.auth.sendToken(this.userForm.value.email);
            // if (environment.production) {
            //   window.location.href = response['data']['baseUrl'] + '/auth?token=' + response['data']['token'];
            // } else {
              const router = this.injector.get(Router);
              router.navigate(['/user']);
              // router.navigateByUrl('/user', {skipLocationChange: true}).then(() => router.navigate(['/user']));
            // }
            // Show success toast message
            toastrService.success('Login Successful', 'SUCCESS');
          }
          progress.complete();
          this.submitted = false;
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          progress.complete();
          this.submitted = false;
        }
      );
    }
  }

  /**
   * Angular Lifecycle Event For Component Initialization
   */
  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });

  }



  /**
   * Get Form Parameter Access On Template
   */
  get userEmail() { return this.loginForm.get('email'); }
  get userPassword() { return this.loginForm.get('password'); }



}
